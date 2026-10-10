import Reveal from './Reveal'
import { sections } from '../data'

// "02 ─ PROJECTS · 作品" label, a bold title, and a faint vertical
// Japanese watermark on wider screens.
export default function SectionHeading({ id, title }) {
  const index = sections.findIndex((s) => s.id === id)
  const section = sections[index]
  const number = String(index + 1).padStart(2, '0')

  return (
    <Reveal y={-20} className="relative mb-14 text-center md:mb-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 hidden -translate-y-1/2 font-display text-5xl font-bold tracking-[0.2em] whitespace-nowrap text-ink opacity-[0.07] select-none [writing-mode:vertical-rl] md:block"
      >
        {section.jp}
      </span>
      <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
        {number}
        <span aria-hidden="true" className="mx-2.5 inline-block h-px w-5 bg-accent/60 align-middle" />
        {section.title}
        <span aria-hidden="true" className="ml-2 font-display tracking-[0.15em] text-muted normal-case opacity-70">
          {section.jp}
        </span>
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
        {title ?? section.title}
      </h2>
    </Reveal>
  )
}
