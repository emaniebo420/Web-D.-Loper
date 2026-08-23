import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

function paintSkull(ctx, centerX, centerY, size) {
  const scale = size / 200
  ctx.save()
  ctx.translate(centerX - size / 2, centerY - size / 2)
  ctx.scale(scale, scale)
  ctx.fillStyle = '#fff'

  ctx.fill(new Path2D(
    'M100 20c-35 0-60 25-60 58 0 22 11 38 24 49l-4 18c-1 5 3 10 8 10h64c5 0 9-5 8-10l-4-18c13-11 24-27 24-49 0-33-25-58-60-58z'
  ))
  ctx.fill(new Path2D('M20 150l50-15 5 15-50 15z'))
  ctx.fill(new Path2D('M180 150l-50-15-5 15 50 15z'))
  ctx.beginPath(); ctx.arc(20, 150, 8, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(180, 150, 8, 0, Math.PI * 2); ctx.fill()

  ctx.restore()
}

export default function SkullOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let interval

    function draw() {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.32
      canvas.width = size
      canvas.height = size
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

      const mask = document.createElement('canvas')
      mask.width = size
      mask.height = size
      const mctx = mask.getContext('2d')
      paintSkull(mctx, size / 2, size / 2, size)
      const imageData = mctx.getImageData(0, 0, size, size).data

      ctx.clearRect(0, 0, size, size)
      ctx.font = `${size * 0.028}px monospace`

      const step = size * 0.02
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const idx = (Math.floor(y) * size + Math.floor(x)) * 4
          if (imageData[idx + 3] > 60) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)]
            ctx.fillStyle = `rgba(120, 255, 170, ${0.25 + Math.random() * 0.4})`
            ctx.fillText(char, x, y)
          }
        }
      }
    }

    draw()
    interval = setInterval(draw, 400)
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
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-45"
    />
  )
}
