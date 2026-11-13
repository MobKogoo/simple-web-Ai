import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, ShoppingBag, Check, X } from 'lucide-react';
import lawCourtImg from '../assets/images/gallery_law_court_1794569251251.jpg';
import lawBooksImg from '../assets/images/gallery_law_books_1794569251320.jpg';
import biolithicFacadeImg from '../assets/images/gallery_biolithic_facade_1794569251037.jpg';
import biolithicMaterialImg from '../assets/images/gallery_biolithic_material_1794569251778.jpg';
import managementBoardroomImg from '../assets/images/gallery_management_boardroom_1794569251930.jpg';
import managementWorkflowImg from '../assets/images/gallery_management_workflow_1794569252453.jpg';
import welderPromoImg from '../assets/images/welder_shop_promo_1794572177360.jpg';

interface GalleryPageProps {
  onSelectPage: (page: 1 | 2 | 3) => void;
}

type GalleryCategory = 'ყველა' | 'Law' | 'Biolithic' | 'Management';

interface GalleryItem {
  id: string;
  number: string;
  category: Exclude<GalleryCategory, 'ყველა'>;
  categoryKa: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'law-1',
    number: '01.',
    category: 'Law',
    categoryKa: 'Law · სამართალი',
    title: 'იურიდიული ბიბლიოთეკა და მართლმსაჯულების სასწორი',
    caption:
      'კლასიკური სამართლებრივი არქივი, მუქი ხის თაროები და სამართლიანობის სიმბოლო მშვიდ სამუშაო გარემოში.',
    src: lawCourtImg,
    alt: 'იურიდიული ბიბლიოთეკა და მართლმსაჯულების სასწორი',
  },
  {
    id: 'law-2',
    number: '02.',
    category: 'Law',
    categoryKa: 'Law · სამართალი',
    title: 'სასამართლო ჩაქუჩი და სამართლებრივი დოკუმენტაცია',
    caption:
      'კანონმდებლობისა და სამართლებრივი პრაქტიკის სიმბოლიკა — მუქი მუხის მაგიდაზე განთავსებული ჩაქუჩი და ხელნაწერი კოდექსი.',
    src: lawBooksImg,
    alt: 'სასამართლო ჩაქუჩი და იურიდიული წიგნი მუქ ფონზე',
  },
  {
    id: 'biolithic-1',
    number: '03.',
    category: 'Biolithic',
    categoryKa: 'Biolithic · ბიოლითი',
    title: 'ბიოლითური არქიტექტურული ფასადი',
    caption:
      'მონოლითური ბაზალტის ქვისა და ცოცხალი მცენარეული საფარის შერწყმა თანამედროვე მდგრად არქიტექტურაში.',
    src: biolithicFacadeImg,
    alt: 'ბიოლითური შენობის ფასადი ქვისა და ვერტიკალური გამწვანებით',
  },
  {
    id: 'biolithic-2',
    number: '04.',
    category: 'Biolithic',
    categoryKa: 'Biolithic · ბიოლითი',
    title: 'ბიოლითური მინერალური და ორგანული სტრუქტურა',
    caption:
      'ვულკანური ფოროვანი ქვისა და ბუნებრივი ხავსის ორგანული ტექსტურა ბიოლითური ეკოსისტემიდან.',
    src: biolithicMaterialImg,
    alt: 'ბიოლითური ვულკანური ქვა და მწვანე ხავსის მაკრო სტრუქტურა',
  },
  {
    id: 'management-1',
    number: '05.',
    category: 'Management',
    categoryKa: 'Management · მენეჯმენტი',
    title: 'აღმასრულებელი მენეჯმენტის სტრატეგიული სხდომა',
    caption:
      'გუნდის მართვისა და ბიზნეს-გადაწყვეტილებების მიღების თანამედროვე საკონფერენციო სივრცე.',
    src: managementBoardroomImg,
    alt: 'აღმასრულებელი მენეჯმენტის გუნდი საკონფერენციო დარბაზში',
  },
  {
    id: 'management-2',
    number: '06.',
    category: 'Management',
    categoryKa: 'Management · მენეჯმენტი',
    title: 'პროექტების მენეჯმენტი და ანალიტიკური დაგეგმვა',
    caption:
      'ოპერაციული გეგმების, ვადებისა და რესურსების კოორდინაცია ორგანიზაციული მართვის პროცესში.',
    src: managementWorkflowImg,
    alt: 'პროექტების მენეჯმენტისა და დაგეგმვის სამუშაო პროცესი ეკრანზე',
  },
];

const CATEGORIES: { key: GalleryCategory; label: string }[] = [
  { key: 'ყველა', label: 'ყველა (6)' },
  { key: 'Law', label: 'Law · სამართალი' },
  { key: 'Biolithic', label: 'Biolithic · ბიოლითი' },
  { key: 'Management', label: 'Management · მენეჯმენტი' },
];

const WELDER_ITEMS = [
  { name: 'ავტომატური დამცავი ნიღაბი (DIN 9–13)', price: '185 ₾' },
  { name: 'თერმომდგრადი ტყავის ხელთათმანები', price: '48 ₾' },
  { name: 'ინვერტორული შედუღების აპარატი 250A', price: '540 ₾' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onSelectPage }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ყველა');
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [showWelderCatalog, setShowWelderCatalog] = useState<boolean>(false);
  const [orderedWelderItem, setOrderedWelderItem] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ყველა') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const lightboxIndex = useMemo(() => {
    if (!lightboxId) return -1;
    return filteredItems.findIndex((item) => item.id === lightboxId);
  }, [filteredItems, lightboxId]);

  const activeLightboxItem =
    lightboxIndex >= 0 ? filteredItems[lightboxIndex] : null;

  useEffect(() => {
    if (!activeLightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxId(null);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (lightboxIndex + 1) % filteredItems.length;
        setLightboxId(filteredItems[nextIdx].id);
      } else if (e.key === 'ArrowLeft') {
        const prevIdx =
          (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
        setLightboxId(filteredItems[prevIdx].id);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLightboxItem, lightboxIndex, filteredItems]);

  return (
    <div className="bg-[#0A0B0E]">
      <div className="py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page 3 Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <span className="font-mono tabular-nums">გვერდი 3</span>
              <span aria-hidden="true">·</span>
              <span>Law · Biolithic · Management</span>
            </div>
            <h1
              className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F4F4F5]"
              style={{ textWrap: 'balance' }}
            >
              თემატური ფოტო გალერეა
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-400">
              სამი მიმართულების კურატორული ვიზუალური კოლექცია — სამართალი (Law),
              ბიოლითური არქიტექტურა (Biolithic) და მენეჯმენტი (Management).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onSelectPage(1)}
              className="btn inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#12141A] px-4 py-2 text-sm font-medium text-zinc-100 hover:border-amber-400/60 hover:text-white whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4 text-amber-400" aria-hidden="true" />
              <span>1 · მთავარი</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectPage(2)}
              className="btn inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#12141A] px-4 py-2 text-sm font-medium text-zinc-100 hover:border-amber-400/60 hover:text-white whitespace-nowrap shrink-0"
            >
              <span className="font-mono tabular-nums text-amber-400">2</span>
              <span>ბლოგი და ვიდეო</span>
            </button>
          </div>
        </div>

        {/* Interactive Category Filter Buttons */}
        <div
          role="tablist"
          aria-label="გალერეის თემატური ფილტრი"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {CATEGORIES.map((category) => {
            const isSelected = activeCategory === category.key;
            return (
              <button
                key={category.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCategory(category.key)}
                className={`min-h-[44px] rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 font-semibold'
                    : 'border border-white/10 bg-[#12141A] text-zinc-300 hover:border-white/25 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Bootstrap 3-Column Compact Gallery Grid */}
        <div className="row g-3 mt-4">
          {filteredItems.map((item) => {
            const hasFailed = Boolean(failedImages[item.id]);
            return (
              <div key={item.id} className="col-12 col-sm-6 col-md-4">
                <article className="card group h-full overflow-hidden rounded-xl border border-white/10 bg-[#12141A] transition-colors hover:border-amber-400/45">
                  <button
                    type="button"
                    onClick={() => setLightboxId(item.id)}
                    aria-label={`${item.title} — გადიდებული ნახვა`}
                    className="relative block w-full overflow-hidden bg-[#0E1015] text-left focus-visible:outline-none"
                  >
                    {!hasFailed ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                        }
                        className="h-36 sm:h-40 md:h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-36 sm:h-40 md:h-44 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#161922] to-[#0A0B0E] p-4 text-center">
                        <ImageIcon className="h-6 w-6 text-amber-400" aria-hidden="true" />
                        <span className="text-xs text-zinc-300">{item.categoryKa}</span>
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/75 via-transparent to-transparent opacity-80"
                    />

                    <span className="absolute right-2.5 bottom-2.5 inline-flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border border-white/15 bg-[#0A0B0E]/80 text-zinc-200 backdrop-blur-sm transition-colors group-hover:border-amber-400/60 group-hover:text-amber-300">
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </button>

                  <div className="card-body flex flex-col justify-between p-4">
                    <div>
                      <div className="flex items-baseline gap-2 text-xs text-zinc-400">
                        <span className="font-mono tabular-nums text-amber-400">
                          {item.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.categoryKa}</span>
                      </div>

                      <h2 className="mt-2 text-sm sm:text-base font-semibold leading-snug text-[#F4F4F5]">
                        {item.title}
                      </h2>

                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      {/* Clean White Lower Section with Small Welder Advertisement */}
      <section
        aria-label="შემდუღებლების სარეკლამო განყოფილება"
        className="border-t border-zinc-200 bg-white py-10 sm:py-12 text-zinc-900"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-zinc-200 bg-[#F9FAFB] shadow-sm">
            <div className="grid grid-cols-1 items-stretch sm:grid-cols-12">
              {/* Compact Product Image */}
              <div className="sm:col-span-5 bg-zinc-100">
                {!failedImages['welder-promo'] ? (
                  <img
                    src={welderPromoImg}
                    alt="შემდუღებლის დამცავი ნიღაბი, ტყავის ხელთათმანები და ელექტროდის დამჭერი"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, 'welder-promo': true }))
                    }
                    className="h-44 sm:h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 sm:h-full w-full flex-col items-center justify-center gap-2 bg-zinc-100 p-6 text-center">
                    <ShoppingBag className="h-7 w-7 text-amber-600" aria-hidden="true" />
                    <span className="text-xs font-medium text-zinc-700">
                      shoping for Welders
                    </span>
                  </div>
                )}
              </div>

              {/* Advertisement Copy & Interactive Catalog Trigger */}
              <div className="sm:col-span-7 flex flex-col justify-between p-5 sm:p-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-amber-700">
                    <span>რეკლამა შემდუღებლებისთვის</span>
                    <span aria-hidden="true">·</span>
                    <span>სპეციალური შეთავაზება</span>
                  </div>

                  <h2 className="mt-2 font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                    shoping for Welders
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    შედუღების აპარატები, ავტომატური დაბნელების ნიღბები,
                    თერმომდგრადი ხელთათმანები და ელექტროდები პროფესიონალი
                    შემდუღებლებისთვის — ხარისხის გარანტიით.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4">
                  <span className="text-xs text-zinc-500">
                    TIG · MIG · MMA აღჭურვილობა
                  </span>

                  <button
                    type="button"
                    onClick={() => setShowWelderCatalog((prev) => !prev)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0"
                  >
                    <ShoppingBag className="h-4 w-4 text-amber-400" aria-hidden="true" />
                    <span>
                      {showWelderCatalog ? 'კატალოგის დამალვა' : 'კატალოგის ნახვა'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable Compact Welder Catalog inside White Section */}
            {showWelderCatalog && (
              <div className="border-t border-zinc-200 bg-white px-5 py-4 sm:px-7">
                <div className="divide-y divide-zinc-200">
                  {WELDER_ITEMS.map((product) => {
                    const isOrdered = orderedWelderItem === product.name;
                    return (
                      <div
                        key={product.name}
                        className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-1 last:pb-1"
                      >
                        <div className="text-sm font-medium text-zinc-800">
                          {product.name}
                        </div>
                        <div className="flex items-center gap-3 ml-auto">
                          <span className="font-mono text-sm font-semibold tabular-nums text-zinc-950">
                            {product.price}
                          </span>
                          <button
                            type="button"
                            onClick={() => setOrderedWelderItem(product.name)}
                            className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                              isOrdered
                                ? 'bg-emerald-600 text-white'
                                : 'border border-zinc-300 bg-zinc-50 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-100'
                            }`}
                          >
                            {isOrdered ? (
                              <>
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>დაჯავშნილია</span>
                              </>
                            ) : (
                              <span>შეკვეთა</span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Enlarged Image Preview */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          onClick={() => setLightboxId(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/15 bg-[#12141A]"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <div className="text-xs text-amber-400">
                  {activeLightboxItem.number} {activeLightboxItem.categoryKa}
                </div>
                <div className="truncate text-sm sm:text-base font-semibold text-[#F4F4F5]">
                  {activeLightboxItem.title}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxId(null)}
                aria-label="სურათის დახურვა"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-[#181B23] px-3 text-xs font-medium text-zinc-100 hover:border-amber-400/60 hover:text-white shrink-0"
              >
                <X className="h-4 w-4 text-amber-400" aria-hidden="true" />
                <span className="hidden sm:inline">დახურვა</span>
              </button>
            </div>

            {/* Image View */}
            <div className="relative bg-black">
              <img
                src={activeLightboxItem.src}
                alt={activeLightboxItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[65dvh] w-full object-contain"
              />
            </div>

            {/* Caption & Prev/Next Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] px-4 py-3 sm:px-6">
              <p className="max-w-xl text-xs sm:text-sm text-zinc-300 mb-0">
                {activeLightboxItem.caption}
              </p>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    const prevIdx =
                      (lightboxIndex - 1 + filteredItems.length) %
                      filteredItems.length;
                    setLightboxId(filteredItems[prevIdx].id);
                  }}
                  aria-label="წინა სურათი"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#181B23] text-zinc-200 hover:border-amber-400/60 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="font-mono text-xs tabular-nums text-zinc-400 px-1">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (lightboxIndex + 1) % filteredItems.length;
                    setLightboxId(filteredItems[nextIdx].id);
                  }}
                  aria-label="შემდეგი სურათი"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/15 bg-[#181B23] text-zinc-200 hover:border-amber-400/60 hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
