import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

export default function CodeRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let columns = []
    const fontSize = 15

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const columnCount = Math.floor(canvas.width / fontSize)
      columns = new Array(columnCount).fill(0).map(() => Math.random() * -100)
    }

    resize()
    window.addEventListener('resize', resize)

    let lastTime = 0
    const frameDelay = 90 // ms between steps — slow, calm drift

    function draw(time) {
      animationId = requestAnimationFrame(draw)
      if (time - lastTime < frameDelay) return
      lastTime = time

      // fade previous frame instead of clearing, for trailing effect
      ctx.fillStyle = 'rgba(11, 15, 20, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(108, 116, 240, 0.28)' // accent indigo, low alpha
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = columns[i] * fontSize

        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.98) {
          columns[i] = 0
        } else {
          columns[i] += 1
        }
      }
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 opacity-30 pointer-events-none"
    />
  )
}
