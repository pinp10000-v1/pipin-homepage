'use client'

import { useEffect, useRef } from 'react'

const milestones = [
  { year: '2013', event: '㈜피플인피플 창사' },
  { year: '2015', event: '부산·경남 분양대행 시장 진출, 첫 단지 완판' },
  { year: '2018', event: 'GS건설·쌍용건설 공식 컨설팅 파트너 선정' },
  { year: '2020', event: '연제 SK VIEW CENTRAL 405세대 + 오피스텔 48실 완판·입주대행 100%' },
  { year: '2021', event: '김해 푸르지오 하이앤드 2차 1,380세대 초기 분양 완료' },
  { year: '2024', event: '수도권 사업 확장 — 광명 퍼스트스위첸·청라SK 지식산업센터 진행' },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal')
    if (!items) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>

        {/* Top Grid: CEO Message + Company Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* Left: Section Label + Tagline */}
          <div className="reveal">
            <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-4">
              OUR STORY
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight mb-8">
              고객의 중심에서<br />
              기대를 초월하는<br />
              기업
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              2013년 창업 이래, 피플인피플은 단 하나의 원칙으로 성장했습니다.
              <strong className="text-navy font-bold"> "고객이 기대하는 것 이상을 해낸다."</strong>
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              대형 건설사가 먼저 찾고, 초기 분양 미달 현장도 완판으로 이끈 조직력.
              부산·경남을 넘어 수도권까지 확장된 현장 실행력.
              우리는 숫자로 신뢰를 증명해왔습니다.
            </p>

            {/* CEO Quote Card */}
            <div className="mt-10 bg-navy p-8 relative">
              <span className="absolute top-6 left-8 text-6xl text-teal/20 font-serif leading-none">&ldquo;</span>
              <p className="text-white/90 text-base leading-relaxed relative z-10 pt-4">
                고객의 중심에서 고객의 기대를 초월하는 기업만이 성공할 수 있습니다.
                피플인피플은 그 원칙 하나로 12년을 걸어왔고, 앞으로도 변하지 않을 것입니다.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal flex items-center justify-center">
                  <span className="text-white font-black text-xs">CEO</span>
                </div>
                <div>
                  <p className="text-white font-black text-sm">김성룡</p>
                  <p className="text-white/40 text-xs tracking-widest">대표이사 — ㈜피플인피플</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Company Identity Cards */}
          <div className="reveal space-y-4" style={{ transitionDelay: '150ms' }}>
            {[
              {
                title: '전문성',
                icon: '◈',
                desc: '아파트·오피스텔·지식산업센터·상가 전 업종 분양 경험. 20년 이상 현장에서 축적한 데이터 기반 전략.'
              },
              {
                title: '신뢰성',
                icon: '◉',
                desc: '창사 이래 단 한 번도 현장을 미완료한 적 없습니다. GS건설·쌍용건설·한화건설·DL이앤씨가 선택한 파트너.'
              },
              {
                title: '지속성',
                icon: '◎',
                desc: '분양 완료 후에도 책임집니다. 분양팀과 입주관리팀이 동일하게 운영되어 고객과의 관계가 끝나지 않습니다.'
              },
            ].map((card, i) => (
              <div
                key={card.title}
                className="flex gap-6 p-7 border border-gray-100 hover:border-teal hover:shadow-md transition-all duration-300 group"
              >
                <span className="text-3xl text-teal group-hover:scale-110 transition-transform flex-shrink-0 mt-1">
                  {card.icon}
                </span>
                <div>
                  <h3 className="text-navy font-black text-lg mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="reveal border-t border-gray-100 pt-16">
          <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-10">
            COMPANY HISTORY
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="reveal group p-6 bg-surface hover:bg-navy transition-colors duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-3xl font-black text-teal group-hover:text-teal/80 leading-none block mb-3">
                  {m.year}
                </span>
                <p className="text-sm text-gray-600 group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                  {m.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
