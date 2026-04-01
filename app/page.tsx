import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import NewsInsight from '@/components/NewsInsight'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Solution from '@/components/Solution'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <NewsInsight />
        <Services />
        <Projects />
        <Solution />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
