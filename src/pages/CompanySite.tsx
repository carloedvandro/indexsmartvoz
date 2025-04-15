
import { useEffect } from 'react';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';
import { useActiveSection } from '@/components/company-site/useActiveSection';
import { Header } from '@/components/company-site/Header';
import { HeroSection } from '@/components/company-site/HeroSection';
import { FeaturesSection } from '@/components/company-site/FeaturesSection';
import { ProductsSection } from '@/components/company-site/ProductsSection';
import { AboutSection } from '@/components/company-site/AboutSection';
import { ContactSection } from '@/components/company-site/ContactSection';
import { Footer } from '@/components/company-site/Footer';

export default function CompanySite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  useEffect(() => {
    // Set document title
    document.title = "PlayTec - Sua solução em jogos e entretenimento";
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <ParticlesBackground style="stars" />
      
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
