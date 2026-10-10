import { motion, useReducedMotion } from 'motion/react'
import { FaGithub, FaLinkedinIn, FaRegEnvelope, FaRegFileLines } from 'react-icons/fa6'
import { profile } from '../data'

// Only links that have a value in data.js are shown.
export const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedinIn },
  { label: 'Email', href: profile.email && `mailto:${profile.email}`, icon: FaRegEnvelope },
  { label: 'Resume', href: profile.resumeUrl, icon: FaRegFileLines, download: true },
].filter((link) => link.href)

export default function SocialLinks({ size = 'md', className = '' }) {
  const reduce = useReducedMotion()
  const box = size === 'lg' ? 'h-12 w-12 text-xl' : 'h-11 w-11 text-lg'

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon, download }) => {
        const external = href.startsWith('http')
        return (
          <li key={label} className="group relative">
            <motion.a
              href={href}
              aria-label={label}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              {...(download && { download: '' })}
              whileHover={reduce ? undefined : { scale: 1.1 }}
              whileTap={reduce ? undefined : { scale: 0.95 }}
              className={`${box} flex items-center justify-center rounded-full bg-surface/60 text-ink ring-1 ring-line backdrop-blur-sm transition-[color,box-shadow] duration-300 hover:text-accent hover:shadow-[0_0_24px_var(--glow)]`}
            >
              <Icon aria-hidden="true" />
            </motion.a>
            <span
              role="tooltip"
              className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-xs whitespace-nowrap text-page opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              {label}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
