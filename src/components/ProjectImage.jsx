import { LuCodeXml } from 'react-icons/lu'

// Gentle hue shifts so placeholder skies don't all look identical.
const HUES = [0, 28, -24, 48, -40]

// A screenshot, or (when a project has none yet) a small dusk-sky card
// with the project's icon.
export default function ProjectImage({ project, src, index = 0, className = '' }) {
  const image = src ?? project.images[0]

  if (image) {
    return (
      <img
        src={image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        className={`aspect-video w-full object-cover ${className}`}
      />
    )
  }

  const Icon = project.placeholderIcon ?? LuCodeXml
  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden ${className}`}
      style={{ filter: `hue-rotate(${HUES[index % HUES.length]}deg)` }}
    >
      <div className="sky-light absolute inset-0" />
      <div className="sky-dark absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/25 to-transparent dark:from-black/40" />
      <div className="relative flex max-w-full flex-col items-center gap-4 px-6 text-center text-white">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
          <Icon className="h-9 w-9" aria-hidden="true" />
        </span>
        <span className="font-display text-xl font-bold tracking-wide text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {project.title}
        </span>
      </div>
    </div>
  )
}
