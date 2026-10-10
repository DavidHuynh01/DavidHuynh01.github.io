import { useCallback, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import ProjectRow from './ProjectRow'
import ProjectModal from './ProjectModal'
import { projects } from '../data'

export default function Projects() {
  const [openIndex, setOpenIndex] = useState(-1)
  const triggerRef = useRef(null)

  const open = useCallback((project, trigger) => {
    triggerRef.current = trigger
    setOpenIndex(projects.indexOf(project))
  }, [])

  const close = useCallback(() => {
    setOpenIndex(-1)
    // Return focus to whatever opened the dialog.
    triggerRef.current?.focus()
  }, [])

  return (
    <section id="projects" className="relative bg-surface-2/30 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading id="projects" title="Things I've built" />

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      <ProjectModal project={projects[openIndex]} index={openIndex} onClose={close} />
    </section>
  )
}
