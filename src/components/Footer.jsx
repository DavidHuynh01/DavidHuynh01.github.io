import { LuArrowUpRight } from 'react-icons/lu'
import SectionHeading from './SectionHeading'
import SocialLinks from './SocialLinks'
import Reveal from './Reveal'
import { music, profile } from '../data'

export default function Footer() {
  const primary = profile.email
    ? { href: `mailto:${profile.email}`, label: 'Say hello' }
    : { href: profile.linkedin, label: 'Say hello on LinkedIn' }

  return (
    <footer id="contact" className="relative overflow-hidden pt-24 pb-10 md:pt-32">
      {/* faint dusk glow rising from the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,var(--glow),transparent_70%)] opacity-70"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionHeading id="contact" title="Let's talk" />

        <Reveal>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-ink/80 md:text-lg">
            I'm open to internships, collaborations, or just talking about games and code. Reach
            out anywhere below.
          </p>

          <a
            href={primary.href}
            {...(primary.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-page shadow-[0_0_32px_var(--glow)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {primary.label}
            <LuArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <SocialLinks className="mt-10 justify-center" />
        </Reveal>

        <p className="mt-20 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
          <span className="mx-2 opacity-50">·</span>
          <span className="font-display" lang="ja" title="See you!">
            またね
          </span>
        </p>
        {music.src && music.credit && (
          <p className="mt-2 text-xs text-muted/80">
            Music:{' '}
            <a href={music.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-accent hover:underline">
              “{music.title}”
            </a>{' '}
            by{' '}
            <a href={music.credit.artistUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-accent hover:underline">
              {music.credit.artist}
            </a>
            ,{' '}
            <a href={music.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-accent hover:underline">
              {music.credit.license}
            </a>
          </p>
        )}
      </div>
    </footer>
  )
}
