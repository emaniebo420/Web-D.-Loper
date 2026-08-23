import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

// Skull + crossbones drawn with plain canvas paths — no <img>/Blob loading,
// so there's no async race and no pixel-readback restriction to worry about.
function paintSkull(ctx, centerX, centerY, size) {
  const scale = size / 200
  ctx.save()
  ctx.translate(centerX - size / 2, centerY - size / 2)
  ctx.scale(scale, scale)
  ctx.fillStyle = '#fff'

  const outline = new Path2D(
    'M100 20c-35 0-60 25-60 58 0 22 11 38 24 49l-4 18c-1 5 3 10 8 10h64c5 0 9-5 8-10l-4-18c13-11 24-27 24-49 0-33-25-58-60-58z'
  )
  ctx.fill(outline)

  ctx.fill(new Path2D('M20 150l50-15 5 15-50 15z'))
  ctx.fill(new Path2D('M180 150l-50-15-5 15 50 15z'))

  ctx.beginPath(); ctx.arc(20, 150, 8, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(180, 150, 8, 0, Math.PI * 2); ctx.fill()

  ctx.restore()
}

export default function CodeRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    let columns = []
    const fontSize = 15
    let lastWidth = 0

    let maskData = null
    let maskW = 0
    let maskH = 0

    function buildMask(width, height) {
      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const mctx = mask.getContext('2d')
      const size = Math.min(width, height) * 0.45
      paintSkull(mctx, width / 2, height / 2, size)
      try {
        maskData = mctx.getImageData(0, 0, width, height).data
        maskW = width
        maskH = height
      } catch (err) {
        console.error('CodeRain: failed to build skull mask', err)
        maskData = null
      }
    }

    function resize() {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      canvas.width = newWidth
      canvas.height = newHeight

      if (newWidth !== lastWidth) {
        const columnCount = Math.floor(newWidth / fontSize)
        const oldColumns = columns
        columns = new Array(columnCount).fill(0).map((_, i) => oldColumns[i] ?? Math.random() * -100)
        lastWidth = newWidth
      }

      buildMask(newWidth, newHeight)
    }

    resize()
    window.addEventListener('resize', resize)

    let lastTime = 0
    const frameDelay = 90

    function isInsideSkull(x, y) {
      if (!maskData) return false
      const px = Math.floor(x)
      const py = Math.floor(y)
      if (px < 0 || py < 0 || px >= maskW || py >= maskH) return false
      return maskData[(py * maskW + px) * 4 + 3] > 60
    }

    function draw(time) {
      animationId = requestAnimationFrame(draw)
      if (time - lastTime < frameDelay) return
      lastTime = time

      ctx.fillStyle = 'rgba(11, 13, 14, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize
        const y = columns[i] * fontSize
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]

        if (isInsideSkull(x, y)) {
          ctx.shadowColor = 'rgba(120, 255, 170, 0.9)'
          ctx.shadowBlur = 5
          ctx.fillStyle = 'rgba(140, 255, 190, 0.9)'
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = 'rgba(100, 220, 160, 0.28)'
        }

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
      className="fixed inset-0 z-0 opacity-[0.4] pointer-events-none"
    />
  )
}
