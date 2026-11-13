import React from 'react';
import { BrandLogo } from './BrandLogo';
import { NAV_SECTIONS } from '../data/siteContent';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15V9l5.2 3-5.2 3Z" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      className="border-t border-white/[0.08] bg-[#07080B]"
      style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Left Side: Quick Section Links & Copyright */}
          <div className="space-y-4">
            <nav aria-label="ქვედა ნავიგაცია" className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_SECTIONS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className="py-1 text-sm text-zinc-400 transition-colors duration-150 hover:text-zinc-100 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} კადენცია. ყველა უფლება დაცულია · თბილისი, საქართველო.
            </p>
          </div>

          {/* Right Side: Brand Logo + Social Media Links */}
          <div className="ml-auto flex flex-col items-end text-right">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              aria-label="დაბრუნება მთავარ გვერდზე"
              className="rounded-md py-1"
            >
              <BrandLogo />
            </a>

            <div
              aria-label="სოციალური ქსელები"
              className="mt-4 flex items-center justify-end gap-2"
            >
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-[#12141A] text-zinc-300 transition-colors duration-150 hover:border-amber-400/60 hover:text-amber-400 active:scale-[0.96]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
