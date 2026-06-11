'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/data/faq'

/**
 * Dragspels-FAQ i mörkt tema. Innehållet kommer från lib/data/faq.ts (samma
 * källa som FAQ-strukturerad data), så frågor redigeras på ett ställe.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-surface overflow-hidden">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i
        return (
          <li
            key={item.question}
            className={`border-l-2 transition-colors duration-300 ${
              isOpen ? 'border-l-brand-pink bg-brand-pink/[0.04]' : 'border-l-transparent'
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold transition-colors hover:text-brand-pink ${
                  isOpen ? 'text-brand-pink-light' : 'text-cream'
                }`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-brand-pink transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 pb-5 text-cream/70 leading-relaxed transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
