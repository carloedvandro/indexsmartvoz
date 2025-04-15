
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
    document.title = "SmartVoz - Sua plataforma completa de networking";
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <ParticlesBackground style="stars" />
      
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
