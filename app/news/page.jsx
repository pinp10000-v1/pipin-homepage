// /app/news/page.jsx — 뉴스 목록 페이지
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

// 서버사이드 기사 목록 조회
async function getArticles(category) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    let query = supabase
      .from('articles')
      .select('id, title, summary, slug, published_at, category, image_url')
      .order('published_at', { ascending: false })
      .limit(30)

    if (category) query = query.eq('category', category)

    const { data } = await query
    return data ?? []
  } catch {
    return []
  }
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

const categoryColors = {
  '국내부동산': 'bg-blue-50 text-blue-700 border-blue-200',
  '경제동향':   'bg-indigo-50 text-indigo-700 border-indigo-200',
  '분양시장':   'bg-teal/10 text-teal border-teal/30',
  '정책분석':   'bg-slate-100 text-slate-700 border-slate-200',
  '시장분석':   'bg-navy/5 text-navy border-navy/20',
  '상업용부동산':'bg-orange-50 text-orange-700 border-orange-200',
}

function getCategoryClass(category) {
  return categoryColors[category] ?? 'bg-gray-100 text-gray-700 border-gray-200'
}

const CATEGORIES = ['국내부동산', '경제동향', '분양시장', '정책분석', '시장분석', '상업용부동산']

export default async function NewsPage({ searchParams }) {
  const category = searchParams?.category ?? ''
  const articles = await getArticles(category)

  return (
    <div className="min-h-screen bg-surface">
      {/* 상단 네비게이션 */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-navy font-black text-lg tracking-tight">
            <span className="text-teal">P</span>IP-BIZ
          </Link>
          <Link
            href="/#news"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            홈으로
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 헤더 */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-teal uppercase mb-3">MARKET INSIGHT</p>
          <h1 className="text-3xl md:text-4xl font-black text-navy mb-3">
            부동산 뉴스 & 경제동향
          </h1>
          <p className="text-gray-500 text-sm">피플인피플 리서치팀이 선별한 최신 마켓 인사이트</p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <Link
            href="/news"
            className={`px-4 py-2 text-sm font-bold tracking-wide transition border rounded-full ${
              !category
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
            }`}
          >
            전체
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/news?category=${cat}`}
              className={`px-4 py-2 text-sm font-bold tracking-wide transition border rounded-full ${
                category === cat
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* 기사 목록 */}
        {articles.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium mb-2">기사가 없습니다</p>
            <p className="text-sm">곧 새로운 콘텐츠가 업데이트됩니다</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex gap-0"
              >
                {/* 썸네일 */}
                {article.image_url ? (
                  <div className="relative w-44 h-32 flex-shrink-0">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-44 h-32 flex-shrink-0 bg-gradient-to-br from-navy/80 to-teal/60 flex items-center justify-center">
                    <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase">{article.category}</span>
                  </div>
                )}

                {/* 내용 */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 border rounded-full ${getCategoryClass(article.category)}`}>
                        {article.category}
                      </span>
                      <time className="text-xs text-gray-400">{formatDate(article.published_at)}</time>
                    </div>
                    <h2 className="text-base font-black text-navy group-hover:text-teal transition-colors leading-snug line-clamp-2 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-teal text-[10px] font-black tracking-widest uppercase">
                    <span className="w-6 h-px bg-teal" />
                    자세히 보기
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: '부동산 뉴스 & 경제동향 | 피플인피플 마켓 인사이트',
  description: '피플인피플 리서치팀이 선별한 부동산 시장 뉴스와 경제동향을 만나보세요.',
}
