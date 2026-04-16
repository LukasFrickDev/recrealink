import { useState } from "react";
import { LandingHeader } from "@/modules/institutional/components/LandingHeader";
import { HeroSection } from "@/modules/institutional/components/HeroSection";
import { AudienceSelectorSection } from "@/modules/institutional/components/AudienceSelectorSection";
import { PersonalizedCTASection } from "@/modules/institutional/components/PersonalizedCTASection";
import { FeaturesSection } from "@/modules/institutional/components/FeaturesSection";
import { HowItWorksSection } from "@/modules/institutional/components/HowItWorksSection";
import { BrazilCoverageSection } from "@/modules/institutional/components/BrazilCoverageSection";
import { DashboardPreviewSection } from "@/modules/institutional/components/DashboardPreviewSection";
import { TestimonialsSection } from "@/modules/institutional/components/TestimonialsSection";
import { FinalCTASection } from "@/modules/institutional/components/FinalCTASection";
import { LandingFooter } from "@/modules/institutional/components/LandingFooter";
import {
  audienceOptions,
  brazilCoverage,
  dashboardPreview,
  featuresByAudience,
  finalStats,
  footerColumns,
  heroData,
  howItWorks,
  navLinks,
  personalizedCta,
  testimonials,
  type AudienceKey,
} from "@/modules/institutional/mocks/home";
import * as S from "./styles";

export const HomePage = () => {
  const [selectedAudience, setSelectedAudience] = useState<AudienceKey | null>(null);

  return (
    <S.Page>
      <LandingHeader links={navLinks} />
      <S.Main>
        <HeroSection content={heroData} />
        <AudienceSelectorSection
          options={audienceOptions}
          selectedAudience={selectedAudience}
          onSelect={setSelectedAudience}
        />
        <PersonalizedCTASection selectedAudience={selectedAudience} content={personalizedCta} />
        <FeaturesSection selectedAudience={selectedAudience} content={featuresByAudience} />
        <HowItWorksSection steps={howItWorks} />
        <BrazilCoverageSection content={brazilCoverage} />
        <DashboardPreviewSection content={dashboardPreview} />
        <TestimonialsSection content={testimonials} />
        <FinalCTASection stats={finalStats} />
      </S.Main>
      <LandingFooter columns={footerColumns} />
    </S.Page>
  );
};
