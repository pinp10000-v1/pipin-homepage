// /app/news/page.jsx - 뉴스 목록 페이지
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsPage() {
  const [articles, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = ['경제', '부동산', '부동산동향']

  useEffect(() => {
    fetchArticles()
  }, [selectedCategory])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const url = `/api/articles${selectedCategory ? `?category=${selectedCategory}` : ''}`
      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        setArticles(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            부동산 뉴스 & 경제동향
          </h1>
          <p className="text-lg text-gray-600">
            실시간 마켓 피드 - 최신 뉴스와 시장 동향을 한눈에
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="mb-8 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
            }`}
          >
            전체
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 기사 목록 */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">로딩 중...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">기사가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            {articles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="flex gap-6">
                  {/* 썸네일 */}
                  {article.image_url && (
                    <div className="flex-shrink-0 w-48 h-32 relative">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* 컨텐츠 */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    {/* 카테고리와 날짜 */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                        {article.category}
                      </span>
                      <time className="text-sm text-gray-500">
                        {new Date(article.published_at).toLocaleDateString('ko-KR')}
                      </time>
                    </div>

                    {/* 제목 */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h2>

                    {/* 요약 */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.summary}
                    </p>

                    {/* 더보기 링크 */}
                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-block text-blue-600 font-medium hover:text-blue-700 transition"
                    >
                      전체 기사 읽기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}