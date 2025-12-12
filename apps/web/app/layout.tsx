import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader from "../components/layout/SiteHeader";
import { ThemeProvider } from "@repo/ui";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "김기원 - 프론트엔드 개발자 | Kiwon Kim - Frontend Developer",
  description:
    "React, Next.js, TypeScript 전문 프론트엔드 개발자. 3년+ 경력으로 넥슨, 위메프, 한샘에서 확장 가능한 웹 애플리케이션을 구축했습니다. 디자인 시스템, 테스팅, 성능 최적화에 특화되어 있습니다.",
  keywords:
    "프론트엔드 개발자, Frontend Developer, React, Next.js, TypeScript, JavaScript, 웹 개발, UI/UX, 포트폴리오, 넥슨, 위메프, 한샘",
  authors: [{ name: "김기원 (Kiwon Kim)" }],
  creator: "김기원 (Kiwon Kim)",
  publisher: "김기원 (Kiwon Kim)",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
        color: "#3B82F6",
      },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "8D_h7lywJcTCklWlVzrRLKp8FZrPBaHwWyjZ8keeXkY",
  },
  other: {
    // AI 봇 차단 메타 태그
    ChatGPT: "noindex, nofollow",
    GPTBot: "noindex, nofollow",
    "Claude-Web": "noindex, nofollow",
    ClaudeBot: "noindex, nofollow",
    "Google-Extended": "noindex, nofollow",
    Bard: "noindex, nofollow",
    Gemini: "noindex, nofollow",
    CCBot: "noindex, nofollow",
    PerplexityBot: "noindex, nofollow",
    YouBot: "noindex, nofollow",
    AI2Bot: "noindex, nofollow",
    FacebookBot: "noindex, nofollow",
    "Meta-ExternalAgent": "noindex, nofollow",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "김기원 - 프론트엔드 개발자 | Kiwon Kim - Frontend Developer",
    description:
      "React, Next.js, TypeScript 전문 프론트엔드 개발자. 3년+ 경력으로 넥슨, 위메프, 한샘에서 확장 가능한 웹 애플리케이션을 구축했습니다.",
    siteName: "김기원 포트폴리오 | Kiwon Kim Portfolio",
    images: [
      {
        url: "/logo.svg",
        width: 64,
        height: 64,
        alt: "김기원 로고 (Kiwon Kim Logo)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "김기원 - 프론트엔드 개발자 | Kiwon Kim - Frontend Developer",
    description:
      "React, Next.js, TypeScript 전문 프론트엔드 개발자. 3년+ 경력으로 넥슨, 위메프, 한샘에서 확장 가능한 웹 애플리케이션을 구축했습니다.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={geistSans.variable} suppressHydrationWarning>
      <head>
        {/* AI 봇 차단을 위한 추가 메타 태그 */}
        <meta
          name="ChatGPT"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta name="GPTBot" content="noindex, nofollow, nosnippet, noarchive" />
        <meta
          name="Claude-Web"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta
          name="ClaudeBot"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta
          name="Google-Extended"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta name="Bard" content="noindex, nofollow, nosnippet, noarchive" />
        <meta name="Gemini" content="noindex, nofollow, nosnippet, noarchive" />
        <meta name="CCBot" content="noindex, nofollow, nosnippet, noarchive" />
        <meta
          name="PerplexityBot"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta name="YouBot" content="noindex, nofollow, nosnippet, noarchive" />
        <meta name="AI2Bot" content="noindex, nofollow, nosnippet, noarchive" />
        <meta
          name="FacebookBot"
          content="noindex, nofollow, nosnippet, noarchive"
        />
        <meta
          name="Meta-ExternalAgent"
          content="noindex, nofollow, nosnippet, noarchive"
        />

        {/* 일반 검색엔진은 허용 */}
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="bingbot" content="index, follow" />
      </head>
      <ThemeProvider>
        <ReactQueryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased smooth-scroll`}
          >
            <div className="relative min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)]">
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-24 right-[-5%] h-72 w-72 rounded-full bg-[color:var(--color-primary)]/12 blur-3xl" />
                <div className="absolute bottom-[-20%] left-[12%] h-80 w-80 rounded-full bg-[color:var(--color-primary)]/10 blur-3xl" />
                <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[color:var(--color-primary)]/8 blur-[180px]" />
              </div>
              <SiteHeader />
              <main className="pt-[72px] pb-24">
                <div className="toss-fade-in">{children}</div>
              </main>
            </div>
          </body>
        </ReactQueryProvider>
      </ThemeProvider>
    </html>
  );
}
