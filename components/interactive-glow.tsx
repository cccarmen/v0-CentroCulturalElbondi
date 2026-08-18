'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Cursor-reactive "water" hover effect for the purple page headers.
 *
 * The header section keeps the exact brand color (`bg-primary`); this overlay
 * adds an animated, lighter-purple liquid ripple that flows and follows the
 * cursor, fading in on hover. Implemented with a lightweight WebGL fragment
 * shader (domain-warped noise + pointer ripples). Respects reduced motion.
 *
 * Drop it as the first child of any `relative isolate overflow-hidden`
 * `bg-primary` section.
 */
export function InteractiveGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  // Render only on the client, after hydration, to avoid SSR mismatch.
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const vertSrc = `
      attribute vec2 a_pos;
      void main() {
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `

    // Lighter purple than the brand color, flowing like water and revealed
    // around the cursor with a soft ripple.
    const fragSrc = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time;
      uniform vec2 u_mouse;   // 0..1
      uniform float u_hover;  // 0..1 eased

      // 2D value noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        float aspect = u_res.x / u_res.y;
        vec2 auv = vec2(uv.x * aspect, uv.y);
        vec2 am = vec2(u_mouse.x * aspect, u_mouse.y);

        float t = u_time * 0.12;

        // Domain warp for a liquid, flowing look.
        vec2 q = vec2(fbm(auv * 2.5 + vec2(0.0, t)), fbm(auv * 2.5 + vec2(5.2, -t)));
        vec2 r = vec2(
          fbm(auv * 2.5 + 3.0 * q + vec2(1.7, 9.2) + t),
          fbm(auv * 2.5 + 3.0 * q + vec2(8.3, 2.8) - t)
        );
        float flow = fbm(auv * 2.5 + 3.0 * r);

        // Concentric ripple emanating around the cursor.
        float d = distance(auv, am);
        float ripple = sin(d * 26.0 - u_time * 2.2) * 0.5 + 0.5;
        ripple *= smoothstep(0.55, 0.0, d);

        // Lighter purple shades (brand hue ~305).
        vec3 light = vec3(0.78, 0.62, 0.98);
        vec3 mid   = vec3(0.66, 0.47, 0.93);
        vec3 col = mix(mid, light, flow * 0.7 + ripple * 0.5);

        // Reveal mostly near the cursor, fading with distance + hover.
        float reveal = smoothstep(0.6, 0.0, d);
        float alpha = (0.30 * flow + 0.55 * ripple + 0.25 * reveal) * reveal;
        alpha *= u_hover;

        gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.85));
      }
    `

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uHover = gl.getUniformLocation(program, 'u_hover')

    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    // Eased pointer state for fluid movement.
    const target = { x: 0.5, y: 0.5, on: 0 }
    const eased = { x: 0.5, y: 0.5, on: 0 }

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      target.x = (e.clientX - rect.left) / rect.width
      target.y = 1 - (e.clientY - rect.top) / rect.height // flip for GL space
    }
    const onEnter = () => {
      target.on = 1
    }
    const onLeave = () => {
      target.on = 0
    }
    parent.addEventListener('pointermove', onMove)
    parent.addEventListener('pointerenter', onEnter)
    parent.addEventListener('pointerleave', onLeave)

    const start = performance.now()
    let raf = 0
    const render = () => {
      const time = reduceMotion ? 0 : (performance.now() - start) / 1000
      eased.x += (target.x - eased.x) * 0.08
      eased.y += (target.y - eased.y) * 0.08
      eased.on += (target.on - eased.on) * 0.05

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, time)
      gl.uniform2f(uMouse, eased.x, eased.y)
      gl.uniform1f(uHover, eased.on)
      gl.drawArrays(gl.TRIANGLES, 0, 3)

      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      parent.removeEventListener('pointermove', onMove)
      parent.removeEventListener('pointerenter', onEnter)
      parent.removeEventListener('pointerleave', onLeave)
      gl.deleteProgram(program)
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
