import GrainOverlay from './components/GrainOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Awards from './components/Awards'
import Skills from './components/Skills'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[80] rounded-md bg-accent px-4 py-2 text-page focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <GrainOverlay />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Awards />
        <Skills />
      </main>
      <Footer />
      <MusicPlayer />
    </>
  )
}
