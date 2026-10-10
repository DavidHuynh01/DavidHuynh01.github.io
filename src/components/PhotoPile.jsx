import { useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { LuCamera, LuMove } from 'react-icons/lu'
import { useMediaQuery } from '../hooks/useTheme'
import { photos } from '../data'

// Polaroid pile adapted from Aceternity UI's Draggable Card (ui.aceternity.com, Aceternity License).
// Changes: cards stay inside the pile, the grabbed card comes to the front, tilt respects
// reduced motion, and below md the cards become a static grid so they never block scrolling.

// Resting spots for up to six cards on wider screens.
const SLOTS = [
  { left: '0%', top: '18%', rotate: -6 },
  { left: '25%', top: '1%', rotate: 3 },
  { left: '47%', top: '22%', rotate: -3 },
  { left: '73%', top: '4%', rotate: 6 },
  { left: '14%', top: '26%', rotate: 3 },
  { left: '60%', top: '28%', rotate: -6 },
]

const spring = { stiffness: 100, damping: 20, mass: 0.5 }

function PhotoCard({ photo, slot, z, draggable, containerRef, onGrab }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [16, -16]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-16, 16]), spring)
  const tilt = draggable && !reduce

  const onMouseMove = (e) => {
    if (!tilt) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }
  const resetTilt = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.figure
      ref={ref}
      drag={draggable}
      dragConstraints={containerRef}
      dragElastic={0.15}
      onPointerDown={onGrab}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
      onDragStart={resetTilt}
      whileHover={tilt ? { scale: 1.03 } : undefined}
      whileDrag={{ scale: 1.06 }}
      style={{
        rotate: slot.rotate,
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        zIndex: z,
        ...(draggable && { left: slot.left, top: slot.top }),
      }}
      className={`${
        draggable
          ? `absolute cursor-grab active:cursor-grabbing ${photo.landscape ? 'w-56 lg:w-64' : 'w-44 lg:w-52'}`
          : `relative w-full ${photo.landscape ? 'col-span-2' : ''}`
      } rounded-[3px] bg-[#fdfcfb] p-2.5 pb-3 shadow-[0_12px_32px_rgba(0,0,0,0.18)] select-none dark:bg-[#efe7ee] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)]`}
    >
      {/* washi tape */}
      <span
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 -rotate-3 bg-sakura/35 dark:bg-accent/45"
      />

      <div className={`${photo.landscape ? 'aspect-[4/3]' : 'aspect-[4/5]'} overflow-hidden bg-[#e9e4ee]`}>
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            draggable={false}
            className="pointer-events-none h-full w-full object-cover"
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 text-white">
            <div className="sky-light absolute inset-0" />
            <div className="sky-dark absolute inset-0 opacity-0 dark:opacity-100" />
            <LuCamera className="relative h-7 w-7 opacity-80" aria-hidden="true" />
            <span className="relative text-xs font-medium tracking-wide opacity-80">photo soon</span>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 text-center font-display text-sm font-bold text-[#2a2738]">
        {photo.caption}
      </figcaption>
    </motion.figure>
  )
}

export default function PhotoPile() {
  const wide = useMediaQuery('(min-width: 768px)')
  const containerRef = useRef(null)

  // Stacking order (last = on top). Featured photos start on top.
  const [order, setOrder] = useState(() => {
    const idx = photos.map((_, i) => i)
    return [...idx.filter((i) => !photos[i].featured), ...idx.filter((i) => photos[i].featured)]
  })
  const bringToFront = (i) => setOrder((o) => (o[o.length - 1] === i ? o : [...o.filter((x) => x !== i), i]))

  if (photos.length === 0) return null

  return (
    <div className="mt-20 md:mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
          Off the screen
          <span aria-hidden="true" className="ml-2 font-display tracking-[0.15em] text-muted normal-case opacity-70">
            日常
          </span>
        </p>
        {wide && (
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <LuMove className="h-3.5 w-3.5" aria-hidden="true" />
            drag them around
          </p>
        )}
      </div>

      <div
        ref={containerRef}
        className={
          wide
            ? 'relative mt-6 h-[24rem] [perspective:2000px]'
            : 'mt-8 grid grid-cols-2 gap-x-4 gap-y-8 px-1'
        }
      >
        {wide && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[9rem] font-bold text-ink opacity-[0.05] select-none"
          >
            日常
          </span>
        )}
        {photos.map((photo, i) => (
          <PhotoCard
            key={photo.caption}
            photo={photo}
            slot={wide ? SLOTS[i % SLOTS.length] : { rotate: i % 2 ? 3 : -3 }}
            z={order.indexOf(i) + 1}
            draggable={wide}
            containerRef={containerRef}
            onGrab={() => bringToFront(i)}
          />
        ))}
      </div>
    </div>
  )
}
