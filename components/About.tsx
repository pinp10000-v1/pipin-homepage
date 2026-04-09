'use client'

import Image from 'next/image'
import { useReveal } from '@/hooks/useReveal'

const milestones = [
  { year: '2013', event: '㈜피플인피플 창사', img: '/image/milestone_2013.png' },
  { year: '2015', event: '부산·경남 분양대행 시장 진출, 첫 단지 완판', img: null },
  { year: '2018', event: 'GS건설·쌍용건설 공식 컨설팅 파트너 선정', img: null },
  { year: '2020', event: '연제 SK VIEW CENTRAL 405세대 + 오피스텔 48실 완판·입주대행 100%', img: null },
  { year: '2021', event: '김해 푸르지오 하이앤드 2차 1,380세대 초기 분양 완료', img: null },
  { year: '2024', event: '수도권 사업 확장 — 광명 퍼스트스위첸·청라SK 지식산업센터 진행', img: null },
  { year: '2026', event: '청라 SK V1 지식산업센터 분양중', img: '/image/milestone_2026.png', upcoming: true },
]

const identityCards = [
  {
    title: '전문성',
    img: '/image/about_expertise.png',
    desc: '아파트·오피스텔·지식산업센터·상가 전 업종 분양 경험. ',
    boldDesc: '20년 이상 현장에서 축적한 데이터 기반 전략.',
  },
  {
    title: '신뢰성',
    img: '/image/about_trust.png',
    desc: '창사 이래 단 한 번도 현장을 미완료한 적 없습니다. ',
    boldDesc: 'SK에코플랜트·대우건설·GS건설·쌍용건설·한화건설·DL이앤씨가 선택한 파트너.',
  },
  {
    title: '지속성',
    img: '/image/about_continuity.png',
    desc: '분양 완료 후에도 책임집니다. ',
    boldDesc: '분양팀과 입주관리팀이 동일하게 운영되어 고객과의 관계가 끝나지 않습니다.',
  },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>

        {/* Top Grid: CEO Message + Company Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 items-end">

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
              <strong className="text-orange-500 font-bold text-lg"> &ldquo;고객이 기대하는 것 이상을 해낸다.&rdquo;</strong>
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              대형 건설사가 먼저 찾고, 초기 분양 미달 현장도 완판으로 이끈 조직력.
              부산·경남을 넘어 수도권까지 확장된 현장 실행력.
              우리는 숫자로 신뢰를 증명해왔습니다.
            </p>

            {/* 누적 실적 통계 */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <p className="text-4xl md:text-5xl font-black text-teal leading-none mb-2">16</p>
                <p className="text-xs font-semibold text-gray-600 tracking-widest">단지</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-teal leading-none mb-2">6,182</p>
                <p className="text-xs font-semibold text-gray-600 tracking-widest">세대</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-teal leading-none mb-2">60+</p>
                <p className="text-xs font-semibold text-gray-600 tracking-widest">컨설팅</p>
              </div>
            </div>

            {/* CEO Quote Card */}
            <div className="mt-10 border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 items-stretch">
                {/* CEO Photo */}
                <div className="relative h-80 sm:h-auto overflow-hidden bg-navy">
                  <Image
                    src="/image/ceo_photo.jpg"
                    alt="CEO 김성룡"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CEO Quote */}
                <div className="bg-navy p-8 relative flex flex-col justify-between">
                  <div>
                    <span className="absolute top-6 left-8 text-6xl text-teal/20 font-serif leading-none">&ldquo;</span>
                    <p className="text-white/90 text-base leading-relaxed relative z-10 pt-4">
                      고객의 중심에서 고객의 기대를 초월하는 기업만이 성공할 수 있습니다.
                      피플인피플은 그 원칙 하나로 12년을 걸어왔고, 앞으로도 변하지 않을 것입니다.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-3">
                    <div>
                      <p className="text-white font-black text-sm">김성룡</p>
                      <p className="text-white/40 text-xs tracking-widest">대표이사 — ㈜피플인피플</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Company Identity Cards with Images */}
          <div className="reveal space-y-4" style={{ transitionDelay: '150ms' }}>
            {identityCards.map((card, i) => (
              <div
                key={card.title}
                className="border border-gray-100 hover:border-teal hover:shadow-md transition-all duration-300 group overflow-hidden"
              >
                {/* Card Image */}
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 text-white font-black text-xl z-10 drop-shadow">
                    {card.title}
                  </h3>
                </div>
                {/* Card Content */}
                <div className="p-6">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {card.desc}
                    <strong className="text-gray-600 font-bold">{card.boldDesc}</strong>
                  </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="reveal group overflow-hidden bg-surface hover:bg-navy transition-colors duration-300 relative"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Milestone Image */}
                {m.img ? (
                  <div className="relative h-24 w-full overflow-hidden">
                    <Image
                      src={m.img}
                      alt={`${m.year} milestone`}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-navy/40" />
                  </div>
                ) : (
                  <div className="h-24 w-full bg-gradient-to-br from-navy/10 to-teal/10 group-hover:from-teal/20 group-hover:to-navy/30 transition-colors duration-300" />
                )}
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl font-black text-teal group-hover:text-teal/80 leading-none">
                      {m.year}
                    </span>
                    {m.upcoming && (
                      <span className="text-[9px] font-black text-orange-400 bg-orange-400/15 px-2 py-0.5 tracking-widest uppercase">
                        준비중
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
