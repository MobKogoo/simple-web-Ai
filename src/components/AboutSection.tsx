import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { STUDIO_METRICS } from '../data/siteContent';
import aboutWorkspaceImg from '../assets/images/about_team_workspace_1794566975732.jpg';

const ABOUT_IMAGE = aboutWorkspaceImg;

const STUDIO_PRINCIPLES = [
  {
    number: '01.',
    title: 'მობილური პირველობა (Mobile-First)',
    text: 'ყოველი გვერდი თავდაპირველად იგება 360px–430px სმარტფონის ეკრანისთვის, რათა iPhone და Android მომხმარებლებმა მიიღონ იდეალური კომფორტი.',
  },
  {
    number: '02.',
    title: 'მუქი ინტერფეისის დისციპლინა',
    text: 'ჩვენ ვიყენებთ ბუნებრივ მუქ ტონებს და ზუსტ კონტრასტს, რაც გამორიცხავს თვალის გადაღლას და გამოკვეთს მთავარ შინაარსს.',
  },
  {
    number: '03.',
    title: 'სუფთა კოდი და გამჭვირვალე ვადები',
    text: 'ზედმეტი ბიბლიოთეკების გარეშე დაწერილი სემანტიკური HTML/CSS უზრუნველყოფს სწრაფ მუშაობას და მარტივ შემდგომ განვითარებას.',
  },
];

export const AboutSection: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="border-b border-white/[0.08] bg-[#0C0E13] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left 4:3 Studio Workspace Visual */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl border border-white/10 bg-[#12141A]">
              {!imgError ? (
                <img
                  src={ABOUT_IMAGE}
                  alt="კადენციას დიზაინერებისა და დეველოპერების გუნდი სამუშაო პროცესში"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover aspect-[4/3] lg:aspect-auto"
                />
              ) : (
                <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141720] to-[#0A0B0E] p-8 text-center">
                  <Users className="h-8 w-8 text-amber-400" aria-hidden="true" />
                  <p className="text-sm text-zinc-300">
                    კადენციას საინჟინრო და დიზაინის გუნდი
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0E13]/80 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* Right Narrative & Quantified Metrics */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-amber-400">
                03. ჩვენს შესახებ
              </p>
              <h2
                className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F5]"
                style={{ textWrap: 'balance' }}
              >
                საინჟინრო სიზუსტე და მინიმალისტური დიზაინი 2022 წლიდან
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                კადენცია არის თბილისში დაფუძნებული ციფრული სტუდია, რომელიც
                ფოკუსირებულია მაღალი წარმადობის ვებგვერდებსა და მობილურ
                ადაპტაციაზე. ჩვენ ვქმნით პროდუქტებს, სადაც თითოეული პიქსელი და
                ნავიგაციის ელემენტი ემსახურება მომხმარებლის მარტივ გამოცდილებას.
              </p>
            </div>

            {/* Quantified Metrics Row */}
            <div className="mt-8 grid grid-cols-1 gap-5 border-y border-white/[0.08] py-6 sm:grid-cols-3">
              {STUDIO_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="font-display text-2xl sm:text-3xl font-semibold tabular-nums text-amber-400">
                    {metric.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-zinc-100">
                    {metric.label}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">
                    {metric.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Studio Principles List */}
            <div className="mt-6 divide-y divide-white/[0.07]">
              {STUDIO_PRINCIPLES.map((principle) => (
                <div key={principle.number} className="py-4 first:pt-2 last:pb-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs tabular-nums text-amber-400">
                      {principle.number}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-zinc-400">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
