'use client'

import { useEffect, useRef, useState } from 'react'
export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    message: '',
  })

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
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, submittedAt: new Date().toISOString() }),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', phone: '', type: '', message: '' })
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        alert('전송에 실패했습니다. 잠시 후 다시 시도해주세요.')
      }
    } catch {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10" ref={ref}>

        {/* Section Header */}
        <div className="reveal mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] text-teal uppercase mb-4">
            LET&apos;S PARTNER UP
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-navy leading-[1.1] mb-4">
            당신의 성공을{' '}
            <span className="text-teal">함께 설계</span>합니다
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            사업지 검토 문의부터 마케팅 전략 수립까지,
            피플인피플의 전문가 그룹이 직접 답변해 드립니다.
          </p>
        </div>

        {/* 3-Column Grid: Tip Box + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">

          {/* Left vertical line - ends at button bottom */}
          <div className="hidden lg:block absolute left-0 top-0 w-1 bg-teal" style={{ bottom: '0' }} />

          {/* Left: Tip Box */}
          <div className="lg:col-span-4 reveal flex flex-col" style={{ transitionDelay: '100ms' }}>
            {/* Success Handshake Image */}
            <div className="mb-6 overflow-hidden relative flex-shrink-0" style={{ height: '200px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/image/success_handshake.jpg"
                alt="성공 파트너십"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              <p className="absolute bottom-4 left-5 text-white font-black text-sm tracking-widest drop-shadow">
                PARTNERSHIP SUCCESS
              </p>
            </div>

            <div className="flex-1 p-8 bg-surface border-l-4 border-teal relative shadow-sm flex flex-col">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs font-black text-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal" />
                빠른 검토를 위한 필수 정보
              </p>
              <ul className="text-sm text-gray-600 space-y-5 leading-relaxed font-medium flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-teal font-black text-base">01</span>
                  <span>사업지 위치 및 대략적인 면적</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal font-black text-base">02</span>
                  <span>예정 상품 유형 (아파트/오피스텔 등)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal font-black text-base">03</span>
                  <span>현재 사업 진행 단계</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal font-black text-base">04</span>
                  <span>해결하고자 하는 주요 고민 지점</span>
                </li>
              </ul>
              <p className="mt-8 text-xs text-gray-400 font-medium border-t border-gray-100 pt-6">
                * 상세 정보를 많이 입력해주실수록 더 정밀한 수지분석과 마케팅 전략 제안이 가능합니다.
              </p>
            </div>
          </div>

          {/* Right: Form Card */}
          <div className="lg:col-span-8 reveal flex flex-col" style={{ transitionDelay: '200ms' }}>
            <div className="flex-1 bg-white shadow-2xl p-8 md:p-12 border border-gray-100 relative flex flex-col">
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-navy mb-3">문의가 성공적으로 전달되었습니다</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    3영업일 이내에 전문 담당자가<br />직접 검토 후 연락드리겠습니다.
                  </p>
                  <p className="mt-4 text-xs text-teal font-semibold">
                    pinp10000@gmail.com 으로도 확인 가능합니다.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-2xl font-black text-navy mb-2">상담 신청</h3>
                    <p className="text-gray-400 text-sm">전문가 그룹이 직접 내용을 검토합니다.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                          성함 / 회사명 <span className="text-teal">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="홍길동 / ㈜피플건설"
                          className="w-full bg-surface border-0 px-5 py-4 text-sm focus:ring-2 focus:ring-teal focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                          연락처 <span className="text-teal">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="010-0000-0000"
                          className="w-full bg-surface border-0 px-5 py-4 text-sm focus:ring-2 focus:ring-teal focus:outline-none transition-all placeholder:text-gray-300 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="type" className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        문의 유형
                      </label>
                      <div className="relative">
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full bg-surface border-0 px-5 py-4 text-sm focus:ring-2 focus:ring-teal focus:outline-none transition-all appearance-none font-medium cursor-pointer"
                        >
                          <option value="">문의 유형을 선택해주세요</option>
                          <option>부동산 분양대행</option>
                          <option>개발 컨설팅 및 수지분석</option>
                          <option>입주관리 및 사후관리</option>
                          <option>기타 제휴 문의</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        상세 문의 내용
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="사업지 위치, 규모, 현재 단계 등 상세 내용을 적어주시면 더 정확한 검토가 가능합니다."
                        className="w-full bg-surface border-0 px-5 py-4 text-sm focus:ring-2 focus:ring-teal focus:outline-none transition-all resize-none placeholder:text-gray-300 font-medium"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-navy text-white font-black py-5 text-sm tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-teal'}`}
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            처리 중...
                          </>
                        ) : (
                          '무료 사업지 검토 신청하기'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
