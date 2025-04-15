
import { useEffect } from 'react';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';
import { useActiveSection } from '@/components/company-site/useActiveSection';
import { Header } from '@/components/company-site/Header';
import { HeroSection } from '@/components/company-site/HeroSection';
import { FeaturesSection } from '@/components/company-site/FeaturesSection';
import { ServicesSection } from '@/components/company-site/ServicesSection';
import { AboutSection } from '@/components/company-site/AboutSection';
import { ContactSection } from '@/components/company-site/ContactSection';
import { Footer } from '@/components/company-site/Footer';

export default function CompanySite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  useEffect(() => {
    // Set document title
    document.title = "PlayTec - Sua operadora digital de telefonia móvel";
  }, []);
  
  return (
    <div className="min-h-screen bg-[#050118]">
      <ParticlesBackground style="network" />
      
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
