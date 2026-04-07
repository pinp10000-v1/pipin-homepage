'use client'

import { useEffect, useRef, useState } from 'react'

interface NewsItem {
  id: number
  category: string
  title: string
  summary: string
  date: string
  link: string
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    category: '국내부동산',
    title: '서울 아파트값 5주 연속 상승세... 신축 위주 강세',
    summary: '서울 주요 지역 신축 아파트 단지를 중심으로 매수세가 유입되며 가격 상승폭이 확대되고 있습니다.',
    date: '2025.04.01',
    link: '#',
  },
  {
    id: 2,
    category: '경제동향',
    title: '금리 동결 가능성 확대... 부동산 시장 숨고르기',
    summary: '미국 연준(Fed)의 금리 정책 기조 변화에 따라 국내 금리 동결 가능성이 커지며 시장 관망세가 확산되고 있습니다.',
    date: '2025.03.31',
    link: '#',
  },
  {
    id: 3,
    category: '분양시장',
    title: '청라·송도 지식산업센터 수요 급증... 기업 이전 활발',
    summary: '친환경 인프라와 교통망이 우수한 인천 송도 및 청라 지역 지식산업센터에 대한 기업들의 문의가 쏟아지고 있습니다.',
    date: '2025.03.30',
    link: '#',
  },
  {
    id: 4,
    category: '정책분석',
    title: '재건축 규제 완화 소급 적용 여부... 시장 이슈',
    summary: '정부의 재건축 활성화 대책 발표 이후 세부 실행 지침에 따른 수혜 단지 분석이 활발하게 진행 중입니다.',
    date: '2025.03.29',
    link: '#',
  },
  {
    id: 5,
    category: '시장분석',
    title: '전국 아파트 거래량 전월 대비 12% 증가',
    summary: '부동산 규제 완화 기조와 봄 이사철 수요가 맞물리며 전국 아파트 거래량이 완만한 회복세를 보이고 있습니다.',
    date: '2025.03.28',
    link: '#',
  },
  {
    id: 6,
    category: '상업용부동산',
    title: '도심 오피스 공실률 역대 최저 기록... 임대료 상승세',
    summary: '주요 도심권(CBD, GBD) 오피스 시장의 견고한 수요로 인해 안정적인 수익율이 기대되고 있습니다.',
    date: '2025.03.27',
    link: '#',
  },
]

export default function NewsInsight() {
  const [news, setNews] = useState<NewsItem[]>(mockNews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    
    const handleResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)

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
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    )
    items.forEach((item) => observer.observe(item))
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const nextSlide = () => {
    if (currentIndex < news.length - visibleCount) {
      setCurrentIndex((prev: number) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev: number) => prev - 1)
    }
  }

  return (
    <section id="news" className="bg-surface py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <div className="reveal mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-4">
              MARKET INSIGHT
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-navy leading-tight">
              부동산 뉴스 &<br />경제동향 매거진
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <p className="text-gray-400 text-sm font-medium">실시간 마켓 피드</p>
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= news.length - visibleCount}
                className={`w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* News Card Slider */}
        <div className="relative overflow-hidden -mx-4 px-4 py-8">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              paddingLeft: currentIndex > 0 ? '0' : '0'
            }}
          >
            {news.map((item, i) => (
              <div
                key={item.id}
                className={`reveal block group flex-shrink-0 bg-white p-10 shadow-lg border border-gray-100 transition-all duration-300 relative overflow-hidden ${
                  visibleCount === 1 ? 'w-full' : 'w-[calc(33.333%-1rem)]'
                }`}
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-navy/5 -mr-8 -mt-8 rotate-45" />
                
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold text-teal tracking-[0.2em] uppercase border-b-2 border-teal/20 pb-0.5">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-300 font-medium tracking-widest">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-black text-navy mb-6 group-hover:text-teal transition-colors leading-tight h-14 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed mb-10 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center gap-3 text-gray-300 font-black text-[10px] tracking-widest uppercase mt-auto">
                  <span className="w-8 h-px bg-gray-200" />
                  COMING SOON
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="reveal mt-16 text-center">
          <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold opacity-30">
            * Selected Insights by People in People Research Team
          </p>
        </div>
      </div>
    </section>
  )
}

