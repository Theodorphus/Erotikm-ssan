/**
 * Egen layout för Studio – ska INTE ha sajtens header/footer.
 * Studion renderar sitt eget fullskärms-UI.
 */
export const metadata = {
  title: 'Erotikmässan – innehåll',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
