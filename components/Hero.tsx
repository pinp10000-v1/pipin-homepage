'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/image/hero_bg_grey.png"
          alt="부동산 분양 현장"
          fill
          priority
          className="object-cover object-center grayscale opacity-75 blur-[1px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32 md:py-40 w-full">
        {/* Label */}
        <div className="hero-fade-1">
          <span className="inline-block text-xs font-semibold tracking-[0.4em] text-teal border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 mb-8">
            PEOPLE IN PEOPLE
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-black leading-[1.05] mb-10 hero-fade-2">
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[86px] text-white tracking-tight">
            기획 첫날부터
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[86px] text-teal-light">
            입주 완료일까지.
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-[86px] text-white tracking-tight">
            끝까지 함께합니다.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-xl text-gray-400 leading-relaxed mb-14 max-w-2xl hero-fade-3">
          부산·경남·수도권 전역에서 쌓아온 <span className="text-white font-bold">압도적인 분양 실행력.</span>
          <br className="hidden md:block" />
          16개 단지 6,182세대의 기록 — 우리는 단순한 대행을 넘어 성공을 설계합니다.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 hero-fade-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-teal text-white font-black px-12 py-5 text-sm tracking-[0.2em] hover:bg-teal-dark hover:shadow-2xl hover:shadow-teal/20 transition-all duration-300 group"
          >
            사업지 검토 문의
            <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold px-12 py-5 text-sm tracking-[0.2em] hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            수행 실적 보기
          </a>
        </div>

        {/* Key Stats Bar */}
        <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-10 hero-fade-5">
          {[
            { num: '16', unit: '개 단지', label: 'TOTAL PROJECTS' },
            { num: '6,182', unit: '세대', label: 'UNITS SOLD' },
            { num: '12+', unit: '년 경력', label: 'YEARS ACTIVE' },
            { num: '60+', unit: '건', label: 'CONSULTING' },
          ].map((item) => (
            <div key={item.label} className="group">
              <div className="flex items-end gap-1.5 mb-2">
                <span className="text-3xl md:text-5xl font-black text-white leading-none group-hover:text-teal transition-colors">
                  {item.num}
                </span>
                <span className="text-xs md:text-sm font-bold text-teal pb-1">
                  {item.unit}
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-gray-500 uppercase">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-10 z-10 flex items-center gap-4 hero-fade-5">
        <div className="w-px h-16 bg-gradient-to-t from-teal to-transparent" />
        <span className="text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase rotate-180" style={{writingMode: 'vertical-rl'}}>Scroll to Explore</span>
      </div>
    </section>
  )
}
