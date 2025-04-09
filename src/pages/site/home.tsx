
import React, { useEffect } from 'react';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteHero } from '@/components/site/SiteHero';
import { SiteFeatures } from '@/components/site/SiteFeatures';
import { SitePlans } from '@/components/site/SitePlans';
import { SiteTestimonials } from '@/components/site/SiteTestimonials';
import { SiteContact } from '@/components/site/SiteContact';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function SiteHome() {
  // Add the dark class to the html element on component mount
  useEffect(() => {
    // Enable dark mode by default
    document.documentElement.classList.add('dark');
    
    // Clean up function to remove the class when component unmounts
    return () => {
      // document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SiteHeader />
      <main>
        <SiteHero />
        <SiteFeatures />
        <SitePlans />
        <SiteTestimonials />
        <SiteContact />
      </main>
      <SiteFooter />
    </div>
  );
}
