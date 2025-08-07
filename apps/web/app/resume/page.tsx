"use client";

import { motion } from "motion/react";
import Link from "next/link";

// SVG Icons as components
const DownloadIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const CalendarIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const MailIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function ResumePage() {
  const experiences = [
    {
      title: "Frontend Developer",
      company: "Tech Startup",
      period: "2022 - Present",
      location: "Seoul, South Korea",
      description: [
        "Developed and maintained responsive web applications using React, TypeScript, and Next.js",
        "Collaborated with design and backend teams to implement user-friendly interfaces",
        "Optimized application performance resulting in 40% faster load times",
        "Implemented modern state management solutions using Redux Toolkit and Zustand",
      ],
    },
    {
      title: "Junior Frontend Developer",
      company: "Digital Agency",
      period: "2021 - 2022",
      location: "Seoul, South Korea",
      description: [
        "Built responsive websites using HTML, CSS, JavaScript, and React",
        "Worked closely with designers to translate mockups into pixel-perfect interfaces",
        "Maintained and updated existing client websites",
        "Participated in code reviews and team collaboration sessions",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor's Degree in Computer Science",
      school: "University Name",
      period: "2017 - 2021",
      location: "Seoul, South Korea",
    },
  ];

  const skills = {
    Frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML/CSS",
      "Tailwind CSS",
    ],
    Backend: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    "Tools & Others": ["Git", "Docker", "Figma", "VS Code", "Vercel", "AWS"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kiwon Kim
            </h1>
            <p className="text-xl text-gray-600 mb-6">Frontend Developer</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-1">
                <MapPinIcon size={16} />
                <span>Seoul, South Korea</span>
              </div>
              <div className="flex items-center gap-1">
                <MailIcon size={16} />
                <span>kwk627@naver.com</span>
              </div>
              <div className="flex items-center gap-1">
                <PhoneIcon size={16} />
                <span>+82 10-0000-0000</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon size={18} />
                Download Resume
              </motion.a>
              <motion.a
                href="https://github.com/milliwonkim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLinkIcon size={18} />
                View GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-12">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Professional Summary
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Passionate Frontend Developer with 3+ years of experience
                creating modern, responsive web applications. Specialized in
                React ecosystem with strong expertise in TypeScript, Next.js,
                and modern CSS frameworks. Committed to writing clean,
                maintainable code and delivering exceptional user experiences.
              </p>
            </motion.div>

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Work Experience
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CalendarIcon size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-lg text-blue-600 font-medium">
                        {exp.company}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPinIcon size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-gray-600 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <CalendarIcon size={14} />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg text-green-600 font-medium">
                        {edu.school}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPinIcon size={14} />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Technical Skills
              </h2>
              <div className="grid gap-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Projects Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Interested in My Work?
              </h2>
              <p className="text-blue-100 mb-6">
                Check out my portfolio to see detailed examples of my projects
                and technical expertise.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <ExternalLinkIcon size={18} />
                View My Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
