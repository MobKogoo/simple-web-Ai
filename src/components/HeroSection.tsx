import React, { useState } from 'react';
import { ArrowDownRight, Layers } from 'lucide-react';
import heroStudioImg from '../assets/images/hero_dark_studio_1794566975689.jpg';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenPageTwo: () => void;
  onOpenPageThree: () => void;
}

const HERO_IMAGE = heroStudioImg;

const PLATFORM_HIGHLIGHTS = [
  {
    label: 'თავსებადობა',
    value: 'iPhone და Android',
  },
  {
    label: 'ინტერფეისი',
    value: 'მუქი თემა · WCAG AA',
  },
  {
    label: 'ჩატვირთვის დრო',
    value: '0.8 წამზე ნაკლები',
  },
  {
    label: 'მხარდაჭერა',
    value: 'სრული ტექნიკური სერვისი',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenPageTwo,
  onOpenPageThree,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative border-b border-white/[0.08] bg-[#0A0B0E] pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Copy Column */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-zinc-400">
                ციფრული სტუდია · თბილისი · მობილური და web sites 
              
              </p>

              <h1
                className="mt-4 font-display font-semibold tracking-tight text-[#F4F4F5] leading-[1.15]"
                style={{
                  fontSize: 'clamp(2.15rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                მუქი თემის ვებგვერდები, შექმნილი iPhone და Android ეკრანებისთვის
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300">
                ჩვენ ვაპროექტებთ სწრაფ, მკაფიო და სრულად ადაპტირებულ HTML და CSS
                საიტებს, რომლებიც თანაბრად კომფორტულად მუშაობს როგორც მობილურ
                სმარტფონებზე, ისე ფართო დესკტოპ მონიტორებზე.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-amber-400 active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <span>სერვისების დათვალიერება</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-white/15 bg-[#12141A] px-5 py-3 text-sm font-medium text-zinc-100 transition-colors duration-150 hover:border-white/30 hover:bg-[#181B23] whitespace-nowrap shrink-0"
              >
                დაგვიკავშირდით
              </a>

              <button
                type="button"
                onClick={onOpenPageTwo}
                aria-label="მეორე გვერდზე გადასვლა — ბლოგი და YouTube ვიდეო"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-amber-400/35 bg-[#12141A] px-4 py-3 text-sm font-semibold text-amber-300 transition-colors duration-150 hover:border-amber-400 hover:bg-[#181B23] hover:text-amber-200 whitespace-nowrap shrink-0"
              >
                <span className="font-mono tabular-nums">2</span>
                <span className="text-xs font-medium text-zinc-300">ბლოგი და ვიდეო</span>
              </button>

              <button
                type="button"
                onClick={onOpenPageThree}
                aria-label="მესამე გვერდზე გადასვლა — სურათების გალერეა"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-amber-400/35 bg-[#12141A] px-4 py-3 text-sm font-semibold text-amber-300 transition-colors duration-150 hover:border-amber-400 hover:bg-[#181B23] hover:text-amber-200 whitespace-nowrap shrink-0"
              >
                <span className="font-mono tabular-nums">3</span>
                <span className="text-xs font-medium text-zinc-300">გალერეა</span>
              </button>
            </div>
          </div>

          {/* Right 16:9 Architectural Studio Visual */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[240px] sm:min-h-[320px] overflow-hidden rounded-xl border border-white/10 bg-[#12141A]">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="კადენციას მუქი არქიტექტურული სტუდიის სამუშაო სივრცე"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-center aspect-video lg:aspect-auto"
                />
              ) : (
                <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#12141A] via-[#171A23] to-[#0A0B0E] p-8 text-center">
                  <Layers className="h-8 w-8 text-amber-400" aria-hidden="true" />
                  <p className="text-sm font-medium text-zinc-200">
                    კადენცია — მუქი არქიტექტურული სტუდია
                  </p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/85 via-[#0A0B0E]/20 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <p className="text-xs sm:text-sm font-medium text-zinc-200">
                  სტუდია თბილისში · HTML5, CSS3 და ადაპტური მობილური არქიტექტურა
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Baseline Strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-4 sm:gap-6">
          {PLATFORM_HIGHLIGHTS.map((item) => (
            <div key={item.label} className="min-w-0">
              <div className="text-xs text-zinc-400">{item.label}</div>
              <div className="mt-1 text-sm sm:text-base font-semibold text-zinc-100 tabular-nums">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
