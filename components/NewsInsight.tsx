'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useReveal } from '@/hooks/useReveal'

interface NewsItem {
  id: number
  category: string
  title: string
  summary: string
  published_at: string
  original_url: string | null
  image_url: string | null
  slug: string
}

// Supabase 미연결 시 폴백용 목데이터
const mockNews: NewsItem[] = [
  {
    id: 1,
    category: '국내부동산',
    title: '서울 아파트값 5주 연속 상승세... 신축 위주 강세',
    summary: '서울 주요 지역 신축 아파트 단지를 중심으로 매수세가 유입되며 가격 상승폭이 확대되고 있습니다.',
    published_at: '2025-04-01T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'seoul-apt-price-rise',
  },
  {
    id: 2,
    category: '경제동향',
    title: '금리 동결 가능성 확대... 부동산 시장 숨고르기',
    summary: '미국 연준(Fed)의 금리 정책 기조 변화에 따라 국내 금리 동결 가능성이 커지며 시장 관망세가 확산되고 있습니다.',
    published_at: '2025-03-31T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'interest-rate-freeze',
  },
  {
    id: 3,
    category: '분양시장',
    title: '청라·송도 지식산업센터 수요 급증... 기업 이전 활발',
    summary: '친환경 인프라와 교통망이 우수한 인천 송도 및 청라 지역 지식산업센터에 대한 기업들의 문의가 쏟아지고 있습니다.',
    published_at: '2025-03-30T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'cheongna-songdo-demand',
  },
  {
    id: 4,
    category: '정책분석',
    title: '재건축 규제 완화 소급 적용 여부... 시장 이슈',
    summary: '정부의 재건축 활성화 대책 발표 이후 세부 실행 지침에 따른 수혜 단지 분석이 활발하게 진행 중입니다.',
    published_at: '2025-03-29T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'rebuild-deregulation',
  },
  {
    id: 5,
    category: '시장분석',
    title: '전국 아파트 거래량 전월 대비 12% 증가',
    summary: '부동산 규제 완화 기조와 봄 이사철 수요가 맞물리며 전국 아파트 거래량이 완만한 회복세를 보이고 있습니다.',
    published_at: '2025-03-28T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'apt-transaction-increase',
  },
  {
    id: 6,
    category: '상업용부동산',
    title: '도심 오피스 공실률 역대 최저 기록... 임대료 상승세',
    summary: '주요 도심권(CBD, GBD) 오피스 시장의 견고한 수요로 인해 안정적인 수익율이 기대되고 있습니다.',
    published_at: '2025-03-27T00:00:00Z',
    original_url: null,
    image_url: null,
    slug: 'office-vacancy-low',
  },
]

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

const categoryGradients: Record<string, string> = {
  '국내부동산': 'from-blue-900/80 to-teal/60',
  '경제동향': 'from-navy/80 to-indigo-700/60',
  '분양시장': 'from-teal/80 to-emerald-700/60',
  '정책분석': 'from-slate-800/80 to-teal/60',
  '시장분석': 'from-navy/80 to-teal/60',
  '상업용부동산': 'from-orange-900/60 to-navy/80',
}

function getCategoryGradient(category: string): string {
  return categoryGradients[category] ?? 'from-navy/80 to-teal/60'
}

export default function NewsInsight() {
  const [news, setNews] = useState<NewsItem[]>(mockNews)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isLive, setIsLive] = useState(false)
  const ref = useReveal()

  useEffect(() => {
    const handleResize = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetch('/api/articles?limit=9')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setNews(json.data)
          setIsLive(true)
        }
      })
      .catch(() => {
        // 실패 시 mockNews 유지
      })
  }, [])

  const nextSlide = () => {
    if (currentIndex < news.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
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
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-teal animate-pulse' : 'bg-gray-300'}`} />
              <p className="text-gray-400 text-sm font-medium">
                {isLive ? '실시간 마켓 피드' : '마켓 피드'}
              </p>
            </div>
            {/* 화살표 */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="이전 뉴스"
                className="w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= news.length - visibleCount}
                aria-label="다음 뉴스"
                className="w-12 h-12 flex items-center justify-center border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all disabled:opacity-10 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 뉴스 카드 슬라이더 */}
        <div className="relative overflow-hidden -mx-4 px-4 py-8">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
          >
            {news.map((item) => {
              const gradient = getCategoryGradient(item.category)

              return (
                // 카드 전체를 /news/[slug] 내부 블로그 페이지로 연결
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className={`reveal block group flex-shrink-0 bg-white shadow-lg border border-gray-100 transition-all duration-300 relative overflow-hidden flex flex-col cursor-pointer hover:shadow-xl ${
                    visibleCount === 1 ? 'w-full' : 'w-[calc(33.333%-1rem)]'
                  }`}
                >
                  {/* 카드 이미지 */}
                  <div
                    className={`h-48 w-full overflow-hidden bg-gradient-to-br ${gradient} group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center relative`}
                    style={{ minHeight: '192px' }}
                  >
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full" style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)'
                          }} />
                        </div>
                        <span className="text-white/30 text-xs font-bold tracking-widest uppercase z-10">{item.category}</span>
                      </>
                    )}
                  </div>

                  {/* 배경 장식 */}
                  <div className="absolute top-48 right-0 w-16 h-16 bg-navy/5 -mr-8 -mt-8 rotate-45" aria-hidden="true" />

                  {/* 카드 본문 */}
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold text-teal tracking-[0.2em] uppercase border-b-2 border-teal/20 pb-0.5">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-gray-300 font-medium tracking-widest">
                        {formatDate(item.published_at)}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-navy mb-4 group-hover:text-teal transition-colors leading-tight h-14 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-3 flex-grow">
                      {item.summary}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <span className="flex items-center gap-3 text-teal font-black text-[10px] tracking-widest uppercase group-hover:gap-5 transition-all">
                        <span className="w-8 h-px bg-teal" />
                        자세히 보기
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className="reveal mt-16 text-center">
          <p className="text-gray-400 text-[10px] tracking-widest uppercase font-bold opacity-30">
            * Selected Insights by People in People Research Team
          </p>
        </div>
      </div>
    </section>
  )
}
