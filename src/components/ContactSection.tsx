import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import { SERVICES } from '../data/siteContent';

interface ContactSectionProps {
  selectedServiceTitle: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedServiceTitle,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState(selectedServiceTitle || SERVICES[0].title);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceTitle) {
      setService(selectedServiceTitle);
    }
  }, [selectedServiceTitle]);

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setError('გთხოვთ მიუთითოთ თქვენი სახელი (მინიმუმ 2 სიმბოლო).');
      return;
    }

    const isValidEmailOrPhone =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact) ||
      /^[+\d\s()-]{6,}$/.test(trimmedContact);

    if (!isValidEmailOrPhone) {
      setError('გთხოვთ შეიყვანოთ ვალიდური ელ-ფოსტა ან ტელეფონის ნომერი.');
      return;
    }

    if (trimmedMessage.length < 10) {
      setError('გთხოვთ მოკლედ აღწეროთ თქვენი მოთხოვნა (მინიმუმ 10 სიმბოლო).');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setMessage('');
    setError(null);
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="bg-[#0A0B0E] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Direct Contact Information */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm font-medium text-amber-400">
              04. საკონტაქტო ინფორმაცია
            </p>
            <h2
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F5]"
              style={{ textWrap: 'balance' }}
            >
              დაგვიკავშირდით პროექტის დასაწყებად
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-400">
              მოგვწერეთ ან დაგვირეკეთ სამუშაო საათებში. გიპასუხებთ იმავე დღეს და
              შემოგთავაზებთ ტექნიკურ გეგმას.
            </p>

            <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {/* Phone */}
              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-400">ტელეფონი</div>
                    <a
                      href="tel:+995555248090"
                      className="mt-0.5 block font-mono text-sm sm:text-base tabular-nums text-zinc-100 hover:text-amber-400"
                    >
                      +995 555 24 80 90
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', '+995 555 24 80 90')}
                  aria-label="ტელეფონის ნომრის კოპირება"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-[#12141A] px-3 text-xs text-zinc-300 hover:border-white/25 hover:text-white shrink-0"
                >
                  {copiedField === 'phone' ? (
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <div className="text-xs text-zinc-400">ელ-ფოსტა</div>
                    <a
                      href="mailto:hello@kadencia.ge"
                      className="mt-0.5 block text-sm sm:text-base text-zinc-100 hover:text-amber-400 truncate"
                    >
                      hello@kadencia.ge
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email', 'hello@kadencia.ge')}
                  aria-label="ელ-ფოსტის კოპირება"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/10 bg-[#12141A] px-3 text-xs text-zinc-300 hover:border-white/25 hover:text-white shrink-0"
                >
                  {copiedField === 'email' ? (
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 py-4">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs text-zinc-400">მისამართი</div>
                  <div className="mt-0.5 text-sm sm:text-base text-zinc-100">
                    ილია ჭავჭავაძის გამზირი 37, თბილისი 0179
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 py-4">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <div className="text-xs text-zinc-400">სამუშაო საათები</div>
                  <div className="mt-0.5 text-sm sm:text-base text-zinc-100 tabular-nums">
                    ორშაბათი – პარასკევი · 10:00 – 19:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/10 bg-[#12141A] p-6 sm:p-8">
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <Check className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[#F4F4F5]">
                    შეტყობინება წარმატებით გაიგზავნა
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-300">
                    მადლობა, {name}. ჩვენი გუნდი მიიღო თქვენი მოთხოვნა თემაზე
                    „{service}“ და უმოკლეს დროში დაგიკავშირდებათ.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#181B23] px-5 py-2.5 text-sm font-medium text-zinc-100 hover:border-amber-400/50 hover:text-white"
                  >
                    ახალი შეტყობინების გაგზავნა
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        სახელი და გვარი
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="მაგ: გიორგი ბერიძე"
                        autoComplete="name"
                        className="mt-2 w-full min-h-[46px] rounded-lg border border-white/12 bg-[#0A0B0E] px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-channel"
                        className="block text-xs font-medium text-zinc-300"
                      >
                        ელ-ფოსტა ან ტელეფონი
                      </label>
                      <input
                        id="contact-channel"
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="name@company.ge / +995..."
                        autoComplete="email"
                        className="mt-2 w-full min-h-[46px] rounded-lg border border-white/12 bg-[#0A0B0E] px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      სასურველი სერვისი
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="mt-2 w-full min-h-[46px] rounded-lg border border-white/12 bg-[#0A0B0E] px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.number} {item.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-zinc-300"
                    >
                      შეტყობინება
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="აღწერეთ თქვენი პროექტი ან კითხვა..."
                      className="mt-2 w-full rounded-lg border border-white/12 bg-[#0A0B0E] px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs sm:text-sm text-red-300"
                    >
                      {error}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-zinc-400">
                      მონაცემები გამოიყენება მხოლოდ უკუკავშირისთვის.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-amber-400 active:scale-[0.98] whitespace-nowrap shrink-0"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>გაგზავნა</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
