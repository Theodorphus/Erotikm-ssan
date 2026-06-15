export interface NavItem {
  label: string
  href: string
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Hem', href: '/' },
  { label: 'Artister', href: '/artister' },
  { label: 'Utställare', href: '/utstallare' },
  { label: 'Boka artist', href: '/boka-artist' },
  { label: 'Biljetter', href: '/biljetter' },
  { label: 'Om oss', href: '/om-oss' },
  { label: 'Kontakt', href: '/kontakt' },
]

// Footern visar samma länkar som huvudmenyn – återanvänd listan.
export const FOOTER_LINKS: NavItem[] = MAIN_NAV
