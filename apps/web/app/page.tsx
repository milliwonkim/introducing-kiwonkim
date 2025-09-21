"use client";

import HeroSection from "@/components/sections/HeroSection";
import FocusSection from "@/components/sections/FocusSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CultureSection from "@/components/sections/CultureSection";
import ContactSection from "@/components/sections/ContactSection";
import NotionProjectsSection from "@/components/sections/NotionProjectsSection";
import NotionBlogSection from "@/components/sections/NotionBlogSection";
import OverviewSection from "@/components/sections/OverviewSection";
import {
  heroContent,
  impactMetrics,
  focusAreas,
  caseStudies,
  expertisePillars,
  cultureSignals,
} from "@/constants/portfolio";
import { generateResumePDF } from "@/utils/generateResumePdf";

const HomePage = () => {
  return (
    <>
      <HeroSection
        hero={heroContent}
        metrics={impactMetrics}
        onDownloadResume={generateResumePDF}
      />
      <OverviewSection />
      <FocusSection areas={focusAreas} />
      <CaseStudiesSection studies={caseStudies} />
      <NotionProjectsSection />
      <ExpertiseSection pillars={expertisePillars} />
      <NotionBlogSection />
      <CultureSection signals={cultureSignals} />
      <ContactSection
        availability={heroContent.availability}
        location={heroContent.location}
        email={heroContent.contactEmail}
        onDownloadResume={generateResumePDF}
      />
    </>
  );
};

export default HomePage;
