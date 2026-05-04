// /app/news/[slug]/page.jsx — 뉴스 상세 (블로그 본문) 페이지
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

// Supabase 서버사이드 조회 (SSR)
async function getArticle(slug) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  } catch {
    return null
  }
}

// 관련 기사 조회
async function getRelatedArticles(category, currentSlug) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    const { data } = await supabase
      .from('articles')
      .select('id, title, summary, slug, published_at, category')
      .eq('category', category)
      .neq('slug', currentSlug)
      .order('published_at', { ascending: false })
      .limit(3)
    return data ?? []
  } catch {
    return []
  }
}

// 날짜 포맷
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 카테고리 배지 색상
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

export default async function NewsDetailPage({ params }) {
  const { slug } = await params
  const article = await getArticle(slug)

  // Supabase에 없으면 404
  if (!article) notFound()

  const related = await getRelatedArticles(article.category, slug)

  return (
    <>
      {/* JSON-LD 구조화 데이터 (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            image: article.image_url,
            datePublished: article.published_at,
            description: article.summary,
            author: { '@type': 'Organization', name: '피플인피플' },
            publisher: {
              '@type': 'Organization',
              name: '피플인피플',
              url: 'https://www.pip-biz.com',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-surface">
        {/* 상단 네비게이션 바 */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
              뉴스 목록
            </Link>
          </div>
        </div>

        {/* 본문 */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* 헤더 영역 */}
          <header className="mb-10">
            {/* 카테고리 + 날짜 */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[11px] font-bold tracking-[0.2em] uppercase px-3 py-1 border rounded-full ${getCategoryClass(article.category)}`}>
                {article.category}
              </span>
              <time className="text-sm text-gray-400 font-medium">
                {formatDate(article.published_at)}
              </time>
              {article.source && (
                <span className="text-sm text-gray-400">출처: {article.source}</span>
              )}
            </div>

            {/* 제목 */}
            <h1 className="text-3xl md:text-4xl font-black text-navy leading-tight mb-6">
              {article.title}
            </h1>

            {/* 요약 (리드문) */}
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-teal pl-5 bg-white py-4 pr-4 rounded-r-lg shadow-sm">
              {article.summary}
            </p>
          </header>

          {/* 썸네일 이미지 */}
          {article.image_url && (
            <div className="relative w-full h-72 md:h-96 mb-10 overflow-hidden rounded-lg shadow-md">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* 본문 콘텐츠 */}
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-10">
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
              {article.content ?? (
                <p className="text-gray-400 italic">본문을 준비 중입니다.</p>
              )}
            </div>
          </div>

          {/* 키워드 태그 */}
          {article.keywords && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
              <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">키워드</p>
              <div className="flex flex-wrap gap-2">
                {article.keywords.split(',').map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-navy/5 text-navy text-sm rounded-full font-medium"
                  >
                    #{kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 원문 링크 (있을 경우만) */}
          {article.original_url && (
            <div className="bg-teal/5 border border-teal/20 rounded-lg p-5 mb-10 flex items-start gap-3">
              <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <div>
                <p className="text-xs font-bold text-teal tracking-widest uppercase mb-1">원문 기사</p>
                <a
                  href={article.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-navy transition-colors break-all underline underline-offset-2"
                >
                  {article.original_url}
                </a>
              </div>
            </div>
          )}

          {/* 관련 기사 */}
          {related.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-5">관련 기사</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/news/${r.slug}`}
                    className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow group"
                  >
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border rounded-full ${getCategoryClass(r.category)}`}>
                      {r.category}
                    </span>
                    <h3 className="mt-3 text-sm font-black text-navy leading-snug line-clamp-2 group-hover:text-teal transition-colors">
                      {r.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400">{formatDate(r.published_at)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 뒤로가기 */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/#news"
              className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-teal transition-colors tracking-wide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              뉴스 목록으로
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}

// 404 페이지 메타데이터
export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: '기사를 찾을 수 없습니다 | 피플인피플' }

  return {
    title: `${article.title} | 피플인피플 마켓 인사이트`,
    description: article.meta_description ?? article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}
