// Single source of truth for the content that is not markup: identity, social
// links, projects and contact destinations. Keeping it here means the views stay
// presentational and future edits do not touch component structure.
import { icons } from './icons.js'

export const site = {
  name: 'Talib Mushtaq',
  handle: 'TalibMushtaq',
  // TODO: set a real inbox (e.g. 'hi@dartalib.tech'). While empty, the mail row
  // is hidden rather than shipping a mailto: link that goes nowhere.
  email: '',
}

export const socials = [
  { name: 'GitHub', icon: icons.github, url: 'https://github.com/TalibMushtaq' },
  {
    name: 'LinkedIn',
    icon: icons.linkedin,
    url: 'https://www.linkedin.com/in/talib-dar',
  },
  { name: 'X', icon: icons.x, url: 'https://x.com/taalib_mushtaq' },
]

// Contact rows are ordered most-reachable first, mirroring the reference design's
// searchable platform list.
export const platforms = [
  ...(site.email
    ? [{ name: 'Email', icon: icons.mail, url: `mailto:${site.email}` }]
    : []),
  { name: 'GitHub', icon: icons.github, url: 'https://github.com/TalibMushtaq' },
  {
    name: 'LinkedIn',
    icon: icons.linkedin,
    url: 'https://www.linkedin.com/in/talib-dar',
  },
  { name: 'X (Twitter)', icon: icons.x, url: 'https://x.com/taalib_mushtaq' },
]

// `color` becomes each strip's background on the projects page, so values are
// kept deep and saturated enough to hold white text at full width.
export const projects = [
  {
    name: 'Nodus',
    subtitle: 'Offline-first encrypted storage that syncs across devices',
    url: 'https://github.com/TalibMushtaq/nodus',
    color: '#16233b',
  },
  {
    name: 'Xypheria',
    subtitle: 'Hackathon management platform for registrations and teams',
    url: 'https://github.com/TalibMushtaq/xypheria',
    color: '#123328',
  },
  {
    name: 'IndoorNav',
    subtitle: 'Indoor navigation system on the MERN stack',
    url: 'https://github.com/TalibMushtaq/indoornav-app',
    color: '#0d3550',
  },
  {
    name: 'Mūsim',
    subtitle: 'Lightweight multi-source weather aggregation',
    url: 'https://github.com/TalibMushtaq/Musim',
    color: '#0f4152',
  },
  {
    name: 'ChatHubby',
    subtitle: 'Self-hosted real-time chat with voice and video calls',
    url: 'https://github.com/TalibMushtaq/chathubby',
    color: '#411c2a',
  },
]
