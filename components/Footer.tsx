import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/image/logo_transparent.png"
                  alt="피플인피플 로고"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-white font-black text-xl tracking-tight leading-none">
                  PEOPLE IN PEOPLE
                </p>
                <p className="text-teal text-[10px] font-bold tracking-widest mt-1">
                  ㈜피플인피플
                </p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
              기획 첫날부터 입주 완료일까지,
              <br />끝까지 함께합니다.
            </p>

          </div>

          {/* Company Info */}
          <div>
            <p className="text-xs font-semibold text-white/30 tracking-widest uppercase mb-5">
              COMPANY INFO
            </p>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <span className="text-white/20 text-xs block mb-0.5">대표이사</span>
                김성룡
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">설립연도</span>
                2013년
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">수행 실적</span>
                16개 단지 · 6,182세대
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">사업영역</span>
                부산·경남·수도권
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-white/30 tracking-widest uppercase mb-5">
              CONTACT
            </p>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="leading-relaxed">
                <span className="text-white/20 text-xs block mb-0.5">주소</span>
                부산광역시 수영구 광안해변로 263,
                <br />1612호 (민락동, 파로스오피스텔)
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">대표전화</span>
                <a
                  href="tel:05150505656"
                  className="hover:text-teal transition-colors font-semibold text-white/70"
                >
                  051-505-5656
                </a>
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">팩스</span>
                051-980-5656
              </li>
              <li>
                <span className="text-white/20 text-xs block mb-0.5">업무시간</span>
                평일 09:00 – 18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Business Partners */}
        <div className="py-8 border-b border-white/10">
          <p className="text-xs font-semibold text-white/30 tracking-widest uppercase mb-6">
            Business Partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'GS건설', logo: '/image/partner_gs.png' },
              { name: '쌍용건설', logo: '/image/partner_ssangyong.png' },
              { name: '대우건설', logo: '/image/partner_daewoo.png' },
              { name: 'SK건설', logo: '/image/partner_sk.png' },
              { name: '한화건설', logo: '/image/partner_hanwha.png' },
              { name: 'DL이앤씨', logo: '/image/partner_dl.png' }
            ].map((partner) => (
              <div key={partner.name} className="flex items-center justify-center p-4 bg-white/5 hover:bg-white/10 transition-colors rounded-sm min-h-24">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={70}
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {currentYear} ㈜피플인피플. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Realty Marketing Solution Company — 부동산 분양대행 · 컨설팅 · 입주대행
          </p>
        </div>
      </div>
    </footer>
  )
}
