export default function SkullOverlay() {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="fixed inset-0 z-0 m-auto opacity-[0.05] pointer-events-none"
      style={{ width: '420px', height: '420px', maxWidth: '70vw', maxHeight: '70vh' }}
    >
      <g fill="none" stroke="#7dd3b0" strokeWidth="2">
        <path d="M100 20c-33 0-58 25-58 58 0 20 10 35 22 46v20c0 6 5 11 11 11h50c6 0 11-5 11-11v-20c12-11 22-26 22-46 0-33-25-58-58-58z" />
        <circle cx="78" cy="82" r="12" fill="#7dd3b0" stroke="none" />
        <circle cx="122" cy="82" r="12" fill="#7dd3b0" stroke="none" />
        <path d="M100 96l-6 16h12z" fill="#7dd3b0" stroke="none" />
        <path d="M80 128h40" />
        <path d="M84 128v10M92 128v10M100 128v10M108 128v10M116 128v10" />
      </g>
    </svg>
  )
}
