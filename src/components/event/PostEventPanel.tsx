import { Sparkles } from 'lucide-react'
import type { EventData } from '@/lib/content'
import { NotifyForm } from './NotifyForm'

/**
 * Ersätter nedräknaren i heron när mässan är genomförd (event.isPast).
 *
 * Syftet är dubbelt: dels ska sajten inte se övergiven ut med en nedräknare
 * som står på noll, dels är veckorna efter mässan den enda tidpunkt då
 * trafiken är stor nog att bygga en e-postlista inför nästa år.
 */
export function PostEventPanel({ event }: { event: EventData }) {
  const { postEvent } = event

  return (
    <div
      id="intresseanmalan"
      className="mx-auto max-w-2xl rounded-2xl border border-brand-pink/30 bg-white/5 backdrop-blur-sm px-6 py-8 sm:px-10 scroll-mt-24"
    >
      <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand-pink-light mb-3">
        <Sparkles size={13} /> {postEvent.nextEditionText}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-cream mb-3">
        {postEvent.heading}
      </h2>
      <p className="text-cream/75 mb-8">{postEvent.text}</p>

      <div className="border-t border-white/10 pt-7">
        <h3 className="font-display text-lg font-bold text-cream mb-1.5">
          {postEvent.signupHeading}
        </h3>
        <p className="text-sm text-cream/60 mb-5">{postEvent.signupText}</p>
        <NotifyForm />
      </div>
    </div>
  )
}
