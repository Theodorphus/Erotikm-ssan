import { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { EVENT } from '@/lib/data/event'

export const metadata: Metadata = {
  title: 'Integritetspolicy',
  description:
    'Så hanterar Erotikmässan dina personuppgifter när du kontaktar oss via webbplatsen. Vi följer GDPR.',
  alternates: { canonical: '/integritetspolicy' },
  robots: { index: false, follow: true },
}

export default function IntegritetspolicyPage() {
  return (
    <>
      <PageHero
        title="Integritetspolicy"
        subtitle="Vi värnar om din integritet och är öppna med hur vi hanterar dina uppgifter."
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ink">
        <div className="max-w-3xl mx-auto bg-surface rounded-2xl border border-white/10 p-7 sm:p-10">
          <article className="space-y-8 text-cream/75">
            <p>
              Den här policyn beskriver hur {EVENT.name} (”vi”, ”oss”) behandlar dina
              personuppgifter när du besöker {EVENT.siteUrl.replace('https://', '')} eller
              kontaktar oss. Vi följer dataskyddsförordningen (GDPR).
            </p>

            <Section title="Personuppgiftsansvarig">
              <p>
                {EVENT.name} är personuppgiftsansvarig för behandlingen av dina personuppgifter.
                Har du frågor är du välkommen att kontakta oss på{' '}
                <a href={`mailto:${EVENT.email}`} className="text-brand-pink hover:text-brand-pink-dark">
                  {EVENT.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Vilka uppgifter vi samlar in">
              <p>
                När du fyller i kontaktformuläret samlar vi in de uppgifter du själv lämnar –
                normalt namn, e-postadress och innehållet i ditt meddelande. Vi samlar inte in
                fler uppgifter än de du väljer att dela.
              </p>
            </Section>

            <Section title="Varför vi behandlar uppgifterna">
              <p>
                Vi använder uppgifterna enbart för att besvara din förfrågan och återkomma till dig.
                Den rättsliga grunden är vårt berättigade intresse av att kunna svara på din kontakt.
              </p>
            </Section>

            <Section title="Hur länge vi sparar uppgifterna">
              <p>
                Vi sparar din förfrågan så länge det behövs för att hantera ärendet och en eventuell
                fortsatt kontakt, och raderar den därefter när den inte längre fyller något syfte.
              </p>
            </Section>

            <Section title="Dina rättigheter">
              <p>
                Du har rätt att begära ett utdrag av de uppgifter vi har om dig, att få felaktiga
                uppgifter rättade och att i många fall få dem raderade. Hör av dig till{' '}
                <a href={`mailto:${EVENT.email}`} className="text-brand-pink hover:text-brand-pink-dark">
                  {EVENT.email}
                </a>
                . Anser du att vi behandlar dina uppgifter felaktigt kan du lämna klagomål till
                Integritetsskyddsmyndigheten (IMY).
              </p>
            </Section>
          </article>
        </div>
      </section>
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-cream mb-3">{title}</h2>
      <div className="leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
