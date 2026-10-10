import { LuAward } from 'react-icons/lu'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { awards } from '../data'

export default function Awards() {
  if (awards.length === 0) return null

  return (
    <section id="awards" className="relative bg-surface-2/30 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading id="awards" title="Awards & honors" />

        <ul className="grid gap-5 sm:grid-cols-2">
          {awards.map((award, i) => (
            <Reveal
              as="li"
              key={award.title}
              delay={(i % 2) * 0.08}
              className="group flex gap-4 rounded-2xl bg-surface/80 p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_32px_var(--glow)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent ring-1 ring-line transition-shadow duration-300 group-hover:shadow-[0_0_20px_var(--glow)]">
                <LuAward className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                {award.period && (
                  <p className="text-xs font-medium tracking-widest text-accent uppercase">{award.period}</p>
                )}
                <h3 className="mt-1 font-display text-lg font-bold">{award.title}</h3>
                <p className="mt-0.5 text-sm font-medium text-ink/75">{award.issuer}</p>
                {award.description && (
                  <p className="mt-3 text-sm leading-relaxed text-ink/75">{award.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
