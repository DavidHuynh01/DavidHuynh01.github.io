import { motion, useReducedMotion } from 'motion/react'
import { LuChevronDown } from 'react-icons/lu'
import SkyBackground from './SkyBackground'
import SocialLinks from './SocialLinks'
import { profile } from '../data'

export default function Hero() {
  const reduce = useReducedMotion()
  const fadeUp = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
        }

  return (
    <section id="top" className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <SkyBackground />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-24 text-center sm:px-6">
        <motion.p
          {...fadeUp(0.1)}
          className="text-xs font-medium tracking-[0.25em] text-ink/70 uppercase sm:text-sm sm:tracking-[0.35em]"
        >
          <span className="whitespace-nowrap">{profile.role}</span> <span className="opacity-50">·</span>{' '}
          <span className="whitespace-nowrap">
            {profile.school}
            <span aria-hidden="true" className="ml-3 font-display tracking-[0.2em] normal-case opacity-60">
              {profile.jpAccent}
            </span>
          </span>
        </motion.p>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-5 font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl dark:[text-shadow:0_0_40px_var(--glow)]"
        >
          {profile.name}
        </motion.h1>

        <motion.p {...fadeUp(0.4)} className="mx-auto mt-6 max-w-xl text-base text-ink/75 sm:text-lg">
          {profile.tagline}
        </motion.p>

        <motion.div {...fadeUp(0.55)} className="mt-9 flex justify-center">
          <SocialLinks size="lg" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-[150px] left-1/2 z-10 -translate-x-1/2 rounded-full p-2 text-ink/60 transition-colors hover:text-accent md:bottom-[190px]"
      >
        <LuChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
