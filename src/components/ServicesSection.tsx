import React, { useState } from 'react';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/siteContent';
import mobileDevicesImg from '../assets/images/service_mobile_devices_1794566975295.jpg';

interface ServicesSectionProps {
  selectedServiceId: string;
  onSelectService: (service: ServiceItem) => void;
}

const MOBILE_DEVICES_IMAGE = mobileDevicesImg;

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceId,
  onSelectService,
}) => {
  const [imgError, setImgError] = useState(false);
  const featuredService = SERVICES[0];
  const secondaryServices = SERVICES.slice(1);

  return (
    <section
      id="services"
      className="border-b border-white/[0.08] bg-[#0A0B0E] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium text-amber-400">
            02. სერვისები
          </p>
          <h2
            className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F5]"
            style={{ textWrap: 'balance' }}
          >
            მობილურ მოწყობილობებზე სრულად მორგებული ციფრული გადაწყვეტილებები
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
            აირჩიეთ თქვენთვის სასურველი მიმართულება — დეტალური კონსულტაციისთვის
            ბარათზე დაჭერა ავტომატურად შეავსებს საკონტაქტო ფორმის თემას.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Marquee Service Card (2 columns wide on desktop) */}
          <article className="lg:col-span-2 overflow-hidden rounded-xl border border-white/10 bg-[#12141A] transition-colors duration-150 hover:border-white/20">
            <div className="grid h-full grid-cols-1 md:grid-cols-12 items-stretch">
              <div className="md:col-span-6 relative min-h-[220px] bg-[#0E1015]">
                {!imgError ? (
                  <img
                    src={MOBILE_DEVICES_IMAGE}
                    alt="iPhone და Android სმარტფონები მუქი ინტერფეისით"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover aspect-[4/3] md:aspect-auto"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#161922] to-[#0A0B0E] p-6 text-center">
                    <Smartphone className="h-7 w-7 text-amber-400" aria-hidden="true" />
                    <span className="text-xs text-zinc-300">
                      iPhone და Android ადაპტაცია
                    </span>
                  </div>
                )}
              </div>

              <div className="md:col-span-6 flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-baseline gap-2.5 text-xs text-zinc-400">
                    <span className="font-mono tabular-nums text-amber-400">
                      {featuredService.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{featuredService.timeline}</span>
                  </div>

                  <h3 className="mt-3 text-lg sm:text-xl font-semibold leading-snug text-[#F4F4F5]">
                    {featuredService.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {featuredService.summary}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-zinc-400">
                    {featuredService.deliverable}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectService(featuredService)}
                    className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                      selectedServiceId === featuredService.id
                        ? 'bg-amber-500 text-zinc-950'
                        : 'border border-white/15 bg-[#181B23] text-zinc-100 hover:border-amber-400/60 hover:text-white'
                    }`}
                  >
                    <span>შეკვეთის დაწყება</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Service 02 */}
          <article className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#12141A] p-6 sm:p-7 transition-colors duration-150 hover:border-white/20">
            <div>
              <div className="flex items-baseline gap-2.5 text-xs text-zinc-400">
                <span className="font-mono tabular-nums text-amber-400">
                  {secondaryServices[0].number}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{secondaryServices[0].timeline}</span>
              </div>

              <h3 className="mt-3 text-lg font-semibold leading-snug text-[#F4F4F5]">
                {secondaryServices[0].title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {secondaryServices[0].summary}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                {secondaryServices[0].deliverable}
              </span>
              <button
                type="button"
                onClick={() => onSelectService(secondaryServices[0])}
                aria-label={`${secondaryServices[0].title} — არჩევა`}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#181B23] text-zinc-200 transition-colors duration-150 hover:border-amber-400/60 hover:text-amber-400 shrink-0"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          {/* Service 03 & 04 spanning cleanly across bottom row */}
          {secondaryServices.slice(1).map((service, idx) => (
            <article
              key={service.id}
              className={`flex flex-col justify-between rounded-xl border border-white/10 bg-[#12141A] p-6 sm:p-7 transition-colors duration-150 hover:border-white/20 ${
                idx === 1 ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div>
                <div className="flex items-baseline gap-2.5 text-xs text-zinc-400">
                  <span className="font-mono tabular-nums text-amber-400">
                    {service.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{service.timeline}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold leading-snug text-[#F4F4F5]">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">
                  {service.summary}
                </p>
              </div>

              <div className="mt-6 border-t border-white/[0.08] pt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-zinc-400">
                  {service.deliverable}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    selectedServiceId === service.id
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'border border-white/15 bg-[#181B23] text-zinc-100 hover:border-amber-400/60 hover:text-white'
                  }`}
                >
                  <span>არჩევა</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
