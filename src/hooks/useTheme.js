import { useCallback, useEffect, useState } from 'react'

const isDarkNow = () => document.documentElement.classList.contains('dark')

// The initial class is set by the inline script in index.html,
// so we just read it back here instead of re-deciding.
export function useTheme() {
  const [isDark, setIsDark] = useState(isDarkNow)

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next ? '#120D18' : '#F7F5FB')
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light')
      } catch {
        // Storage can be unavailable (private mode); the toggle still works for this visit.
      }
      return next
    })
  }, [])

  return { isDark, toggle }
}

// Read-only: follows the theme class wherever it's toggled from.
export function useIsDark() {
  const [isDark, setIsDark] = useState(isDarkNow)
  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(isDarkNow()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return isDark
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}
