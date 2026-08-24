import React from 'react'

export const profile = {
  name: 'Eussef Maniebo',
  tabName: 'eussef-maniebo',
  role: 'Web Developer / Network & Cybersecurity',
  location: 'Tagaytay City, PH',
  status: 'Open for freelance work',
  track: 'eJPT → OSCP',
  headline: (
    <>I build web products, then learn how to <span className="text-accent">break</span> them.</>
  ),
  bio: `BSIT graduate, Network & Cybersecurity, MMDC. I ship production React/Next.js applications through my freelance practice, Web D. Loper, and study offensive security in parallel — because building and attacking the same systems makes me better at both.`,
}

export const projects = [
  {
    name: 'OutageRadar',
    url: 'https://outageradar-dashboard.vercel.app',
    status: 'live',
    desc: 'Live status dashboard for third-party vendor dependencies — polls services like Cloudflare, GitHub, Slack, Stripe, and Vercel every 5 minutes and surfaces degraded/down services at a glance.',
    stack: ['React', 'Vite', 'Tailwind'],
  },
  {
    name: 'PediChart',
    url: 'https://pedichart.vercel.app',
    status: 'live',
    desc: 'Offline-first patient records system built for a pediatric clinic — a local sync queue, duplicate detection, and CSV export keep it usable with zero connectivity.',
    stack: ['React', 'Supabase', 'PWA'],
  },
  {
    name: 'isabelmonserrat.com',
    url: 'https://isabelmonserrat.com',
    status: 'live',
    desc: 'Portfolio site for painter/sculptor Isabel Monserrat — full exhibition archive, SEO indexing, and image optimization built to gallery-site standards.',
    stack: ['Next.js', 'Tailwind', 'Vercel'],
  },
  {
    name: 'Mushroom Snacks POS',
    url: null,
    status: 'dev',
    desc: 'Point-of-sale system for a king oyster mushroom snack venture, built for retail placement in Tagaytay.',
    stack: ['React', 'Inventory / Orders'],
  },
  {
    name: 'TruSolar',
    url: null,
    status: 'live',
    desc: 'Marketing site for a solar installer with a multi-step calculator that estimates system size and savings from household usage.',
    stack: ['HTML/CSS/JS', 'GitHub Pages'],
  },
]

export const skills = {
  Development: [
    'React & Next.js',
    'Tailwind CSS',
    'Supabase (Postgres, Auth, Storage)',
    'Vercel deployment & CI',
    'Offline-first / PWA architecture',
  ],
  Security: [
    'Kali Linux lab environments',
    'Web app testing (SQLi, XSS, auth flaws)',
    'HackTheBox — Starting Point track',
    'Wireless network analysis',
    'Windows Server administration',
  ],
}

export const certTrack = [
  { name: 'HackTheBox — Starting Point', state: 'in progress', done: true },
  { name: 'eJPT', state: 'current target', done: true },
  { name: 'OSCP', state: 'goal — before 2028', done: false },
]

export const contact = [
  { label: 'EMAIL', value: 'youremail@example.com', href: 'mailto:youremail@example.com' },
  { label: 'BUSINESS', value: 'Web D. Loper', href: null },
  { label: 'GITHUB', value: 'github.com/emaniebo420', href: 'https://github.com/emaniebo420' },
]
