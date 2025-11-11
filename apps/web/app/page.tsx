"use client";

import ContactSection from "@/components/sections/ContactSection";
import CultureSection from "@/components/sections/CultureSection";
import FocusSection from "@/components/sections/FocusSection";
import HeroSection from "@/components/sections/HeroSection";
import NotionBlogSection from "@/components/sections/NotionBlogSection";
import NotionProjectsSection from "@/components/sections/NotionProjectsSection";
import OverviewSection from "@/components/sections/OverviewSection";
import { cultureSignals, focusAreas, heroContent } from "@/constants/portfolio";
import { generateResumePDF } from "@/utils/generateResumePdf";

const HomePage = () => {
  return (
    <>
      <HeroSection hero={heroContent} onDownloadResume={generateResumePDF} />
      <OverviewSection />
      <FocusSection areas={focusAreas} />
      <NotionProjectsSection />
      <NotionBlogSection />
      <CultureSection signals={cultureSignals} />
      <ContactSection
        location={heroContent.location}
        email={heroContent.contactEmail}
        onDownloadResume={generateResumePDF}
      />
    </>
  );
};

export default HomePage;
