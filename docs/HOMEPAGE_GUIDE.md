# 피플인피플 홈페이지 관리 가이드

## 홈페이지 수정 방법 (핵심)

코드 수정 후 아래 3줄만 실행하면 www.pip-biz.com 에 자동 반영됨:

```bash
git add .
git commit -m "수정 내용"
git push origin master
```

> `git push` 후 **1~2분** 기다리면 홈페이지에 반영됨

---

## 구조 개요

```
로컬 PC (VS Code)
    ↓ git push
GitHub (소스코드 저장)
    ↓ 자동 배포
Vercel (서버 호스팅)
    ↓ 도메인 연결
pip-biz.com (실제 홈페이지)
```

---

## 계정 정보

| 서비스 | 주소 | 계정 |
|--------|------|------|
| **GitHub** | https://github.com/pinp10000-v1/pipin-homepage | pinp10000-v1 |
| **Vercel** | https://vercel.com/dashboard | GitHub 연동 |
| **홈페이지** | https://www.pip-biz.com | - |

---

## 로컬 개발 환경

- **작업 폴더**: `C:\Users\청라V1부동산\homepage`
- **개발 서버 실행**: `npm run dev` → http://localhost:3000
- **기술 스택**: Next.js 15, React 19, TypeScript, Tailwind CSS

---

## 코드 수정 → 배포 순서

### 1. 로컬에서 코드 수정
```bash
# 개발 서버 켜서 확인
npm run dev
```

### 2. GitHub에 올리기
```bash
git add .
git commit -m "수정 내용 설명"
git push origin master
```

### 3. 자동 배포
- `git push` 하면 **Vercel이 자동으로 감지**해서 배포 시작
- 약 1~2분 후 https://www.pip-biz.com 에 반영됨
- Vercel 대시보드에서 배포 상태 확인 가능

---

## 주요 파일 구조

```
homepage/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 전체 레이아웃
│   └── api/
│       └── contact/
│           └── route.ts  # 문의 이메일 발송 API
├── components/
│   ├── Navigation.tsx    # 상단 메뉴
│   ├── Hero.tsx          # 첫 화면 (메인 배너)
│   ├── About.tsx         # 회사 소개
│   ├── Solution.tsx      # 솔루션 소개
│   ├── Projects.tsx      # 프로젝트/실적
│   ├── Contact.tsx       # 문의 폼
│   └── Footer.tsx        # 하단 푸터
├── public/
│   └── image/            # 이미지 파일들
├── .env.local            # 환경변수 (GitHub에 올라가지 않음)
└── next.config.js        # Next.js 설정
```

---

## 환경변수 (.env.local)

> **주의**: 이 파일은 GitHub에 올라가지 않음. Vercel에 별도 설정 필요.

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=pinp10000@gmail.com
SMTP_PASS=pglywjafnfgnoedi   ← Gmail 앱 비밀번호
```

### Vercel 환경변수 관리
- Vercel 대시보드 → 프로젝트 → Settings → Environment Variables

---

## 도메인 관리

| 항목 | 값 |
|------|-----|
| 도메인 | pip-biz.com |
| 연결 방식 | Vercel Custom Domain |
| DNS 설정 | Vercel 대시보드 → Settings → Domains |

---

## 자주 하는 작업

### 텍스트/내용 수정
1. `components/` 폴더에서 해당 파일 열기
2. 수정 후 저장
3. `git push` → 자동 배포

### 이미지 교체
1. `public/image/` 폴더에 새 이미지 넣기
2. 기존 파일명과 동일하게 저장하면 자동 교체
3. `git push` → 자동 배포

### 배포 실패 시
1. Vercel 대시보드 → 프로젝트 → 최근 배포 클릭
2. 빨간색 로그 확인
3. 오류 내용 Claude Code에 붙여넣기

---

## 문의 폼 동작 방식

```
방문자 문의 제출
    ↓
/api/contact (Vercel 서버)
    ↓
pinp10000@gmail.com 으로 이메일 발송
```
