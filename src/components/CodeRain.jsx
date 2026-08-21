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

        let columns = []
    const fontSize = 15
    let lastWidth = 0
    let lastHeight = 0

    function resize() {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      const widthChanged = newWidth !== lastWidth
      
      const heightChangedSignificantly = Math.abs(newHeight - lastHeight) > 150

      if (!widthChanged && !heightChangedSignificantly && lastWidth !== 0) {
        return 
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
