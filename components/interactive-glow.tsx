'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated shader-gradient background for the purple page headers.
 *
 * Renders a lightweight WebGL fragment shader that produces a slowly flowing
 * "mesh gradient" built entirely from the brand purple (`--primary`), varied
 * only in light/dark shades. The base color is read at runtime from the
 * resolved CSS variable so it always matches the branding exactly.
 *
 * Moving the cursor over the header warps the flow toward the pointer and
 * speeds it up, giving an interactive movement effect on hover. Drop it as the
 * first child of any `bg-primary` section (make the section
 * `relative isolate overflow-hidden`) and it fills the whole frame.
 *
 * Dependency-free: a single full-screen triangle + a small fragment shader.
 * Respects prefers-reduced-motion by rendering a single static frame.
 */
export function InteractiveGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  // Only render the canvas on the client, after hydration, to avoid any
  // server/client HTML mismatch for this WebGL-only element.
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false })
    if (!gl) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Resolve the brand primary color to RGB [0..1] via a 2D canvas so any
    // CSS color format (oklch, rgb, hex) is handled by the browser.
    const readBrandColor = (): [number, number, number] => {
      const fallback: [number, number, number] = [0.49, 0.29, 0.8]
      const bg = getComputedStyle(parent).backgroundColor
      if (!bg) return fallback
      const probe = document.createElement('canvas')
      probe.width = 1
      probe.height = 1
      const ctx = probe.getContext('2d')
      if (!ctx) return fallback
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
      return [r / 255, g / 255, b / 255]
    }

    const [br, bg_, bb] = readBrandColor()

    const vertSrc = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `

    const fragSrc = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_color;   // brand purple base
      uniform vec2 u_mouse;   // normalized cursor position (0..1)
      uniform float u_hover;  // eased hover intensity (0..1)

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;

        // Single-hue palette: light / mid / dark shades of the brand purple.
        vec3 base  = u_color;
        vec3 light = mix(base, vec3(1.0), 0.30);
        vec3 mid   = mix(base, vec3(1.0), 0.10);
        vec3 dark  = mix(base, vec3(0.0), 0.45);

        // Warp the domain toward the cursor and add extra speed on hover.
        vec2 m = vec2(u_mouse.x * aspect, u_mouse.y);
        vec2 p = vec2(uv.x * aspect, uv.y);
        float pull = u_hover * 0.6;
        p += (m - p) * pull * 0.35;
        p *= 3.0;

        float t = u_time * (0.12 + u_hover * 0.22);

        float w1 = sin(p.x + t) + cos(p.y * 1.3 - t * 1.1);
        float w2 = sin(p.y * 0.8 - t * 0.9) + cos(p.x * 1.1 + t * 1.2);
        float m1 = 0.5 + 0.5 * sin(w1 + t);
        float m2 = 0.5 + 0.5 * cos(w2 - t);

        vec3 col = mix(base, light, m1);
        col = mix(col, mid, m2 * 0.6);
        col = mix(col, dark, (1.0 - m1) * 0.45);

        // Soft moving highlight that follows the cursor on hover.
        float d = distance(vec2(uv.x * aspect, uv.y), m);
        col = mix(col, light, u_hover * smoothstep(0.6, 0.0, d) * 0.5);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.log('[v0] shader compile error:', gl.getShaderInfoLog(sh))
        gl.deleteShader(sh)
        return null
      }
      return sh
    }

    const vert = compile(gl.VERTEX_SHADER, vertSrc)
    const frag = compile(gl.FRAGMENT_SHADER, fragSrc)
    if (!vert || !frag) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('[v0] program link error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Full-screen triangle.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uColor = gl.getUniformLocation(program, 'u_color')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uHover = gl.getUniformLocation(program, 'u_hover')

    gl.uniform3f(uColor, br, bg_, bb)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.floor(parent.clientWidth * dpr))
      const h = Math.max(1, Math.floor(parent.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uRes, w, h)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()

    // Cursor tracking (listeners on the parent since the canvas ignores events).
    const target = { x: 0.5, y: 0.5, hover: 0 }
    const eased = { x: 0.5, y: 0.5, hover: 0 }

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      // Flip Y: DOM top-left vs WebGL bottom-left.
      target.y = 1 - (e.clientY - rect.top) / rect.height
    }
    const onEnter = () => {
      target.hover = 1
    }
    const onLeave = () => {
      target.hover = 0
    }

    if (!reduceMotion) {
      parent.addEventListener('pointermove', onMove)
      parent.addEventListener('pointerenter', onEnter)
      parent.addEventListener('pointerleave', onLeave)
    }

    let raf = 0
    const start = performance.now()

    const render = (now: number) => {
      const time = (now - start) / 1000
      // Smoothly ease toward the pointer target for fluid movement.
      eased.x += (target.x - eased.x) * 0.06
      eased.y += (target.y - eased.y) * 0.06
      eased.hover += (target.hover - eased.hover) * 0.05
      gl.uniform1f(uTime, time)
      gl.uniform2f(uMouse, eased.x, eased.y)
      gl.uniform1f(uHover, eased.hover)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }

    if (reduceMotion) {
      gl.uniform1f(uTime, 0)
      gl.uniform2f(uMouse, 0.5, 0.5)
      gl.uniform1f(uHover, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerenter', onEnter)
      parent.removeEventListener('pointerleave', onLeave)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buffer)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    />
  )
}
