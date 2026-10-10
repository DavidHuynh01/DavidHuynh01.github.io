import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import { LuExternalLink, LuX } from 'react-icons/lu'
import ProjectImage from './ProjectImage'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function ModalBody({ project, index, onClose }) {
  const [selected, setSelected] = useState(0)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const reduce = useReducedMotion()
  const titleId = `project-${project.slug}-title`

  useEffect(() => {
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      // Keep keyboard focus inside the dialog.
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-[#05060f]/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduce ? false : { y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 48, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-surface shadow-2xl ring-1 ring-line sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          <LuX className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="overflow-hidden">
          <ProjectImage
            project={project}
            index={index}
            src={project.images[selected]}
            className="max-h-[45svh]"
          />
        </div>

        {project.images.length > 1 && (
          <ul className="flex gap-2 overflow-x-auto px-6 pt-4 sm:px-8" aria-label="Screenshots">
            {project.images.map((img, i) => (
              <li key={img} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-pressed={selected === i}
                  className={`block overflow-hidden rounded-lg ring-2 transition ${
                    selected === i ? 'ring-accent' : 'opacity-60 ring-transparent hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" loading="lazy" className="aspect-video h-12 w-auto object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.25em] text-accent uppercase">
            {project.kind ?? 'Featured Project'}
            {project.period && <span className="text-muted"> · {project.period}</span>}
          </p>
          <h3 id={titleId} className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-ink/85">{project.longDescription}</p>

          {project.highlights?.length > 0 && (
            <ul className="mt-5 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-sakura" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full bg-sakura/10 px-3 py-1 text-xs font-medium text-sakura ring-1 ring-sakura/25">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-page shadow-[0_0_24px_var(--glow)] transition-transform hover:-translate-y-0.5"
              >
                <LuExternalLink className="h-4 w-4" aria-hidden="true" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-2.5 text-sm font-medium ring-1 ring-line transition-transform hover:-translate-y-0.5"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProjectModal({ project, index, onClose }) {
  return (
    <AnimatePresence>
      {project && <ModalBody key={project.slug} project={project} index={index} onClose={onClose} />}
    </AnimatePresence>
  )
}
