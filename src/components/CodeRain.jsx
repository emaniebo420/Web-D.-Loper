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
    const frameDelay = 90 // ms between steps — slow, calm dr
