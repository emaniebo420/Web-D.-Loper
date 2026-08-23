import { useEffect, useRef, useState } from 'react'
import { profile } from './data.jsx'
import CodeRain from './components/CodeRain.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Skills from './components/Skills.jsx'
import SecurityTrack from './components/SecurityTrack.jsx'
import Contact from './components/Contact.jsx'

console.log('%c⚓ Set sail! ', 'color: #7dd3b0; font-weight: bold; font-size: 14px;')
const sectionIds = ['about', 'work', 'skills', 'security', 'contact']

export default function App() {
  const [activeTab, setActiveTab] = useState('about')
  const isClickScrolling = useRef(false)

  const handleSelect = (id) => {
    isClickScrolling.current = true
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    window.clearTimeout(handleSelect._t)
    handleSelect._t = window.setTimeout(() => {
      isClickScrolling.current = false
    }, 700)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveTab(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg relative">
      <CodeRain />
      <div className="relative z-10">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav active={activeTab} onSelect={handleSelect} />

        <main id="main">
          <div id="about">
            <Hero />
          </div>
          <Work />
          <Skills />
          <SecurityTrack />
          <Contact />
        </main>

        <footer className="px-8 py-8 text-center text-sm text-textDim border-t border-lineSoft">
          © {new Date().getFullYear()} {profile.name} — built and deployed from the Grand Line
        </footer>
      </div>
    </div>
  )
}
