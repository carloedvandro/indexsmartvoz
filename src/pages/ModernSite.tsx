
import { Header } from '@/components/modern-site/Header';
import { HeroSection } from '@/components/modern-site/HeroSection';
import { FeaturesSection } from '@/components/modern-site/FeaturesSection';
import { ServicesSection } from '@/components/modern-site/ServicesSection';
import { AboutSection } from '@/components/modern-site/AboutSection';
import { ContactSection } from '@/components/modern-site/ContactSection';
import { Footer } from '@/components/modern-site/Footer';
import { useActiveSection } from '@/components/modern-site/useActiveSection';
import ParticlesBackground from '@/components/client/products/ParticlesBackground';

export default function ModernSite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <ParticlesBackground style="stars" />
      
      <Header 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
