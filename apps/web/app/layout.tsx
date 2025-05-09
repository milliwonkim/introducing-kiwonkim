import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import { ThemeProvider } from "@repo/ui";

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
  title: "Kiwon Kim - 프론트엔드 개발자",
  description: "4년차 프론트엔드 개발자 김기원의 포트폴리오 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable}`} suppressHydrationWarning>
      <ThemeProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen smooth-scroll`}
        >
          <div className="flex flex-col min-h-screen overflow-hidden">
            <Navbar />
            <main className="flex-grow pt-[var(--header-height)] toss-fade-in">
              {children}
            </main>
            <footer className="py-6 text-center text-gray-500 text-sm">
              <div className="container mx-auto px-4">
                <p>
                  © {new Date().getFullYear()} Kiwon Kim. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
