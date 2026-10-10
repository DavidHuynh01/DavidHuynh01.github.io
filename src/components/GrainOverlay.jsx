// A faint film-grain texture over the whole page, for the "anime frame" feel.
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
    />
  )
}
