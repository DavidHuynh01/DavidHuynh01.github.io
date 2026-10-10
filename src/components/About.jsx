import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import PhotoPile from './PhotoPile'
import { about, profile } from '../data'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading id="about" title="About me" />

        <div className="grid items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          <Reveal className="mx-auto">
            <div className="group relative h-48 w-48 md:h-56 md:w-56">
              <div className="absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-accent to-sakura opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-line">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={`Portrait of ${profile.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface-2 font-display text-5xl font-bold text-accent">
                    {profile.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-ink/85 md:text-lg">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map(({ label, value }) => (
                <div key={label} className="rounded-xl bg-surface/70 px-4 py-3 ring-1 ring-line">
                  <dt className="text-xs font-medium tracking-widest text-accent uppercase">{label}</dt>
                  <dd className="mt-1 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <PhotoPile />
      </div>
    </section>
  )
}
