import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import { ThemeProvider } from "@repo/ui";
import ReactQueryProvider from "../providers/ReactQueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "김기원 포트폴리오",
  description:
    "React, Next.js, TypeScript로 사용자 중심의 웹 경험을 만드는 프론트엔드 개발자",
  keywords: "프론트엔드, 개발자, React, Next.js, TypeScript, 포트폴리오",
  authors: [{ name: "김기원" }],
  creator: "김기원",
  publisher: "김기원",
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
    title: "김기원 포트폴리오",
    description:
      "React, Next.js, TypeScript로 사용자 중심의 웹 경험을 만드는 프론트엔드 개발자",
    siteName: "김기원 포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "김기원 포트폴리오",
    description:
      "React, Next.js, TypeScript로 사용자 중심의 웹 경험을 만드는 프론트엔드 개발자",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable}`} suppressHydrationWarning>
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
            className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen smooth-scroll`}
          >
            <div className="flex flex-col min-h-screen overflow-hidden">
              <Navbar />
              <main className="flex-grow pt-[var(--header-height)] toss-fade-in">
                {children}
              </main>
            </div>
          </body>
        </ReactQueryProvider>
      </ThemeProvider>
    </html>
  );
}
