import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

export default function CodeRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    let columns = []
    const fontSize = 15
    let lastWidth = 0
    let lastHeight = 0

    function resize() {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      const widthChanged = newWidth !== lastWidth
      // Ignore small height-only changes — these are mobile address bar
      // show/hide events during scroll, not real resizes.
      const heightChangedSignificantly = Math.abs(newHeight - lastHeight) > 150

      if (!widthChanged && !heightChangedSignificantly && lastWidth !== 0) {
        return // no real resize — skip, don't touch the canvas at all
      }

      canvas.width = newWidth
      canvas.height = newHeight

      if (widthChanged) {
        const columnCount = Math.floor(newWidth / fontSize)
        const oldColumns = columns
        columns = new Array(columnCount).fill(0).map((_, i) => oldColumns[i] ?? Math.random() * -100)
      }

      lastWidth = newWidth
      lastHeight = newHeight
    }

    resize()
    window.addEventListener('resize', resize)

    let lastTime = 0
    const frameDelay = 90 // ms between steps — slow, calm drift

    function draw(time) {
      animationId = requestAnimationFrame(draw)
      if (time - lastTime < frameDelay) return
      lastTime = time

      ctx.fillStyle = 'rgba(11, 13, 14, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(100, 220, 160, 0.35)' // accent green, slightly more vivid
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
      className="fixed inset-0 z-0 opacity-[0.22] pointer-events-none"
    />
  )
}
