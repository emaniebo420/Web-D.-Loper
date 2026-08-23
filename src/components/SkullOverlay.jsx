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

export default function SkullOverlay() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    const svgBlob = new Blob([SKULL_SVG], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)
    let interval
      img.onload = () => {
      function draw() {
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.5
        canvas.width = size
        canvas.height = size
        canvas.style.width = `${size}px`
        canvas.style.height = `${size}px`

        const mask = document.createElement('canvas')
        mask.width = size
        mask.height = size
        const mctx = mask.getContext('2d')
        mctx.drawImage(img, 0, 0, size, size)
        const imageData = mctx.getImageData(0, 0, size, size)

        ctx.clearRect(0, 0, size, size)
        ctx.font = `${size * 0.028}px monospace`

        const step = size * 0.022
        for (let y = 0; y < size; y += step) {
          for (let x = 0; x < size; x += step) {
            const px = Math.floor(x)
            const py = Math.floor(y)
            const idx = (py * size + px) * 4
            const alpha = imageData.data[idx + 3]
            if (alpha > 100) {
              const char = CHARS[Math.floor(Math.random() * CHARS.length)]
              ctx.fillStyle = `rgba(100, 220, 160, ${0.2 + Math.random() * 0.35})`
              ctx.fillText(char, x, y)
            }
          }
        }
      }

      draw()
      interval = setInterval(draw, 450)
      window.addEventListener('resize', draw)
    }

    img.src = url

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', () => {})
      URL.revokeObjectURL(url)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-70"
    />
  )
}
