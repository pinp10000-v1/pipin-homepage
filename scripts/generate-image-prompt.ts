import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateImagePrompt() {
  const context = {
    company: "㈜피플인피플 (People in People) - 부동산 분양대행 및 컨설팅",
    imageUsage: "Contact 섹션 - 성공 사례 및 전문성 표현",
    imageSpecs: "1200x400px (또는 3:1 비율)",
    colorScheme: "파란색(#1A4D7B), 청록색(#00A698), 그라데이션",
    style: "미니멀하고 모던한 비즈니스 스타일, 3D 스타일",
    message:
      "16개 단지, 6,182세대를 분양한 전문기업의 성공과 신뢰성 표현",
  };

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 500,
    messages: [
      {
        role: "user",
        content: `당신은 전문적인 AI 이미지 생성 프롬프트 작성 전문가입니다.

다음 조건에 맞는 고품질 이미지 생성 프롬프트를 만들어주세요:

**회사 정보:**
- ${context.company}
- 특징: 20년 이상의 현장 경험, 미완료 사례 없음, 완공 후에도 책임

**이미지 사용처:**
- ${context.imageUsage}
- 크기: ${context.imageSpecs}
- 색상: ${context.colorScheme}
- 스타일: ${context.style}

**표현해야 할 컨셉:**
✓ 성공과 성장을 암시하는 이미지
✓ 전문성과 신뢰성
✓ 부동산 분야의 성과
✓ 고객 만족도
✓ 팀의 협력과 역량

**요구사항:**
1. Midjourney 또는 DALL-E에 직접 사용 가능한 영어 프롬프트 작성
2. 구체적인 시각 요소 포함 (체크마크, 상승 화살표, 빛, 건물 등)
3. 색상 코드와 스타일을 명시
4. 감정적 톤: 희망차고 긍정적
5. 해상도: 고해상도, 4K 품질

**생성할 프롬프트:**
영어 프롬프트만 제공하고, 추가 설명은 하지 마세요.`,
      },
    ],
  });

  const prompt =
    response.content[0].type === "text" ? response.content[0].text : "";

  console.log("✨ 생성된 AI 이미지 프롬프트:\n");
  console.log("━".repeat(80));
  console.log(prompt);
  console.log("━".repeat(80));

  console.log("\n📝 프롬프트 사용 방법:\n");
  console.log("1️⃣  Midjourney 사용:");
  console.log("   Discord에서 /imagine 명령 후 위 프롬프트를 붙여넣기\n");

  console.log("2️⃣  DALL-E 3 사용:");
  console.log("   OpenAI API 호출 또는 ChatGPT에서 프롬프트 사용\n");

  console.log("3️⃣  생성된 이미지 저장:");
  console.log("   - 파일명: success-hero.png");
  console.log("   - 경로: /public/image/success-hero.png");
  console.log("   - 형식: PNG 또는 JPG\n");

  console.log("4️⃣  Contact.tsx 활성화:");
  console.log("   Line 90의 주석을 제거하고 Image 컴포넌트 활성화\n");

  return prompt;
}

generateImagePrompt().catch(console.error);
