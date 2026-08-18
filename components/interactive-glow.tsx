'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated shader-gradient background for the purple page headers.
 *
 * Renders a lightweight WebGL fragment shader that produces a slowly flowing
 * "mesh gradient" of the brand purples/magentas — the same family of effect as
 * the Paper shader-gradient template. Drop it as the first child of any
 * `bg-primary` section (make the section `relative isolate overflow-hidden`)
 * and it fills the whole frame behind the content.
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

      // Brand purples / magentas
      const vec3 colA = vec3(0.42, 0.20, 0.72); // purple
      const vec3 colB = vec3(0.80, 0.30, 0.86); // magenta
      const vec3 colC = vec3(0.62, 0.47, 0.97); // lavender
      const vec3 colD = vec3(0.26, 0.10, 0.52); // deep violet

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        // Correct for aspect so the flow isn't stretched on wide headers.
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = vec2(uv.x * aspect, uv.y) * 3.0;
        float t = u_time * 0.12;

        // Domain warping for smooth flowing color regions.
        float w1 = sin(p.x + t) + cos(p.y * 1.3 - t * 1.1);
        float w2 = sin(p.y * 0.8 - t * 0.9) + cos(p.x * 1.1 + t * 1.2);
        float m1 = 0.5 + 0.5 * sin(w1 + t);
        float m2 = 0.5 + 0.5 * cos(w2 - t);

        vec3 col = mix(colA, colB, m1);
        col = mix(col, colC, m2 * 0.6);
        col = mix(col, colD, (1.0 - m1) * 0.4);

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

    let raf = 0
    const start = performance.now()

    const render = (now: number) => {
      const time = (now - start) / 1000
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(render)
    }

    if (reduceMotion) {
      gl.uniform1f(uTime, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
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
