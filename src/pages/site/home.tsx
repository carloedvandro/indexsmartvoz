
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteHero } from '@/components/site/SiteHero';
import { SiteFeatures } from '@/components/site/SiteFeatures';
import { SitePlans } from '@/components/site/SitePlans';
import { SiteTestimonials } from '@/components/site/SiteTestimonials';
import { SiteContact } from '@/components/site/SiteContact';
import { SiteFooter } from '@/components/site/SiteFooter';

export default function SiteHome() {
  return (
    <div className="min-h-screen bg-white">
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
