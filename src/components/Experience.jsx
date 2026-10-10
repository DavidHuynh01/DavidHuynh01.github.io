import { LuBriefcase, LuGraduationCap, LuMapPin } from 'react-icons/lu'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { experience } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading id="experience" />

        <ol className="relative ml-4 border-l border-line">
          {experience.map((item, i) => {
            const Icon = item.type === 'education' ? LuGraduationCap : LuBriefcase
            return (
              <Reveal as="li" key={item.title + item.org} delay={i * 0.08} className="relative pb-12 pl-10 last:pb-0">
                <span className="absolute top-0 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-accent shadow-[0_0_24px_var(--glow)] ring-1 ring-line">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>

                <div className="rounded-2xl bg-surface/70 p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_32px_var(--glow)]">
                  {item.period && (
                    <p className="text-xs font-medium tracking-widest text-accent uppercase">{item.period}</p>
                  )}
                  <h3 className="mt-1 font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-1 font-medium text-ink/80">{item.org}</p>
                  {item.location && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <LuMapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </p>
                  )}
                  {item.description && <p className="mt-4 leading-relaxed text-ink/80">{item.description}</p>}
                  {item.highlights?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-sakura" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
