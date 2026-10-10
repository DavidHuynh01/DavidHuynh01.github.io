import { motion, useReducedMotion } from 'motion/react'
import { FaGithub } from 'react-icons/fa6'
import { LuExternalLink, LuLock } from 'react-icons/lu'
import ProjectImage from './ProjectImage'
import Reveal from './Reveal'

function IconLink({ href, label, children }) {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={reduce ? undefined : { scale: 1.1 }}
      className="rounded-full p-2 text-ink/75 transition-colors hover:text-accent"
    >
      {children}
    </motion.a>
  )
}

// Image on one side, text on the other, alternating each row. Nothing overlaps.
// Projects without a longDescription (e.g. unpublished research) don't open a modal.
export default function ProjectRow({ project, index, onOpen }) {
  const flip = index % 2 === 1
  const hasDetails = Boolean(project.longDescription)
  const open = (e) => onOpen(project, e.currentTarget)
  const Media = hasDetails ? 'button' : 'div'

  return (
    <Reveal as="article" className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <Media
        {...(hasDetails && {
          type: 'button',
          onClick: open,
          'aria-label': `Open details for ${project.title}`,
        })}
        className={`group relative block w-full overflow-hidden rounded-2xl ring-1 ring-line transition-shadow duration-500 md:col-span-7 ${
          hasDetails ? 'hover:shadow-[0_0_48px_var(--glow)]' : ''
        } ${flip ? 'md:order-2' : ''}`}
      >
        <ProjectImage
          project={project}
          index={index}
          className={hasDetails ? 'transition-transform duration-700 group-hover:scale-[1.03]' : ''}
        />
        {hasDetails && (
          <>
            <span className="absolute inset-0 bg-[#140c1c]/0 transition-colors duration-500 group-hover:bg-[#140c1c]/45" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/30 backdrop-blur-sm">
                View details
              </span>
            </span>
          </>
        )}
      </Media>

      <div className={`min-w-0 md:col-span-5 ${flip ? 'md:order-1' : ''}`}>
        <p className="text-xs font-medium tracking-[0.25em] text-accent uppercase">
          {String(index + 1).padStart(2, '0')}
          <span aria-hidden="true" className="mx-2.5 inline-block h-px w-5 bg-accent/60 align-middle" />
          {project.kind ?? 'Featured Project'}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-bold text-balance md:text-3xl">
          {hasDetails ? (
            <button type="button" onClick={open} className="text-left transition-colors hover:text-accent">
              {project.title}
            </button>
          ) : (
            project.title
          )}
        </h3>

        {project.description && (
          <p className="mt-4 rounded-2xl bg-surface/80 p-5 leading-relaxed text-ink/85 ring-1 ring-line">
            {project.description}
          </p>
        )}
        {project.note && (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted italic">
            <LuLock className="h-4 w-4 shrink-0 not-italic" aria-hidden="true" />
            {project.note}
          </p>
        )}

        {project.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted" aria-label="Technologies">
            {project.technologies.slice(0, 5).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-3 -ml-2 flex items-center gap-1">
            {project.repoUrl && (
              <IconLink href={project.repoUrl} label={`${project.title} source code on GitHub`}>
                <FaGithub className="h-5 w-5" aria-hidden="true" />
              </IconLink>
            )}
            {project.liveUrl && (
              <IconLink href={project.liveUrl} label={`${project.title} live demo`}>
                <LuExternalLink className="h-5 w-5" aria-hidden="true" />
              </IconLink>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}
