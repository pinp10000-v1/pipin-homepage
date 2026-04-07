'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'NEWS', href: '#news' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERTISE', href: '#solution' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [clickedSection, setClickedSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Active section detection
      const sections = ['hero', 'about', 'news', 'services', 'projects', 'solution', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    setClickedSection(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setTimeout(() => setClickedSection(null), 800)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          className={`flex items-center gap-3 font-black text-base md:text-lg tracking-tight leading-none transition-colors duration-300 ${
            scrolled ? 'text-navy' : 'text-white'
          }`}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src="/image/logo_transparent.png"
              alt="피플인피플 로고"
              fill
              className="object-contain"
            />
          </div>
          <div>
            PEOPLE IN PEOPLE
            <span className={`block text-[10px] font-semibold tracking-[0.2em] mt-0.5 transition-colors duration-300 ${
              scrolled ? 'text-teal' : 'text-teal/70'
            }`}>
              ㈜피플인피플
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-xs font-semibold tracking-[0.18em] transition-colors duration-300 pb-1 ${
                  isActive
                    ? 'text-teal'
                    : scrolled ? 'text-gray-600 hover:text-navy' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {/* 호버 실선 */}
                <span className="absolute bottom-0 left-0 h-[2px] bg-teal/30 w-0 group-hover:w-full transition-all duration-300" />
                {/* 클릭 실선: 좌→우 펼쳐짐 */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-teal transition-all duration-500 ease-out ${
                    isActive || clickedSection === sectionId ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            )
          })}

          <button
            onClick={() => handleNavClick('#contact')}
            className={`text-xs font-bold tracking-[0.18em] border-2 px-5 py-2.5 transition-all duration-200 ${
              scrolled
                ? 'border-navy text-navy hover:bg-navy hover:text-white'
                : 'border-white/70 text-white hover:bg-white hover:text-navy'
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            } ${scrolled ? 'bg-navy' : 'bg-white'}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            } ${scrolled ? 'bg-navy' : 'bg-white'}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            } ${scrolled ? 'bg-navy' : 'bg-white'}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-5 gap-5">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-xs font-semibold tracking-[0.18em] text-gray-700 hover:text-navy"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="text-left text-xs font-bold tracking-[0.18em] text-teal hover:text-navy border-t border-gray-100 pt-4"
          >
            CONTACT →
          </button>
        </div>
      </div>
    </header>
  )
}
