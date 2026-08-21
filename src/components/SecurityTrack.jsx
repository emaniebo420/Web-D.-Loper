import { certTrack } from '../data.jsx'
import SectionTitle from './SectionTitle.jsx'
import Reveal from './Reveal.jsx'

export default function SecurityTrack() {
  return (
    <section id="security" className="bg-surface border-y border-lineSoft">
      <div className="max-w-[1040px] mx-auto px-6 sm:px-8 py-20">
        <Reveal>
          <SectionTitle>Certification Path</SectionTitle>
        </Reveal>

        <Reveal>
          <ol className="relative">
            {certTrack.map((item, i) => (
              <li key={item.name} className="relative pl-8 pb-8 last:pb-0">
                {i !== certTrack.length - 1 && (
                  <span className="absolute left-[7px] top-4 bottom-0 w-px bg-line" />
                )}
                <span
                  className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${
                    item.done ? 'bg-accent border-accent' : 'bg-panel border-line'
                  }`}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 bg-panel border border-line rounded-lg px-5 py-4">
                  <div className="font-semibold text-text">{item.name}</div>
                  <div
                    className={`font-mono text-[11px] uppercase tracking-wide ${
                      item.done ? 'text-accent' : 'text-textDim'
                    }`}
                  >
                    {item.state}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
