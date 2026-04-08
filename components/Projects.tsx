'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const projects = [
  {
    year: '2021',
    region: '경남 김해시 안동',
    name: '김해 푸르지오 하이앤드 2차',
    contractor: 'GS건설',
    tag: '아파트',
    stats: [
      { num: '1,380', label: '세대' },
      { num: '100%', label: '초기 분양 완료' },
    ],
    desc: '부·울·경 단일 분양 현장 최대 규모급. 투자 수요와 실거주 수요를 분리 타겟팅하여 세대별·평형별 DB를 먼저 구축 후 현장을 열었습니다. 초기 분양 기간 내 1,380세대 전량 계약 완료.',
    quote: '"세대 수가 많을수록 분양 전략의 정밀도가 핵심입니다."',
  },
  {
    year: '2020',
    region: '부산시 연제구 연산동',
    name: '연제 SK VIEW CENTRAL',
    contractor: 'SK에코플랜트',
    tag: '아파트 + 오피스텔',
    stats: [
      { num: '405', label: '세대 + 오피스텔 48실' },
      { num: '100%', label: '입주대행 완료' },
    ],
    desc: 'SK 브랜드 아파트 + 오피스텔 복합 단지. 두 상품군의 수요층을 분리하여 채널별 전략 운영. 분양 완료 후 입주대행까지 동일 팀이 직접 수행, 100% 입주 완료.',
    quote: '"입주 완료일까지 같은 팀이 책임집니다."',
  },
]

const portfolioProjects = [
  // 2013-2017
  { name: '대구 오페라 삼정 그린코아', region: '기타', image: '/image/portfolio_01.png', year: '2013' },
  { name: '창원 MK타워', region: '부산·경남', image: '/image/portfolio_02.png', year: '2014' },
  { name: '부산 삼정 사직역 그린코아 2차', region: '부산·경남', image: '/image/portfolio_03.png', year: '2015' },
  { name: '부산 개금 대상 웰리움', region: '부산·경남', image: '/image/portfolio_04.png', year: '2016' },
  { name: '혜도인 파크에비뉴 서면', region: '부산·경남', image: '/image/portfolio_05.png', year: '2017' },

  // 2017-2019
  { name: '광안지웰에스테이트 더테라스', region: '부산·경남', image: '/image/portfolio_06.png', year: '2017' },
  { name: '거제 장승포 마이투스', region: '부산·경남', image: '/image/portfolio_07.png', year: '2017' },
  { name: '센텀 천일스카이원', region: '부산·경남', image: '/image/portfolio_08.png', year: '2018' },
  { name: '울산 혁신비즈니스센터', region: '부산·경남', image: '/image/portfolio_09.png', year: '2019' },
  { name: '송도 베스트웨스턴 플러스', region: '부산·경남', image: '/image/portfolio_10.png', year: '2019' },

  // 2019-2021
  { name: '광안지웰에스테이트 (분양/입주)', region: '부산·경남', image: '/image/portfolio_11.png', year: '2019' },
  { name: '김해 푸르지오 하이앤드 2차', region: '부산·경남', image: '/image/portfolio_12.png', year: '2021' },
  { name: '연제 SK VIEW CENTRAL', region: '부산·경남', image: '/image/portfolio_13.png', year: '2020' },

  // 2022-2025 (최신)
  { name: '광명 퍼스트스위첸', region: '수도권', image: '/image/portfolio_14.png', year: '2024' },
  { name: '청라 SK V1 지식산업센터', region: '수도권', image: '/image/portfolio_15.png', year: '2025' },
  { name: '내동 테라스파크 (분양/입주)', region: '부산·경남', image: '/image/portfolio_16.png', year: '2017' },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  useEffect(() => {
    const cards = ref.current?.querySelectorAll('.reveal')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const nextSlide = () => {
    if (currentIndex < portfolioProjects.length - itemsPerPage) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <section id="projects" className="bg-navy py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <div className="reveal mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-4">
              SUCCESS STORIES
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              성공 프로젝트
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-xs leading-relaxed">
            <span className="block border border-orange-400 text-orange-400 px-4 py-3 rounded-none font-semibold">
              창사 이래 16개 단지, 6,182세대.
              <br />모든 현장에서 숫자로 증명했습니다.
            </span>
          </p>
        </div>

        {/* Featured Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className="reveal bg-white/5 border border-white/10 p-8 md:p-10 hover:bg-white/10 hover:border-teal/40 transition-all duration-400 group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Top meta */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-teal text-white text-xs font-bold px-3 py-1 tracking-widest">
                    {project.year}
                  </span>
                  <span className="text-white/40 text-sm">{project.region}</span>
                </div>
                <span className="text-xs font-semibold text-navy bg-teal/90 px-3 py-1">
                  {project.tag}
                </span>
              </div>

              <p className="text-xs font-semibold tracking-widest text-white/30 uppercase mb-2">
                {project.contractor}
              </p>
              <h3 className="text-xl md:text-2xl font-black text-white mb-6 leading-tight group-hover:text-teal transition-colors duration-300">
                {project.name}
              </h3>

              {/* Stats */}
              <div className="flex gap-8 mb-6 pb-6 border-b border-white/10">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-black text-teal leading-none mb-1">
                      {stat.num}
                    </p>
                    <p className="text-xs text-white/40 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-white/65 leading-relaxed mb-5">{project.desc}</p>
              <p className="text-sm text-teal italic font-medium">{project.quote}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Carousel */}
        <div className="reveal border border-white/10 p-8 md:p-10 bg-white/3">
          <div className="flex items-center justify-between mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">
              전체 수행 현장
            </p>
            {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-teal hover:bg-teal/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= portfolioProjects.length - itemsPerPage}
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:border-teal hover:bg-teal/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Items */}
          <div className="overflow-hidden -mx-8 px-8">
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                gridTemplateColumns: `repeat(${portfolioProjects.length}, minmax(calc(100% / ${itemsPerPage}), 1fr))`,
              }}
            >
              {portfolioProjects.map((project, idx) => (
                <div key={project.name} className="flex-shrink-0">
                  <div
                    className="mb-4 overflow-hidden group"
                    style={{
                      height: '192px',
                      width: '100%',
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: [
                        '#1e3a5f','#2d5a8c','#3d7aad','#1a4f6e',
                        '#0d3b5e','#1f5f8f','#003d5c','#00527d',
                        '#006b9e','#0088bf','#1e3a5f','#2d5a8c',
                        '#3d7aad','#1a4f6e','#0d3b5e','#1f5f8f',
                      ][idx % 16],
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <p className="text-xs font-semibold text-teal/70 tracking-widest uppercase mb-1">
                    {project.region}
                  </p>
                  <p className="text-sm font-bold text-white leading-tight hover:text-teal transition-colors cursor-default">
                    {project.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
