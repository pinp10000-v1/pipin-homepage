# AI 이미지 생성 가이드

## 필요한 이미지

### 1. 성공 이미지 (Contact 섹션용)
- **위치**: Contact 섹션의 "빠른 검토를 위한 필수 정보" 위
- **크기**: 1200x400px (또는 비슷한 비율)
- **주제**: 성공, 상승, 성장을 암시하는 이미지
- **스타일**: 미니멀하고 모던한 비즈니스 스타일
- **색상**: 주로 파란색(#1A4D7B), 청록색(#00A698)

**프롬프트 예시**:
```
성공과 성장을 암시하는 현대적 비즈니스 이미지.
체크마크, 상승하는 화살표, 밝은 빛이 포함된 미니멀 디자인.
주색상: 파란색과 청록색. 배경은 그라데이션.
3D 스타일, 전문적이고 희망차 보이는 느낌.
```

### 2. N8N 뉴스 이미지 (자동 생성)
- **크기**: 1200x630px (SNS 최적화)
- **주제**: 각 뉴스의 카테고리에 맞는 이미지
- **카테고리별**:
  - 부동산: 건물, 집, 부동산 마켓 관련 이미지
  - 경제: 그래프, 상승/하락 차트, 경제 지표
  - 금융: 동전, 증권, 금융 거래 시각화

---

## 🎨 이미지 생성 도구

### 추천 도구 (무료/유료)

#### 1. **Midjourney** (유료 - 추천)
- 고품질 이미지 생성
- 한국어 프롬프트 지원
- 월 $10~120

**사용 방법**:
```
/imagine prompt: 성공을 암시하는 모던 비즈니스 이미지, 체크마크, 상승 화살표...
```

#### 2. **DALL-E 3** (유료)
- OpenAI의 최신 모델
- 한국어 지원
- $0.045 per image

**API 사용**:
```python
from openai import OpenAI
client = OpenAI(api_key="sk-...")
response = client.images.generate(
  model="dall-e-3",
  prompt="성공을 암시하는 이미지...",
  size="1024x1024"
)
```

#### 3. **Leonardo.ai** (무료)
- 고품질 무료 생성
- 일일 한계 있음
- 웹 기반

#### 4. **Stable Diffusion** (무료 - 로컬)
- 로컬에서 무료 실행 가능
- 높은 사양 필요

---

## 📝 파일 저장 및 연결

### 파일명 규칙
```
success-hero.png              # Contact 섹션 성공 이미지
news-{date}-{category}.jpg    # N8N 자동 생성 뉴스 이미지
```

### 저장 위치
```
/public/image/
  ├── success-hero.png
  ├── news/
  │   ├── 2026-04-07-realestate.jpg
  │   ├── 2026-04-07-economy.jpg
  │   └── 2026-04-07-finance.jpg
```

### 코드 연결

**Contact.tsx**:
```tsx
<div className="mb-6 overflow-hidden bg-gradient-to-br from-teal/10 to-navy/10 rounded-lg relative h-48">
  <Image
    src="/image/success-hero.png"
    alt="성공"
    fill
    className="object-cover"
  />
</div>
```

---

## 🤖 Claude API를 활용한 이미지 생성

Claude는 직접 이미지를 생성할 수 없지만, 다음과 같이 활용 가능:

### 1. 프롬프트 최적화
```javascript
const claude = require("@anthropic-ai/sdk");

const client = new claude.Anthropic();

async function generateImagePrompt(newsTitle, category) {
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `${category} 카테고리의 뉴스 "${newsTitle}"를 시각적으로 표현하는 AI 이미지 생성 프롬프트를 영어로 작성해주세요. 
        
Midjourney나 DALL-E 스타일의 상세한 프롬프트로:
- 색상 지정
- 스타일 지정
- 구성 지정

예: "Modern 3D business chart showing growth, trending upward, mint green and navy blue colors..."`,
      },
    ],
  });

  return message.content[0].text;
}
```

### 2. N8N에서의 활용
```
[뉴스 제목] → [Claude - 이미지 프롬프트 생성] → [Midjourney/DALL-E API] → [이미지 저장]
```

---

## ✅ 작업 체크리스트

### 즉시 (수동 생성)
- [ ] Midjourney 또는 DALL-E에서 성공 이미지 생성
- [ ] `/public/image/success-hero.png` 저장
- [ ] Contact.tsx에서 이미지 경로 확인

### N8N 자동화 (향후)
- [ ] N8N에 Claude API 연동
- [ ] 이미지 생성 프롬프트 로직 구현
- [ ] 자동 이미지 생성 및 저장 설정
- [ ] 블로그 게시 시 자동 첨부

---

## 💾 저장된 이미지 목록

| 파일명 | 크기 | 용도 | 상태 |
|--------|------|------|------|
| success-hero.png | 1200x400 | Contact 섹션 | ⏳ 준비중 |
| news-* | 1200x630 | 뉴스 이미지 | ⏳ N8N 자동 생성 예정 |

---

## 🎯 다음 단계

1. **이미지 생성** (1-2시간)
   - Midjourney 또는 DALL-E에서 생성
   - `/public/image/success-hero.png` 저장

2. **코드 연결** (5분)
   - Contact.tsx 이미지 경로 확인
   - 브라우저에서 확인

3. **N8N 설정** (1-2주)
   - N8N 워크플로우 구축
   - 자동 이미지 생성 테스트
   - 블로그 자동 게시 연동
