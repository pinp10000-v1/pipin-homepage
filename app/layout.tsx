import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '㈜피플인피플 — Realty Marketing Solution Company',
  description:
    '2013년 창사 이래 16개 단지 6,182세대를 분양한 부동산 분양대행·컨설팅 전문기업. 기획 첫날부터 입주 완료일까지 끝까지 함께합니다.',
  keywords: '분양대행, 부동산컨설팅, 피플인피플, 부산분양, 입주대행, 분양기획',
  openGraph: {
    title: '㈜피플인피플 — Realty Marketing Solution Company',
    description: '16개 단지, 6,182세대. 부산·경남·수도권 전역의 분양 실행력.',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
