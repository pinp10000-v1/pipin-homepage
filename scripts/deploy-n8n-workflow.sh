#!/bin/bash

# n8n 워크플로우 자동 배포 스크립트
# 사용법: bash scripts/deploy-n8n-workflow.sh [deploy|test|status]

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 환경변수 확인
check_env() {
  if [ -z "$N8N_API_TOKEN" ]; then
    echo -e "${RED}❌ 오류: N8N_API_TOKEN 환경변수가 설정되지 않았습니다${NC}"
    echo -e "${YELLOW}설정 방법:${NC}"
    echo "  1. n8n 웹 UI 접속: https://n8n.pipin.dedyn.io"
    echo "  2. Account → API tokens → Create token"
    echo "  3. .env.local에 추가: N8N_API_TOKEN=your_token"
    exit 1
  fi

  if [ -z "$NEWS_API_KEY" ]; then
    echo -e "${RED}❌ 오류: NEWS_API_KEY 환경변수가 설정되지 않았습니다${NC}"
    echo -e "${YELLOW}설정 방법:${NC}"
    echo "  1. https://newsapi.org 접속 후 가입"
    echo "  2. API Key 발급"
    echo "  3. .env.local에 추가: NEWS_API_KEY=your_key"
    exit 1
  fi

  if [ -z "$OPENROUTER_API_KEY" ]; then
    echo -e "${RED}❌ 오류: OPENROUTER_API_KEY 환경변수가 설정되지 않았습니다${NC}"
    echo -e "${YELLOW}설정 방법:${NC}"
    echo "  1. https://openrouter.ai 접속 후 가입"
    echo "  2. API Key 발급"
    echo "  3. .env.local에 추가: OPENROUTER_API_KEY=your_key"
    exit 1
  fi
}

# n8n 연결 테스트
test_connection() {
  echo -e "${BLUE}🔄 n8n 인스턴스 연결 테스트 중...${NC}"

  RESPONSE=$(curl -s -w "\n%{http_code}" \
    -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
    "https://n8n.pipin.dedyn.io/api/v1/workflows")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ n8n 연결 성공${NC}"
    echo "   현재 워크플로우 개수: $(echo "$BODY" | grep -o '"id"' | wc -l)"
    return 0
  else
    echo -e "${RED}❌ n8n 연결 실패 (HTTP $HTTP_CODE)${NC}"
    echo "응답: $BODY"
    return 1
  fi
}

# 워크플로우 배포
deploy_workflow() {
  echo -e "${BLUE}📤 워크플로우 배포 중...${NC}"

  WORKFLOW_FILE="$(dirname "$0")/n8n/workflow-news-automation.json"

  if [ ! -f "$WORKFLOW_FILE" ]; then
    echo -e "${RED}❌ 워크플로우 파일을 찾을 수 없습니다: $WORKFLOW_FILE${NC}"
    exit 1
  fi

  WORKFLOW_JSON=$(cat "$WORKFLOW_FILE")

  echo -e "${YELLOW}📝 워크플로우 생성 중...${NC}"
  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$WORKFLOW_JSON" \
    "https://n8n.pipin.dedyn.io/api/v1/workflows")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
    WORKFLOW_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo -e "${GREEN}✅ 워크플로우 생성 성공${NC}"
    echo -e "   워크플로우 ID: ${BLUE}$WORKFLOW_ID${NC}"

    echo -e "${YELLOW}🚀 워크플로우 활성화 중...${NC}"
    curl -s -X POST \
      -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
      -H "Content-Type: application/json" \
      "https://n8n.pipin.dedyn.io/api/v1/workflows/$WORKFLOW_ID/activate" > /dev/null

    echo -e "${GREEN}✅ 워크플로우 활성화 완료${NC}"
    echo ""
    echo -e "${YELLOW}📋 다음 단계:${NC}"
    echo "  1. n8n 웹 UI 확인: https://n8n.pipin.dedyn.io"
    echo "  2. 워크플로우 ID: $WORKFLOW_ID 검색"
    echo "  3. 노드 연결 및 파라미터 확인"
    echo "  4. 'Execute Workflow' 버튼으로 테스트"

    return 0
  else
    echo -e "${RED}❌ 워크플로우 생성 실패 (HTTP $HTTP_CODE)${NC}"
    echo "응답: $BODY"
    return 1
  fi
}

# 워크플로우 상태 조회
get_status() {
  echo -e "${BLUE}🔍 워크플로우 목록 조회 중...${NC}"

  RESPONSE=$(curl -s \
    -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
    "https://n8n.pipin.dedyn.io/api/v1/workflows")

  echo "$RESPONSE" | jq '.data[] | {id: .id, name: .name, active: .active}' 2>/dev/null || {
    echo -e "${YELLOW}💡 jq 설치 안 됨. 원본 응답:${NC}"
    echo "$RESPONSE"
  }
}

# 사용법
usage() {
  echo -e "${BLUE}n8n 워크플로우 배포 스크립트${NC}"
  echo ""
  echo "사용법: bash $0 [명령]"
  echo ""
  echo "명령:"
  echo "  deploy    워크플로우 배포 (기본값)"
  echo "  test      n8n 연결 테스트만 수행"
  echo "  status    현재 워크플로우 목록 조회"
  echo "  help      이 도움말 표시"
  echo ""
  echo "환경변수 설정 필수:"
  echo "  N8N_API_TOKEN        n8n API 토큰"
  echo "  NEWS_API_KEY         NewsAPI 키"
  echo "  OPENROUTER_API_KEY   OpenRouter API 키"
}

# n8n 웹훅 실행 (Manual Trigger 워크플로우용)
execute_webhook() {
  WORKFLOW_ID="$1"

  if [ -z "$WORKFLOW_ID" ]; then
    echo -e "${RED}❌ 워크플로우 ID를 입력하세요${NC}"
    echo "사용법: bash $0 webhook <workflow_id>"
    exit 1
  fi

  echo -e "${BLUE}🚀 웹훅으로 워크플로우 실행 중 (ID: $WORKFLOW_ID)...${NC}"

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
    "https://n8n.pipin.dedyn.io/api/v1/workflows/$WORKFLOW_ID/activate" \
    -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
    -H "Content-Type: application/json")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 워크플로우 활성화 완료${NC}"
  fi

  # 웹훅 실행 (일부 버전에서 지원)
  WEBHOOK_RESPONSE=$(curl -s -X POST \
    "https://n8n.pipin.dedyn.io/api/v1/workflows/$WORKFLOW_ID/execute" \
    -H "X-N8N-API-KEY: $N8N_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{}' 2>&1)

  echo -e "${YELLOW}📤 실행 요청 응답:${NC}"
  echo "$WEBHOOK_RESPONSE" | head -5
}

# 메인 로직
main() {
  if [ -f ".env.local" ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
  fi

  COMMAND="${1:-deploy}"

  case "$COMMAND" in
    deploy)
      check_env
      test_connection && deploy_workflow
      ;;
    test)
      check_env
      test_connection
      ;;
    status)
      check_env
      get_status
      ;;
    webhook)
      check_env
      execute_webhook "$2"
      ;;
    help)
      usage
      ;;
    *)
      echo -e "${RED}❌ 알 수 없는 명령: $COMMAND${NC}"
      usage
      exit 1
      ;;
  esac
}

main "$@"
