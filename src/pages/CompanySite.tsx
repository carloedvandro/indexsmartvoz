
import { useEffect } from 'react';
import { useActiveSection } from '@/components/company-site/useActiveSection';
import { Header } from '@/components/company-site/Header';
import { HeroSection } from '@/components/company-site/HeroSection';
import { TransformSection } from '@/components/company-site/TransformSection';
import { FeaturesSection } from '@/components/company-site/FeaturesSection';
import { ServicesSection } from '@/components/company-site/ServicesSection';
import { AboutSection } from '@/components/company-site/AboutSection';
import { ContactSection } from '@/components/company-site/ContactSection';
import { Footer } from '@/components/company-site/Footer';

export default function CompanySite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  useEffect(() => {
    // Set document title
    document.title = "SmartVoz - Sua operadora digital de telefonia móvel";
  }, []);
  
  return (
    <div className="min-h-screen bg-[#020721]">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection />
      <TransformSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
