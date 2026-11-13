import React, { useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { NAV_SECTIONS } from '../data/siteContent';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeSection: string;
  currentPage: 1 | 2 | 3;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
  onCloseDrawer: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectPage: (page: 1 | 2 | 3) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  currentPage,
  isDrawerOpen,
  onToggleDrawer,
  onCloseDrawer,
  onNavigate,
  onSelectPage,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isDrawerOpen) {
        onCloseDrawer();
      }
    };

    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, onCloseDrawer]);

  const handleLinkClick = (sectionId: string) => {
    onNavigate(sectionId);
    onCloseDrawer();
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0A0B0E]/90 backdrop-blur-md"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="rounded-md py-1 focus-visible:outline-none whitespace-nowrap shrink-0"
            aria-label="კადენცია — მთავარი გვერდი"
          >
            <BrandLogo />
          </a>

          {/* Zone 2: 4 Clean Single-Line Navigation Links (Desktop / Tablet) */}
          <nav
            aria-label="მთავარი მენიუ"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
          >
            {NAV_SECTIONS.map((item) => {
              const isActive = currentPage === 1 && activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`relative py-2 transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[1.5px] bg-amber-400 transition-transform duration-150 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Burger Bar Trigger Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onToggleDrawer}
              aria-expanded={isDrawerOpen}
              aria-controls="burger-menu-drawer"
              aria-label="ბურგერ მენიუს გახსნა"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-white/12 bg-[#12141A] px-3 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-amber-400/50 hover:text-white active:scale-[0.97] whitespace-nowrap shrink-0"
            >
              <Menu className="h-5 w-5 text-amber-400" aria-hidden="true" />
              <span className="hidden sm:inline">მენიუ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Burger Bar Backdrop */}
      <div
        aria-hidden={!isDrawerOpen}
        onClick={onCloseDrawer}
        className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity duration-200 ${
          isDrawerOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Burger Bar Drawer with 4 Sections + Explicit Close Button */}
      <aside
        id="burger-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="ნავიგაციის მენიუ"
        className={`fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-sm flex-col justify-between border-l border-white/10 bg-[#0D0F14] transition-transform duration-200 ease-out overflow-y-auto ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        style={{
          paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
          paddingLeft: 'max(1.25rem, env(safe-area-inset-left, 0px))',
          paddingRight: 'max(1.25rem, env(safe-area-inset-right, 0px))',
        }}
      >
        {/* Drawer Header with Brand + Close Button */}
        <div>
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <BrandLogo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onCloseDrawer}
              aria-label="მენიუს დახურვა"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-[#161922] px-3.5 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-amber-400/60 hover:bg-[#1D212D] hover:text-white active:scale-[0.97] whitespace-nowrap shrink-0"
            >
              <X className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>დახურვა</span>
            </button>
          </div>

          {/* 4 Sections inside Burger Bar */}
          <nav aria-label="ბურგერ მენიუს განაყოფები" className="mt-6">
            <p className="mb-3 text-xs font-medium text-zinc-400">
              მენიუს 4 განაყოფი
            </p>
            <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {NAV_SECTIONS.map((section) => {
                const isActive = currentPage === 1 && activeSection === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(section.id);
                      }}
                      className={`group flex min-h-[64px] items-center justify-between gap-4 py-3.5 transition-colors duration-150 ${
                        isActive ? 'text-amber-400' : 'text-zinc-100 hover:text-amber-300'
                      }`}
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="font-mono text-xs tabular-nums text-zinc-500 group-hover:text-amber-400">
                          {section.number}.
                        </span>
                        <div className="min-w-0">
                          <div className="text-base font-semibold leading-snug truncate">
                            {section.label}
                          </div>
                          <div className="mt-0.5 text-xs text-zinc-400 line-clamp-1">
                            {section.description}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-400"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Page 1 / Page 2 / Page 3 Switcher inside Burger Drawer */}
          <div className="mt-6">
            <p className="mb-2.5 text-xs font-medium text-zinc-400">
              საიტის გვერდები
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onSelectPage(1);
                  onCloseDrawer();
                }}
                className={`min-h-[44px] rounded-lg px-3 text-xs font-semibold transition-colors ${
                  currentPage === 1
                    ? 'bg-amber-500 text-zinc-950'
                    : 'border border-white/12 bg-[#161922] text-zinc-200 hover:border-amber-400/50'
                }`}
              >
                1 · მთავარი
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPage(2);
                  onCloseDrawer();
                }}
                className={`min-h-[44px] rounded-lg px-3 text-xs font-semibold transition-colors ${
                  currentPage === 2
                    ? 'bg-amber-500 text-zinc-950'
                    : 'border border-white/12 bg-[#161922] text-zinc-200 hover:border-amber-400/50'
                }`}
              >
                2 · ბლოგი და ვიდეო
              </button>
              <button
                type="button"
                onClick={() => {
                  onSelectPage(3);
                  onCloseDrawer();
                }}
                className={`col-span-2 min-h-[44px] rounded-lg px-3 text-xs font-semibold transition-colors ${
                  currentPage === 3
                    ? 'bg-amber-500 text-zinc-950'
                    : 'border border-white/12 bg-[#161922] text-zinc-200 hover:border-amber-400/50'
                }`}
              >
                3 · გალერეა (Law / Biolithic / Management)
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="mt-6 border-t border-white/[0.08] pt-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>თბილისი · საქართველო</span>
            <a
              href="tel:+995555248090"
              className="font-mono tabular-nums text-zinc-200 hover:text-amber-400 py-2"
            >
              +995 555 24 80 90
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
