
import { useEffect } from 'react';
import { useActiveSection } from '@/components/company-site/useActiveSection';
import { Header } from '@/components/company-site/Header';
import { HeroSection } from '@/components/company-site/HeroSection';
import { FeaturesSection } from '@/components/company-site/FeaturesSection';
import { ServicesSection } from '@/components/company-site/ServicesSection';
import { StatsSection } from '@/components/company-site/StatsSection';
import { TestimonialsSection } from '@/components/company-site/TestimonialsSection';
import { SupportSection } from '@/components/company-site/SupportSection';
import { ContactSection } from '@/components/company-site/ContactSection';
import { ClosingSection } from '@/components/company-site/ClosingSection';
import { Footer } from '@/components/company-site/Footer';

export default function CompanySite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  useEffect(() => {
    // Set document title
    document.title = "PlayTec - Seu parceiro de confiança no mercado móvel";
  }, []);
  
  return (
    <div className="min-h-screen bg-[#020017] text-white font-sans">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#ff1d8e]">
            Crie e Transforme sua Operadora com a Parceria PlayTec
          </h2>
        </div>
      </div>
      <FeaturesSection />
      <ServicesSection />
      <StatsSection />
      <SupportSection />
      <TestimonialsSection />
      <ContactSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}
