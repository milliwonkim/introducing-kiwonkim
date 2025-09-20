"use client";

import HeroSection from "@/components/sections/HeroSection";
import FocusSection from "@/components/sections/FocusSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import CultureSection from "@/components/sections/CultureSection";
import ContactSection from "@/components/sections/ContactSection";
import {
  heroContent,
  impactMetrics,
  focusAreas,
  experiences,
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
      <FocusSection areas={focusAreas} />
      <ExperienceSection experiences={experiences} />
      <CaseStudiesSection studies={caseStudies} />
      <ExpertiseSection pillars={expertisePillars} />
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
