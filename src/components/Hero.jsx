import { profile } from '../data.jsx'

export default function Hero() {
  return (
    <div className="max-w-[1040px] mx-auto px-6 sm:px-8 pt-20 pb-16">
      <div className="font-mono text-xs text-accent uppercase tracking-wide mb-4">
        {profile.role}
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.15] mb-6 max-w-[17ch] text-text">
        {profile.headline}
      </h1>
      <p className="text-base sm:text-lg text-textMid max-w-[58ch] mb-8 leading-relaxed">
        {profile.bio}
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        <a
          href="#work"
          className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-accentDim transition-colors"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded-lg border border-line text-text text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
        >
          Get in touch
        </a>
      </div>

      <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="text-textDim">Location</dt>
          <dd className="text-textMid font-medium">{profile.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-textDim">Status</dt>
          <dd className="text-textMid font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            {profile.status}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-textDim">Track</dt>
          <dd className="text-textMid font-medium">{profile.track}</dd>
        </div>
      </dl>
    </div>
  )
}
