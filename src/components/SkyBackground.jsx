import { useMemo } from 'react'
import CloudShader from './CloudShader'
import { useIsDark } from '../hooks/useTheme'

// Small seeded RNG so the petals and skyline look the same on every load.
function rng(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Shader palettes: a soft daytime sky, and yozakura (night sakura).
const DAY = {
  skyTop: '#9ec3ee',
  skyMid: '#e4d6f2',
  skyBottom: '#fbdcca',
  cloud: '#fdfbff',
  glow: '#fff2d1',
  glowStrength: 0.28,
  stars: 0,
}
const NIGHT = {
  skyTop: '#0c0814',
  skyMid: '#2b1838',
  skyBottom: '#9b5577',
  cloud: '#4d3452',
  glow: '#ffc7dd',
  glowStrength: 0.16,
  stars: 1,
}

const W = 1440
const H = 200

function buildSkyline(seed, { minW, maxW, minH, maxH, antennaChance = 0 }) {
  const rand = rng(seed)
  const buildings = []
  let d = `M0 ${H}`
  let x = 0
  while (x < W) {
    const w = minW + rand() * (maxW - minW)
    const h = minH + rand() * (maxH - minH)
    const top = H - h
    d += ` L${x.toFixed(1)} ${top.toFixed(1)}`
    if (rand() < antennaChance) {
      const ax = x + w * 0.5
      d += ` L${(ax - 1).toFixed(1)} ${top.toFixed(1)} L${(ax - 1).toFixed(1)} ${(top - 18).toFixed(1)} L${(ax + 1).toFixed(1)} ${(top - 18).toFixed(1)} L${(ax + 1).toFixed(1)} ${top.toFixed(1)}`
    }
    d += ` L${(x + w).toFixed(1)} ${top.toFixed(1)}`
    buildings.push({ x, w, top })
    x += w
  }
  d += ` L${W} ${H} Z`
  return { d, buildings }
}

export default function SkyBackground() {
  const isDark = useIsDark()

  const petals = useMemo(() => {
    const rand = rng(5)
    return Array.from({ length: 14 }, () => {
      const dur = 10 + rand() * 8
      return {
        left: rand() * 100,
        size: 8 + rand() * 5,
        dur,
        delay: -rand() * dur,
        drift: 40 + rand() * 120,
        spin: 360 + rand() * 540,
        flutter: 2 + rand() * 2.5,
      }
    })
  }, [])

  const far = useMemo(
    () => buildSkyline(11, { minW: 26, maxW: 70, minH: 55, maxH: 135, antennaChance: 0.12 }),
    [],
  )
  const near = useMemo(() => buildSkyline(23, { minW: 38, maxW: 105, minH: 18, maxH: 78 }), [])

  const windows = useMemo(() => {
    const rand = rng(41)
    return near.buildings
      .filter((b) => H - b.top > 42 && rand() < 0.5)
      .map((b) => ({
        x: b.x + 6 + rand() * Math.max(b.w - 16, 1),
        y: b.top + 8 + rand() * 18,
      }))
  }, [near])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* CSS sky: shows while the shader loads, and stays if WebGL is unavailable */}
      <div className="sky-light absolute inset-0" />
      <div className="sky-dark absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100" />

      {/* Drifting clouds (and night stars), rendered on the GPU */}
      <CloudShader palette={isDark ? NIGHT : DAY} speed={0.8} count={5} />

      {/* Moon sits on the shader's glow; shooting star now and then (night only) */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100">
        <span
          className="absolute top-[20%] left-[80%] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ boxShadow: 'inset -9px 4px 0 0 #fff1f7, 0 0 48px 6px rgba(245,163,199,0.2)' }}
        />
        <span className="shooting-star absolute top-[9%] right-[6%] h-px w-28 bg-linear-to-r from-white to-transparent opacity-0" />
      </div>

      {/* City skyline + power lines, fading into the page */}
      <svg
        className="absolute bottom-0 left-0 h-[150px] w-full md:h-[200px]"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
      >
        <path d={far.d} fill="var(--accent)" opacity="0.16" />
        <g fill="none" stroke="var(--wire)" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
          <path d="M1130 56 Q 600 128 -20 72" />
          <path d="M1136 70 Q 640 150 -20 98" />
          <path d="M1176 56 Q 1320 96 1460 62" />
          <path d="M1170 70 Q 1320 112 1460 88" />
        </g>
        <g fill="var(--wire)">
          <rect x="1151" y="40" width="5" height="160" />
          <rect x="1126" y="53" width="56" height="4" rx="1" />
          <rect x="1133" y="67" width="42" height="3" rx="1" />
        </g>
        <path d={near.d} fill="var(--base)" />
        <g className="opacity-0 transition-opacity duration-700 dark:opacity-100" fill="#fcd9a8">
          {windows.map((w, i) => (
            <rect key={i} x={w.x} y={w.y} width="3" height="4" opacity="0.55" />
          ))}
        </g>
      </svg>

      {/* Falling sakura petals (night only) */}
      <div className="absolute inset-0 hidden [perspective:600px] dark:block">
        {petals.map((p, i) => (
          <span
            key={i}
            className="petal absolute top-0"
            style={{
              left: `${p.left}%`,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
              '--spin': `${p.spin}deg`,
            }}
          >
            <span
              className="petal-flutter block"
              style={{ width: p.size, height: p.size * 0.8, '--flutter': `${p.flutter}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
