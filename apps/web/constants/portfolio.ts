export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  currentFocus: string;
  availability: string;
  location: string;
  contactEmail: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  description: string;
}

export interface FocusArea {
  title: string;
  description: string;
  bullets: string[];
}

export interface ExperienceImpact {
  value: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  stack: string[];
  impacts?: ExperienceImpact[];
}

export interface CaseStudy {
  title: string;
  company: string;
  summary: string;
  highlights: string[];
  metrics: ExperienceImpact[];
  stack: string[];
}

export interface ExpertisePillar {
  title: string;
  description: string;
  points: string[];
}

export interface CultureSignal {
  title: string;
  description: string;
}

export const heroContent: HeroContent = {
  badge: "Frontend Lead · Product Partner",
  title: "데이터로 제품 임팩트를 입증하는 프론트엔드 리더",
  description:
    "넥슨, 위메프, 한샘에서 제품 KPI를 직접 책임지며 React/Next.js 기반의 대규모 웹 서비스를 고도화했습니다. 디자인 시스템과 자동화된 테스트 파이프라인을 구축해 팀의 출시 속도와 품질을 동시에 끌어올립니다.",
  currentFocus:
    "현재 넥슨코리아 메이플스토리 운영툴 2.0 전환 프로젝트를 리드하며, 아이템 코드 생성 자동화와 CS 처리 경험을 재설계하고 있습니다.",
  availability: "2024 Q4부터 신규 프로젝트 논의 가능",
  location: "Seoul, Republic of Korea",
  contactEmail: "kwk627@naver.com",
};

export const impactMetrics: ImpactMetric[] = [
  {
    value: "12+",
    label: "엔드투엔드 출시",
    description: "넥슨·위메프·한샘에서 제품 전 과정을 리드",
  },
  {
    value: "30%",
    label: "CS 처리시간 단축",
    description: "운영툴 자동화로 릴리즈 이후 대응 시간 절감",
  },
  {
    value: "90%",
    label: "디자인 시스템 활용률",
    description: "위메프 전사 컴포넌트 사용률을 90%까지 끌어올림",
  },
  {
    value: "4",
    label: "크로스 기능 스쿼드",
    description: "기획·디자인·FE·BE 협업 체계를 구축",
  },
];

export const focusAreas: FocusArea[] = [
  {
    title: "제품 KPI와 연결된 개발",
    description:
      "문제 정의부터 실험 설계, 데이터 검증까지 제품 사이클 전체를 함께 설계합니다.",
    bullets: [
      "AB 테스트 설계와 데이터 분석을 통해 기능별 KPI를 추적",
      "사용자 여정과 비즈니스 목표를 동시에 만족시키는 우선순위 정립",
    ],
  },
  {
    title: "디자인 시스템 & DX 리더십",
    description:
      "팀이 빠르게 합의하고 일관된 경험을 전달할 수 있는 토대를 만들었습니다.",
    bullets: [
      "Storybook 기반 컴포넌트 라이브러리 운영 및 버전 전략 수립",
      "문서화·워크숍을 통한 조직 전반의 컴포넌트 활용률 확대",
    ],
  },
  {
    title: "지속 가능한 품질 확보",
    description:
      "배포 이후에도 신뢰할 수 있는 서비스를 위해 테스트와 모니터링을 자동화합니다.",
    bullets: [
      "Playwright E2E 파이프라인으로 회귀 버그 30% 감소",
      "도메인 지식을 담는 코드 리뷰 가이드와 온보딩 키트 제작",
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "넥슨코리아",
    role: "Frontend Developer · MapleStory",
    period: "2023.10 - 현재",
    location: "서울, 대한민국",
    summary:
      "메이플스토리 운영툴 2.0 전환 프로젝트의 프론트엔드 리드로 참여해 운영 시나리오 생성과 CS 처리 환경을 전면 재구축했습니다.",
    achievements: [
      "React/Vite 기반 운영툴 생성기 플랫폼을 제로베이스로 설계해 운영팀 시나리오 제작 시간을 60% 단축",
      "CS 처리 시스템 UI·UX를 재설계하여 티켓 분류 정확도와 대응 속도를 동시에 개선",
      "Playwright + GitHub Actions 파이프라인으로 릴리즈 후 버그를 30% 감소",
      "Storybook 중심의 컴포넌트 관리 체계를 마련해 신규 화면 구축 속도를 2배 향상",
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Redux",
      "MUI",
      "Tailwind CSS",
      "Playwright",
    ],
    impacts: [
      { value: "60%", label: "운영 시나리오 제작 시간 절감" },
      { value: "30%", label: "릴리즈 후 버그 감소" },
    ],
  },
  {
    company: "한샘",
    role: "Frontend Developer",
    period: "2023.07 - 2023.10",
    location: "서울, 대한민국",
    summary:
      "리모델링 상담 경험을 개선하기 위한 대시보드와 예약 플로우를 Next.js로 재구성하고, 내부 운영 도구를 구축했습니다.",
    achievements: [
      "상담 예약 여정을 단일 페이지 플로우로 통합하여 이탈률을 15% 낮춤",
      "어드민 페이지를 구축해 상담 기록 검색·필터링 속도를 20% 향상",
      "매장 찾기 PC 페이지 리뉴얼로 상담 전환율을 높일 수 있는 UX 제공",
    ],
    stack: ["Next.js", "React", "TypeScript", "AWS"],
    impacts: [
      { value: "15%", label: "예약 플로우 이탈률 감소" },
      { value: "20%", label: "내부 운영 효율 향상" },
    ],
  },
  {
    company: "위메프",
    role: "Frontend Developer",
    period: "2022.06 - 2023.05",
    location: "서울, 대한민국",
    summary:
      "전사 디자인 시스템(WDS)와 운영 도구 전반을 리드하며 컴포넌트 활용률과 개발 효율을 크게 끌어올렸습니다.",
    achievements: [
      "React/Vue2/Vue3를 모두 지원하는 WDS 컴포넌트 라이브러리 설계 및 배포",
      "WDS Admin 백오피스를 구축하여 컴포넌트 사용 현황과 가이드를 한 곳에서 관리",
      "Chrome Extension 기반 사용량 수집 도구로 전사 컴포넌트 활용률 90% 달성",
      "자동화 파이프라인으로 사용률 리포트를 생성해 경영진 의사결정을 지원",
    ],
    stack: [
      "React",
      "Vue2",
      "Vue3",
      "Node.js",
      "TypeScript",
      "Jest",
      "Testing Library",
      "Cypress",
    ],
    impacts: [
      { value: "90%", label: "컴포넌트 활용률" },
      { value: "3x", label: "디자인-개발 핸드오프 속도" },
    ],
  },
  {
    company: "라플레이스 테크놀로지스",
    role: "Frontend Developer",
    period: "2021.03 - 2022.06",
    location: "서울, 대한민국",
    summary:
      "데이터 기반 사업 진단 솔루션의 프론트엔드를 단독으로 구축하고, 다양한 시각화와 인증 프로세스를 설계했습니다.",
    achievements: [
      "React 기반 랜딩·대시보드·문의 흐름을 구축해 제품 초기 MRR 확보에 기여",
      "ECharts/D3.js로 복잡한 지표를 직관적으로 보여주는 시각화 컴포넌트 제작",
      "배포 자동화와 모듈화된 코드 구조로 1인 개발 환경에서도 안정적인 출시 주기를 확보",
    ],
    stack: [
      "React",
      "TypeScript",
      "Styled-components",
      "Jest",
      "Testing Library",
      "ECharts",
      "D3.js",
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "메이플스토리 운영툴 2.0 전환",
    company: "넥슨코리아",
    summary:
      "스프레드시트 중심의 수동 프로세스를 자동화된 웹 플랫폼으로 전환하여 운영팀의 반복 업무를 대폭 줄였습니다.",
    highlights: [
      "아이템 코드 생성 모듈 5종을 설계해 신규 이벤트 론칭 시간을 단축",
      "CS 처리 시나리오를 시각화하고 우선순위 큐를 적용해 대응 품질 향상",
      "테스트·배포 파이프라인을 정비해 야간 장애 대응 빈도를 크게 낮춤",
    ],
    metrics: [
      { value: "60%", label: "운영 시나리오 제작 시간 단축" },
      { value: "30%", label: "CS 처리 리드타임 감소" },
    ],
    stack: ["React", "Vite", "TanStack Query", "Playwright", "Tailwind CSS"],
  },
  {
    title: "위메프 디자인 시스템 & DX 플랫폼",
    company: "위메프",
    summary:
      "세 가지 프레임워크를 아우르는 컴포넌트 시스템과 운영 도구를 구축해 전사 UI 일관성을 확보했습니다.",
    highlights: [
      "React/Vue 컴포넌트를 단일 토큰 시스템으로 통합하여 유지보수 비용 절감",
      "컴포넌트 사용량을 실시간 추적하는 Chrome Extension과 대시보드를 제작",
      "테스트 자동화와 릴리즈 프로세스를 정립해 배포 리드타임을 절반으로 단축",
    ],
    metrics: [
      { value: "90%", label: "전사 활용률" },
      { value: "50%", label: "릴리즈 리드타임 단축" },
    ],
    stack: [
      "React",
      "Vue2",
      "Vue3",
      "Storybook",
      "Node.js",
      "Cypress",
      "Jest",
    ],
  },
  {
    title: "한샘 상담 경험 리디자인",
    company: "한샘",
    summary:
      "상담 예약부터 오프라인 매장 방문까지의 흐름을 재구성해 사용자 경험과 내부 효율을 동시에 개선했습니다.",
    highlights: [
      "Next.js 기반 단일 플로우로 예약 단계를 단축하고 이탈 지점을 제거",
      "어드민 도구에서 상담 메모·알림·필터링을 개선해 현장 대응 시간을 절약",
      "고객 유형별 맞춤 CTA와 추천 콘텐츠로 상담 전환율을 높임",
    ],
    metrics: [
      { value: "15%", label: "예약 이탈률 감소" },
      { value: "20%", label: "상담 준비 시간 절감" },
    ],
    stack: ["Next.js", "TypeScript", "AWS", "Tailwind CSS"],
  },
];

export const expertisePillars: ExpertisePillar[] = [
  {
    title: "프론트엔드 아키텍처",
    description:
      "확장 가능한 설계와 코드 품질 도구로 팀이 장기적으로 유지보수 가능한 기반을 만듭니다.",
    points: [
      "모노레포·패키지 전략으로 공용 모듈과 디자인 토큰 관리",
      "SSR/CSR 혼합 환경에서의 성능 튜닝과 번들 최적화",
      "ESLint, 테스트 커버리지, 코드 리뷰 규칙 자동화를 통한 품질 관리",
    ],
  },
  {
    title: "데이터 기반 제품 의사결정",
    description:
      "정량 지표와 사용자 리서치를 연결해 제품 방향성을 명확히 합니다.",
    points: [
      "대시보드 설계와 이벤트 로깅으로 핵심 퍼널 측정",
      "AB 테스트 실험 설계 및 결과 해석으로 기능 성공 여부 검증",
      "SQL/노코드 분석 툴을 활용한 자율적인 지표 점검",
    ],
  },
  {
    title: "협업과 리더십",
    description:
      "크로스 기능 스쿼드에서 빠르게 합의하고 실행할 수 있는 문화를 만듭니다.",
    points: [
      "디자인·백엔드와의 도메인 워크숍을 주도하여 문제 정의",
      "OKR/로드맵 기반의 분기별 실행 계획 수립",
      "온보딩 핸드북과 코드랩으로 팀 지식 전파",
    ],
  },
  {
    title: "지속 가능한 딜리버리",
    description:
      "배포 이후에도 안심하고 개선할 수 있도록 모니터링과 지원 체계를 설계합니다.",
    points: [
      "Playwright, Jest, Storybook 테스트로 회귀 이슈 예방",
      "CI/CD 파이프라인 자동화와 Feature Flag 전략 운영",
      "장애 대응 플레북과 회고 문화 정착",
    ],
  },
];

export const cultureSignals: CultureSignal[] = [
  {
    title: "문제 정의에 깊게 파고듭니다",
    description:
      "기획 단계부터 참여해 비즈니스 제약과 사용자 페인포인트를 정리한 뒤, 실행 가능한 가설과 지표를 함께 설계합니다.",
  },
  {
    title: "데이터와 스토리로 설득합니다",
    description:
      "숫자와 사용자 스토리를 결합해 의사결정권자가 빠르게 판단할 수 있는 자료를 만듭니다.",
  },
  {
    title: "팀의 성장을 우선합니다",
    description:
      "리뷰, 문서화, 온보딩 세션을 통해 팀 전체가 같은 속도로 성장할 수 있는 기반을 마련합니다.",
  },
  {
    title: "일관된 사용자 경험을 지향합니다",
    description:
      "디자인 시스템과 접근성 가이드라인을 통해 어느 환경에서도 동일한 브랜드 경험을 제공합니다.",
  },
];

export const contactChannels = [
  {
    label: "Email",
    value: heroContent.contactEmail,
    href: `mailto:${heroContent.contactEmail}`,
  },
  {
    label: "GitHub",
    value: "github.com/milliwonkim",
    href: "https://github.com/milliwonkim",
  },
  {
    label: "Blog",
    value: "velog.io/@milliwonkim",
    href: "https://velog.io/@milliwonkim",
  },
];
