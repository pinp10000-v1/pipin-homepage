'use client'

import { useEffect, useRef } from 'react'

const solutions = [
  {
    num: '01',
    problem: '초기 분양 미달로 브랜드가 흔들린다',
    answer:
      '창사 이래 초기 분양 실패 현장에도 진입하여 지역 특화 조직 분양 시스템으로 재분양 완판 사례 보유. "반드시 한다"는 원칙 아래, 완료 전까지 현장을 떠나지 않습니다.',
    highlight: '반드시 한다',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: '02',
    problem: '시장을 모른 채 상품을 기획한다',
    answer:
      'GS건설·쌍용건설·한화건설 등 대형 건설사에 60건 이상의 컨설팅 수행. 빅데이터 기반 수요 예측으로 분양가·상품 구성·타겟 고객층을 숫자로 먼저 검증합니다.',
    highlight: '60건 이상',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    num: '03',
    problem: '분양 후 입주율 관리에 공백이 생긴다',
    answer:
      '분양대행팀과 입주관리팀이 동일하게 운영됩니다. 연제 SK VIEW CENTRAL 405세대 입주 100% 완료. 잔금 처리까지 동일 담당자가 책임집니다.',
    highlight: '입주 100%',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
]

export default function Solution() {
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
    <section id="solution" className="bg-navy-900 py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-teal/5 -skew-x-12 translate-x-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10" ref={ref}>
        {/* Header */}
        <div className="reveal mb-16 md:mb-24">
          <p className="text-xs font-semibold tracking-[0.25em] text-teal-light uppercase mb-4">
            WHY PEOPLE IN PEOPLE
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            현장에서 반복되는<br />
            <span className="text-teal">3가지 고질적 문제</span>에 대한 해답
          </h2>
        </div>

        {/* Solution Items */}
        <div className="grid grid-cols-1 gap-12">
          {solutions.map((s, i) => (
            <div
              key={s.num}
              className="reveal flex flex-col md:flex-row items-stretch gap-0 bg-white/5 border border-white/10 hover:border-teal/50 transition-all duration-500 group"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Problem Side */}
              <div className="md:w-1/3 p-8 lg:p-12 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{s.icon}</span>
                    <span className="text-sm font-bold text-teal-light tracking-[0.2em]">CASE {s.num}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">
                    {s.problem}
                  </h3>
                </div>
                <div className="mt-8">
                  <span className="text-xs font-semibold text-rose-400 bg-rose-400/10 px-3 py-1 rounded-full px-2">Critical Pain Point</span>
                </div>
              </div>

              {/* Solution Side */}
              <div className="md:w-2/3 p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-black text-white">{s.num}</span>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-1 bg-teal mb-8 group-hover:w-20 transition-all duration-500" />
                  <p className="text-base lg:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">
                    {s.answer}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-teal-light font-black text-sm tracking-widest uppercase">Solution:</span>
                    <span className="text-white font-bold border-b-2 border-teal pb-0.5">
                      {s.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card removed as per user request */}
      </div>
    </section>
  )
}
