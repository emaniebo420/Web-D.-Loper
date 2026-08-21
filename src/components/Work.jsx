import { projects } from '../data.jsx'
import SectionTitle from './SectionTitle.jsx'
import Reveal from './Reveal.jsx'

const statusDot = {
  live: 'bg-success',
  dev: 'bg-amber',
}

const statusLabel = {
  live: 'Live',
  dev: 'In development',
}

export default function Work() {
  return (
    <section id="work" className="bg-surface border-y border-lineSoft">
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8 py-20">
        <Reveal>
          <SectionTitle>Selected Work</SectionTitle>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.name} className={i >= 2 ? 'delay-100' : ''}>
              <div className="h-full bg-panel border border-line rounded-lg p-6 hover:border-accent transition-colors flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <h3 className="text-base font-bold text-text">
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-none hover:text-accent transition-colors"
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-textDim whitespace-nowrap shrink-0 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[p.status]}`} />
                    {statusLabel[p.status]}
                  </span>
                </div>
                <p className="text-sm text-textMid leading-relaxed mb-4">{p.desc}</p>
                <div className="font-mono text-[11px] text-textDim mt-auto">
                  {p.stack.join('  ·  ')}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
