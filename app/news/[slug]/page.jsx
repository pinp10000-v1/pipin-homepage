// /app/news/[slug]/page.jsx - 뉴스 상세 페이지
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/articles/${slug}`)
      const result = await response.json()

      if (result.success) {
        setArticle(result.data)

        // 메타 태그 업데이트 (SEO)
        if (typeof document !== 'undefined') {
          document.title = result.data.title + ' - Pip-Biz'
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            metaDescription.setAttribute('content', result.data.meta_description)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch article:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">기사를 찾을 수 없습니다.</p>
          <Link href="/news" className="text-blue-600 hover:text-blue-700">
            뉴스 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* 썸네일 이미지 */}
        {article.image_url && (
          <div className="relative w-full h-96">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* 본문 */}
        <div className="p-8 md:p-12">
          {/* 메타 정보 */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                {article.category}
              </span>
              <time className="text-sm text-gray-500">
                {new Date(article.published_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {article.source && (
                <span className="text-sm text-gray-500">출처: {article.source}</span>
              )}
            </div>

            {/* 제목 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* 요약 */}
            <p className="text-lg text-gray-600">
              {article.summary}
            </p>
          </div>

          {/* 본문 콘텐츠 */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="whitespace-pre-wrap text-gray-800">
              {article.content}
            </div>
          </div>

          {/* 키워드 */}
          {article.keywords && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-2">주요 키워드</p>
              <div className="flex gap-2 flex-wrap">
                {article.keywords.split(',').map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
                  >
                    #{keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 원본 기사 링크 */}
          {article.original_url && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-2">원본 기사</p>
              <a
                href={article.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium break-all"
              >
                {article.original_url}
              </a>
            </div>
          )}

          {/* 뉴스 목록으로 돌아가기 */}
          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/news"
              className="inline-block text-blue-600 hover:text-blue-700 font-medium transition"
            >
              ← 뉴스 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </article>

      {/* SEO 구조화 데이터 */}
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
            author: {
              '@type': 'Organization',
              name: 'Pip-Biz'
            }
          })
        }}
      />
    </div>
  )
}