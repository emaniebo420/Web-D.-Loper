import { skills } from '../data.jsx'
import SectionTitle from './SectionTitle.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="max-w-[1040px] mx-auto px-6 sm:px-8 py-20">
      <Reveal>
        <SectionTitle>Skills</SectionTitle>
      </Reveal>
      <Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <div className="font-mono text-xs uppercase tracking-wide text-textDim mb-4">
                {group}
              </div>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="text-sm text-textMid leading-relaxed flex items-start gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-accent mt-[7px] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
