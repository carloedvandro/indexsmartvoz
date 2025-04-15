
import { useEffect } from 'react';
import { useActiveSection } from '@/components/company-site/useActiveSection';
import { Header } from '@/components/company-site/Header';
import { HeroSection } from '@/components/company-site/HeroSection';
import { AboutSection } from '@/components/company-site/AboutSection';
import { TestimonialsSection } from '@/components/company-site/TestimonialsSection';
import { ContactSection } from '@/components/company-site/ContactSection';
import { ClosingSection } from '@/components/company-site/ClosingSection';
import { Footer } from '@/components/company-site/Footer';

export default function CompanySite() {
  const { activeSection, scrollToSection } = useActiveSection();
  
  useEffect(() => {
    // Set document title
    document.title = "SmartVoz - Sua operadora de telefonia móvel virtual";
    
    // Adicionar classe ao body para prevenir scroll horizontal
    document.body.classList.add('overflow-x-hidden');
    
    return () => {
      document.body.classList.remove('overflow-x-hidden');
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <ClosingSection />
      <Footer />
      
      {/* Botão de WhatsApp fixo */}
      <a 
        href="#" 
        className="fixed right-6 bottom-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50 transition-transform hover:scale-110"
        aria-label="Contato via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </div>
  );
}
