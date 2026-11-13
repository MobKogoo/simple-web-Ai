/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { BlogVideoPage } from './components/BlogVideoPage';
import { GalleryPage } from './components/GalleryPage';
import { PagePagination } from './components/PagePagination';
import { Footer } from './components/Footer';
import { NAV_SECTIONS, SERVICES, ServiceItem } from './data/siteContent';

export default function App() {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(() => {
    if (window.location.hash === '#page-3') return 3;
    if (window.location.hash === '#page-2') return 2;
    return 1;
  });
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES[0]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#page-3') {
        setCurrentPage(3);
      } else if (window.location.hash === '#page-2') {
        setCurrentPage(2);
      } else if (window.location.hash === '#page-1' || window.location.hash === '') {
        setCurrentPage(1);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPage !== 1) return;

    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const handleSelectPage = useCallback((page: 1 | 2 | 3) => {
    setCurrentPage(page);
    if (page === 3) {
      window.history.replaceState(null, '', '#page-3');
    } else if (page === 2) {
      window.history.replaceState(null, '', '#page-2');
    } else {
      window.history.replaceState(null, '', '#home');
      setActiveSection('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      setActiveSection(sectionId);
      if (currentPage !== 1) {
        setCurrentPage(1);
        window.history.replaceState(null, '', `#${sectionId}`);
        requestAnimationFrame(() => {
          setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 50);
        });
        return;
      }

      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [currentPage]
  );

  const handleSelectService = useCallback(
    (service: ServiceItem) => {
      setSelectedService(service);
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0A0B0E] text-[#F4F4F5]">
      <Navbar
        activeSection={activeSection}
        currentPage={currentPage}
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
        onCloseDrawer={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
        onSelectPage={handleSelectPage}
      />

      <main className="flex-1">
        {currentPage === 1 ? (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onOpenPageTwo={() => handleSelectPage(2)}
              onOpenPageThree={() => handleSelectPage(3)}
            />
            <ServicesSection
              selectedServiceId={selectedService.id}
              onSelectService={handleSelectService}
            />
            <AboutSection />
            <ContactSection selectedServiceTitle={selectedService.title} />
          </>
        ) : currentPage === 2 ? (
          <BlogVideoPage onBackToMain={() => handleSelectPage(1)} />
        ) : (
          <GalleryPage onSelectPage={handleSelectPage} />
        )}

        <PagePagination
          currentPage={currentPage}
          onSelectPage={handleSelectPage}
        />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
