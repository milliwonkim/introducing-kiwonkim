import { NextRequest, NextResponse } from "next/server";

// AI 봇 User-Agent 패턴들
const AI_BOT_PATTERNS = [
  // OpenAI/ChatGPT
  /ChatGPT/i,
  /GPTBot/i,
  /OpenAI/i,
  /ChatGPT-User/i,
  /OpenAI-SearchBot/i,

  // Anthropic/Claude
  /Claude/i,
  /ClaudeBot/i,
  /anthropic/i,
  /Claude-Web/i,

  // Google Bard/Gemini
  /Bard/i,
  /Gemini/i,
  /Google-Extended/i,

  // 기타 AI 봇들
  /CCBot/i,
  /PerplexityBot/i,
  /YouBot/i,
  /AI2Bot/i,
  /Meta-ExternalAgent/i,
  /FacebookBot/i,

  // 일반적인 AI 관련 키워드
  /artificial.intelligence/i,
  /machine.learning/i,
  /language.model/i,
  /llm/i,
  /gpt/i,
];

// 허용할 검색엔진 봇들
const ALLOWED_BOTS = [
  /Googlebot/i,
  /Bingbot/i,
  /Slurp/i, // Yahoo
  /DuckDuckBot/i,
  /Applebot/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /WhatsApp/i,
  /Telegram/i,
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";

  // User-Agent가 비어있는 경우 차단
  if (!userAgent.trim()) {
    return new NextResponse("Access Denied", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "X-Robots-Tag": "noindex, nofollow, nosnippet, noarchive",
      },
    });
  }

  // 허용된 봇인지 먼저 확인
  const isAllowedBot = ALLOWED_BOTS.some((pattern) => pattern.test(userAgent));
  if (isAllowedBot) {
    return NextResponse.next();
  }

  // AI 봇 패턴 확인
  const isAIBot = AI_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));

  if (isAIBot) {
    console.log(`AI Bot blocked: ${userAgent}`);
    return new NextResponse("Access Denied - AI Bots Not Allowed", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
        "X-Robots-Tag": "noindex, nofollow, nosnippet, noarchive",
      },
    });
  }

  // 정상 요청은 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 모든 요청 경로에 적용하되 다음은 제외:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
