"use client";

import Layout from "../components/layout/Layout";
import Link from "next/link";

/**
 * @description Main Home Page - Simple navigation to tech stack, blog, and projects
 */
export default function Home() {
  // Main navigation cards
  const navigationCards = [
    {
      title: "Skills",
      description: "Technologies I work with",
      href: "/skills",
      icon: "⚡",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Projects",
      description: "Things I've built",
      href: "/projects",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Resume",
      description: "My professional journey",
      href: "/resume",
      icon: "📄",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Blog",
      description: "Thoughts and learnings",
      href: "/blog",
      icon: "📝",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  return (
    <Layout>
      <section className="py-20 min-h-[calc(100vh-var(--header-height))] bg-gradient-to-br from-[var(--color-background)] via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-400/20 rounded-full animate-bounce delay-75"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-green-400/20 rounded-full animate-pulse delay-150"></div>
          <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-pink-400/20 rounded-full animate-bounce delay-300"></div>
        </div>

        <div className="container mx-auto px-6 md:px-8 max-w-6xl relative">
          {/* Hero section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
              <span className="text-2xl mr-2">👋</span>
              <span className="text-sm font-medium text-[var(--color-primary)]">
                Frontend Developer
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Hi, I&apos;m
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Kiwon Kim
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Building beautiful, user-focused web experiences with{" "}
              <span className="font-semibold text-blue-600">React</span>,{" "}
              <span className="font-semibold text-purple-600">Next.js</span>,
              and{" "}
              <span className="font-semibold text-green-600">TypeScript</span>
            </p>
          </div>

          {/* Enhanced Navigation cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {navigationCards.map((card) => (
              <Link key={card.title} href={card.href} className="group block">
                <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 hover:border-white/80 transition-all duration-500 p-8 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon with enhanced animation */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} text-white text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      {card.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="flex items-center justify-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Explore
                      <svg
                        className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Enhanced CTA section */}
          <div className="text-center">
            <div className="inline-block p-8 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Let&apos;s Create Something Amazing!
                <span className="text-4xl ml-2">✨</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Ready to bring your ideas to life? I&apos;d love to collaborate
                and build something extraordinary together.
              </p>
              <Link
                href="/contact"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span className="mr-2">🚀</span>
                Get in Touch
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
