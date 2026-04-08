'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    num: '01',
    title: '부동산 분양대행',
    subtitle: 'Sales Agency',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    desc: '사업지 분석부터 조직 운영, 사후 관리까지 전 과정을 책임집니다. 초기 분양 미달 현장도 완판으로 이끄는 현장 실행력을 보유하고 있습니다.',
    items: [
      '아파트 · 오피스텔 · 지식산업센터 전 상품군',
      '창사 이래 16개 단지 6,182세대 분양 완료',
      '초기 미달 현장 재분양 특화 조직 보유',
    ],
    highlight: '16개 단지 완판',
  },
  {
    num: '02',
    title: '개발 컨설팅 및 수지분석',
    subtitle: 'Development Consulting',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    desc: 'GS건설, 쌍용건설 등 대형 건설사의 파트너로서 분양가 산정, 상품 기획, 시장성 검토 등 정밀한 데이터를 제공합니다.',
    items: [
      '사업성 수지 분석 및 리스크 진단',
      'MD 구성 및 기획 전략 수립',
      '60건 이상의 풍부한 컨설팅 실적',
    ],
    highlight: '60건+ 수행 실적',
  },
  {
    num: '03',
    title: '입주관리 및 사후관리',
    subtitle: 'Post-Sales Management',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    desc: '분양 완료가 끝이 아닙니다. 잔금 처리 및 법무 지원까지 책임지는 동일 담당자 시스템으로 분쟁 없는 100% 입주를 보장합니다.',
    items: [
      '입주 지원 센터 및 민원 처리 솔루션',
      '잔금 관리 및 소유권 이전 법무 지원',
      '연제 SK VIEW CENTRAL 입주 100% 완료',
    ],
    highlight: '입주율 100% 달성',
  },
]

export default function Services() {
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
    <section id="services" className="bg-surface bg-grid py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <div className="reveal mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-4">
              WHAT WE DO
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">
              우리가 하는 일
            </h2>
          </div>
          <p className="text-gray-500 text-sm md:text-base max-w-xs leading-relaxed">
            <span className="block border border-orange-400 text-orange-400 px-4 py-3 rounded-none font-semibold">
              분양 기획부터 입주 관리까지.
              <br />사업의 전 단계를 책임집니다.
            </span>
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.num}
              className="reveal group bg-white border border-gray-100 p-8 md:p-9 hover:border-teal hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Icon + Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl">{service.icon}</span>
                <span className="text-6xl font-black text-gray-100 group-hover:text-teal/15 transition-colors leading-none select-none">
                  {service.num}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-navy mb-1">
                {service.title}
              </h3>
              <p className="text-xs font-semibold tracking-widest text-teal uppercase mb-5">
                {service.subtitle}
              </p>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-teal mb-6 group-hover:w-16 transition-all duration-300" />

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {service.desc}
              </p>

              {/* List */}
              <ul className="space-y-3 mb-8">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Achievement Badge */}
              <div className="pt-5 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-teal">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  핵심 성과: {service.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
