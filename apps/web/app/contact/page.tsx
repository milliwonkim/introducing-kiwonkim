"use client";

import Layout from "../../components/layout/Layout";
import Link from "next/link";

/**
 * @description Contact Page Component
 */
export default function ContactPage() {
  const socialLinks = [
    {
      name: "Email",
      url: "mailto:kwk627@naver.com",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kiwon-kim-29b23b106/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/milliwonkim",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: "Blog",
      url: "https://velog.io/@milliwonkim/posts",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Layout>
      <section className="py-16 bg-[var(--color-background)] min-h-[calc(100vh-var(--header-height))]">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              Get in Touch
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Feel free to reach out for new opportunities or collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-[var(--color-card-background)] rounded-lg border border-[var(--color-card-border)] hover:border-[var(--color-primary)] transition-all duration-200"
              >
                <div className="text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] break-all">
                    {link.url
                      .replace(/^https?:\/\//, "")
                      .replace(/^mailto:/, "")}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-[var(--color-card-background)] rounded-lg p-6 border border-[var(--color-card-border)]">
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                Let&apos;s Build Something Great! 🚀
              </h2>
              <p className="text-[var(--color-text-secondary)]">
                Have an idea or project in mind? I&apos;d love to hear about it
                and see how we can work together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
