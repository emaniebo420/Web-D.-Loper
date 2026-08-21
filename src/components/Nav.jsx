const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'security', label: 'Security' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ active, onSelect }) {
  return (
    <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur border-b border-line">
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => onSelect('about')}
          aria-label="Go to top"
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent overflow-hidden shrink-0"
        >
          <img src="/earth.jpg" alt="" className="w-full h-full object-cover" />
        </button>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onSelect(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={`px-3.5 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                active === link.id
                  ? 'text-accent bg-accentSoft'
                  : 'text-textMid hover:text-text hover:bg-surface'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
