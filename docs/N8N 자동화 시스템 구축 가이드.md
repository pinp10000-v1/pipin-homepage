# N8N 자동화 시스템 구축 가이드

> pip-biz.com 랜딩페이지 연동 기준 (2026-04-09)

---

## 시스템 개요

**목표**: 매일 부동산·경제·금융 뉴스를 자동 수집 → 요약 → pip-biz.com NewsInsight 섹션 노출

**현재 상태**:  
- NewsInsight 섹션: `components/NewsInsight.tsx`에 **mock 데이터 6개** 하드코딩 상태
- N8N 연동 시 이 mock 데이터를 실제 API 데이터로 교체

---

## 자동화 흐름

```
[RSS/뉴스 API]
    ↓ 매일 06:00 (N8N Cron)
[N8N - 뉴스 수집 및 필터링]
    ↓
[Claude API - 요약 및 카테고리 분류]
    ↓
[JSON 파일 or API 저장]
    ↓
[pip-biz.com NewsInsight 섹션 반영]
```

---

## 홈페이지 연동 방법

### 현재 구조 (mock 데이터)

`components/NewsInsight.tsx` 상단의 `mockNews` 배열이 데이터 소스:

```tsx
const mockNews: NewsItem[] = [
  {
    id: 1,
    category: '국내부동산',
    title: '서울 아파트값 5주 연속 상승세...',
    summary: '...',
    date: '2025.04.01',
    link: '#',
    image: '/image/news_01.png',  // 현재 없음 → 그라데이션 표시
  },
  // ...
]
```

### N8N 연동 후 변경 방법

**방법 A: API Route 방식 (권장)**
```
N8N → /api/news (Next.js API) → JSON 저장
NewsInsight.tsx → fetch('/api/news') 로 데이터 로드
```

**방법 B: JSON 파일 직접 교체**
```
N8N → public/data/news.json 업데이트
NewsInsight.tsx → import newsData from '/data/news.json'
```

### NewsItem 데이터 구조

```typescript
interface NewsItem {
  id: number
  category: '국내부동산' | '경제동향' | '분양시장' | '정책분석' | '시장분석' | '상업용부동산'
  title: string       // 뉴스 제목 (최대 40자 권장)
  summary: string     // 2~3줄 요약
  date: string        // 'YYYY.MM.DD' 형식
  link: string        // 원본 기사 URL
  image: string       // 이미지 경로 (없으면 그라데이션 자동 표시)
}
```

---

## N8N 워크플로우 설정

### 1단계: 뉴스 수집

**Cron 트리거**: 매일 06:00

**수집 소스 (RSS)**:
- 부동산114 뉴스
- 이데일리 부동산
- 머니투데이 부동산

```
[Cron Trigger 06:00]
    ↓
[HTTP Request - RSS 수집]
    ↓
[상위 6개 필터링]
```

### 2단계: Claude API 요약

```
프롬프트:
"다음 뉴스를 부동산 업계 관점에서 80자 이내로 요약하고,
카테고리를 [국내부동산/경제동향/분양시장/정책분석/시장분석/상업용부동산] 중 하나로 분류하세요.

뉴스: {title} - {content}"
```

### 3단계: 홈페이지 반영

```
[Claude 응답 파싱]
    ↓
[JSON 구조로 변환]
    ↓
[pip-biz.com API 호출 또는 파일 저장]
    ↓
[Vercel 재배포 트리거 (선택)]
```

---

## 필요한 API 키

| 서비스 | 용도 | 설정 위치 |
|--------|------|----------|
| Anthropic Claude API | 뉴스 요약 | N8N Credentials |
| Vercel API Token | 재배포 트리거 (선택) | N8N Credentials |
| 뉴스 API (선택) | 유료 뉴스 수집 | N8N Credentials |

---

## 구현 체크리스트

### 1차: 기본 수집
- [ ] N8N 워크플로우 생성
- [ ] RSS 피드 연결 및 파싱
- [ ] 상위 6개 필터링 로직

### 2차: Claude 요약
- [ ] Claude API 연결
- [ ] 요약 프롬프트 최적화
- [ ] 카테고리 분류 정확도 확인

### 3차: 홈페이지 연동
- [ ] `NewsInsight.tsx` mock 데이터 → API 호출로 변경
- [ ] 데이터 없을 때 fallback 처리
- [ ] 뉴스 카드 이미지 (없으면 그라데이션 유지)

### 4차: 자동화 완성
- [ ] Cron 스케줄 설정
- [ ] 에러 발생 시 알림 (이메일/Slack)
- [ ] 실제 배포 환경 테스트

---

## 주의사항

- 뉴스 원본 링크 반드시 표기 (저작권)
- Claude API 비용: 뉴스 6개/일 기준 월 $1~3 예상
- 현재 `NewsInsight.tsx`의 이미지는 그라데이션 플레이스홀더 → N8N 연동 시 실제 이미지 URL 연결 가능
