import { useEffect, useRef } from 'react'

const CHARS = '01アイウエオカキクケコサシスセソ{}[]<>/=+-;'

const SKULL_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <g fill="white">
    <path d="M100 20c-35 0-60 25-60 58 0 22 11 38 24 49l-4 18c-1 5 3 10 8 10h64c5 0 9-5 8-10l-4-18c13-11 24-27 24-49 0-33-25-58-60-58z"/>
    <circle cx="76" cy="80" r="14" fill="black"/>
    <circle cx="124" cy="80" r="14" fill="black"/>
    <path d="M100 92l-9 20h18z" fill="black"/>
    <path d="M75 118h50v6h-50z" fill="black"/>
    <path d="M20 150l50-15 5 15-50 15z"/>
    <path d="M180 150l-50-15-5 15 50 15z"/>
    <circle cx="20" cy="150" r="8"/>
    <circle cx="180" cy="150" r="8"/>
  </g>
</svg>`

export default function CodeRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    let columns = []
    const fontSize = 15
    let lastWidth = 0

    // skull mask — a same-size offscreen buffer we sample to decide where
    // NOT to draw characters, so the skull appears as a dark silhouette
    // carved out of the rain, matching a real matrix-skull look.
    let maskData = null
    let maskW = 0
    let maskH = 0
    const skullImg = new Image()
    const skullBlob = new Blob([SKULL_SVG], { type: 'image/svg+xml' })
    const skullUrl = URL.createObjectURL(skullBlob)

    function buildMask(width, height) {
      const size = Math.min(width, height) * 0.42
      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const mctx = mask.getContext('2d')
      mctx.clearRect(0, 0, width, height)
      const dx = (width - size) / 2
      const dy = (height - size) / 2
      mctx.drawImage(skullImg, dx, dy, size, size)
      maskData = mctx.getImageData(0, 0, width, height).data
      maskW = width
      maskH = height
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

      if (skullImg.complete) buildMask(newWidth, newHeight)
    }

    skullImg.onload = () => resize()
    skullImg.src = skullUrl

    resize()
    window.addEventListener('resize', resize)

    let lastTime = 0
    const frameDelay = 90

    function isInsideSkull(x, y) {
      if (!maskData) return false
      const px = Math.floor(x)
      const py = Math.floor(y)
      if (px < 0 || py < 0 || px >= maskW || py >= maskH) return false
      const idx = (py * maskW + px) * 4
      return maskData[idx + 3] > 60 // alpha threshold
    }

        function draw(time) {
      animationId = requestAnimationFrame(draw)
      if (time - lastTime < frameDelay) return
      lastTime = time

      // fade previous frame instead of clearing, for trailing effect
      ctx.fillStyle = 'rgba(11, 13, 14, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const x = i * fontSize
        const y = columns[i] * fontSize
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]

        if (isInsideSkull(x, y)) {
          // brighter, denser, glowing — this is what makes the skull visible
          ctx.shadowColor = 'rgba(120, 255, 170, 0.9)'
          ctx.shadowBlur = 6
          ctx.fillStyle = 'rgba(140, 255, 190, 0.9)'
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = 'rgba(100, 220, 160, 0.25)'
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
      URL.revokeObjectURL(skullUrl)
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
