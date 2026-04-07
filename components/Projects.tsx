'use client'

import { useEffect, useRef } from 'react'

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

const portfolioGroups = [
  {
    label: '부산·경남',
    items: [
      '광안지웰에스테이트 더테라스',
      '연제 SK VIEW CENTRAL',
      '센텀 천일스카이원',
      '혜도인 파크에비뉴 서면',
      '삼정 사직역 그린코아',
      '울산 혁신비즈니스센터',
      '송도 베스트웨스턴 플러스',
    ],
  },
  {
    label: '수도권',
    items: [
      '광명 퍼스트스위첸',
      '청라 SK V1 지식산업센터',
    ],
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)

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
            창사 이래 16개 단지, 6,182세대.
            <br />모든 현장에서 숫자로 증명했습니다.
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

        {/* Portfolio Breakdown */}
        <div className="reveal border border-white/10 p-8 md:p-10 bg-white/3">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-8">
            전체 수행 현장 — 16개 단지
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioGroups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-teal tracking-widest uppercase mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-white/50 bg-white/5 border border-white/10 px-4 py-2 hover:text-white hover:border-teal/50 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
