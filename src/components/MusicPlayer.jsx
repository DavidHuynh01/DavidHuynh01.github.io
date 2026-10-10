import { useEffect, useRef, useState } from 'react'
import { LuMusic, LuVolume1, LuVolume2, LuVolumeX } from 'react-icons/lu'
import { music } from '../data'

const VOLUME_KEY = 'music-volume'

function readVolume() {
  try {
    const saved = parseFloat(localStorage.getItem(VOLUME_KEY))
    if (saved >= 0 && saved <= 1) return saved
  } catch {
    // storage unavailable: fall back to the default
  }
  return music.volume
}

// Floating music control: the button plays / mutes, the slider sets volume.
// Playback fades in gently and always starts paused (no surprise audio).
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const fadeRef = useRef(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [volume, setVolume] = useState(readVolume)

  useEffect(() => {
    try {
      localStorage.setItem(VOLUME_KEY, String(volume))
    } catch {
      // ignore
    }
    // Follow slider changes immediately (cancels any fade in progress).
    clearInterval(fadeRef.current)
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => () => clearInterval(fadeRef.current), [])

  if (!music.src) return null

  // Timer-based (not rAF) so the fade still finishes if the tab goes to the background.
  const fadeIn = (audio) => {
    clearInterval(fadeRef.current)
    const start = performance.now()
    audio.volume = 0
    fadeRef.current = setInterval(() => {
      const t = Math.min((performance.now() - start) / 1500, 1)
      audio.volume = volume * t
      if (t === 1) clearInterval(fadeRef.current)
    }, 50)
  }

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }
    try {
      await audio.play()
      fadeIn(audio)
      setPlaying(true)
      setStarted(true)
    } catch {
      // Playback was blocked or the file is missing; leave the button as-is.
    }
  }

  const VolumeIcon = !playing || volume === 0 ? LuVolumeX : volume < 0.5 ? LuVolume1 : LuVolume2

  return (
    <div className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-surface/80 p-1.5 shadow-lg ring-1 ring-line backdrop-blur-md sm:right-6 sm:bottom-6">
      <audio ref={audioRef} src={music.src} loop preload="none" onEnded={() => setPlaying(false)} />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Mute ${music.title}` : `Play ${music.title}`}
        aria-pressed={playing}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-accent"
      >
        {!started && (
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-accent/25 motion-reduce:hidden" />
        )}
        {playing ? (
          <span aria-hidden="true" className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="eq-bar w-[3px] rounded-full bg-accent"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </span>
        ) : started ? (
          <LuVolumeX className="h-5 w-5" aria-hidden="true" />
        ) : (
          <LuMusic className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Title + volume slider (wider screens; phones use their own volume keys) */}
      <div className="hidden items-center gap-2 pr-3 sm:flex">
        <span className="max-w-32 truncate text-xs font-medium text-muted">{music.title}</span>
        <VolumeIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Music volume"
          className="h-1 w-20 cursor-pointer accent-[var(--accent)]"
        />
      </div>
    </div>
  )
}
