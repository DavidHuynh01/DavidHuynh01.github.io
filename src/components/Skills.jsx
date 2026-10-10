import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { skills } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading id="skills" title="Skills & tools" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ group, items }, i) => (
            <Reveal key={group} delay={(i % 3) * 0.08} className="rounded-2xl bg-surface/80 p-6 ring-1 ring-line">
              <h3 className="text-xs font-medium tracking-[0.25em] text-accent uppercase">{group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="group flex items-center gap-2 rounded-lg bg-surface-2/70 px-3 py-2 text-sm font-medium ring-1 ring-line transition-[box-shadow,color] duration-300 hover:shadow-[0_0_20px_var(--glow)] hover:ring-accent/40"
                  >
                    <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
