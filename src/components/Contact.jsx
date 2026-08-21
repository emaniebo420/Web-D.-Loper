import { contact } from '../data.jsx'
import SectionTitle from './SectionTitle.jsx'
import Reveal from './Reveal.jsx'

export default function Contact() {
  const email = contact.find((row) => row.label === 'EMAIL')
  const other = contact.filter((row) => row.label !== 'EMAIL')

  return (
    <section id="contact" className="max-w-[1040px] mx-auto px-6 sm:px-8 py-24 text-center">
      <Reveal>
        <div className="flex justify-center">
          <SectionTitle>Let's build something</SectionTitle>
        </div>
        <p className="text-textMid max-w-[46ch] mx-auto mb-8">
          Open for freelance web development work and always up for a conversation
          about security.
        </p>

        {email?.href && (
          <a
            href={email.href}
            className="inline-block px-6 py-3 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accentDim transition-colors mb-6"
          >
            {email.value}
          </a>
        )}

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {other.map((row) =>
            row.href ? (
              <a
                key={row.label}
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textMid hover:text-accent underline decoration-lineSoft underline-offset-4 transition-colors"
              >
                {row.value}
              </a>
            ) : (
              <span key={row.label} className="text-textDim">
                {row.value}
              </span>
            )
          )}
        </div>
      </Reveal>
    </section>
  )
}
