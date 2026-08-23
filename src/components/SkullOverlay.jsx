import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

export default function SkullOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function draw() {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.5
      canvas.width = size
      canvas.height = size

      // Step 1: draw a skull+crossbones emoji offscreen as a shape mask
      const mask = document.createElement('canvas')
      mask.width = size
      mask.height = size
      const mctx = mask.getContext('2d')
      mctx.clearRect(0, 0, size, size)
      mctx.font = `${size * 0.8}px serif`
      mctx.textAlign = 'center'
      mctx.textBaseline = 'middle'
      mctx.fillText('☠️', size / 2, size / 2)

      const imageData = mctx.getImageData(0, 0, size, size)

      // Step 2: scatter matrix characters only where the mask has visible pixels
      ctx.clearRect(0, 0, size, size)
      ctx.font = `${size * 0.028}px monospace`

      const step = size * 0.024
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const idx = (Math.floor(y) * size + Math.floor(x)) * 4
          const alpha = imageData.data[idx + 3]
          if (alpha > 80) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)]
            const opacity = 0.15 + (alpha / 255) * 0.4
            ctx.fillStyle = `rgba(100, 220, 160, ${opacity})`
            ctx.fillText(char, x, y)
          }
        }
      }
    }

    draw()
    const interval = setInterval(draw, 400) // gentle flicker/regeneration
    window.addEventListener('resize', draw)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', draw)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 m-auto pointer-events-none opacity-60"
    />
  )
}
