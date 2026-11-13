export interface NavSectionItem {
  id: string;
  number: string;
  label: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  deliverable: string;
  timeline: string;
  featured?: boolean;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: 'home',
    number: '01',
    label: 'მთავარი გვერდი',
    description: 'სტუდიის ხედვა და მთავარი მიმართულებები',
  },
  {
    id: 'services',
    number: '02',
    label: 'სერვისები',
    description: 'ვებგვერდები, მობილური ადაპტაცია და დიზაინი',
  },
  {
    id: 'about',
    number: '03',
    label: 'ჩვენს შესახებ',
    description: 'გუნდი, გამოცდილება და მუშაობის სტანდარტი',
  },
  {
    id: 'contact',
    number: '04',
    label: 'საკონტაქტო ინფორმაცია',
    description: 'მისამართი, ტელეფონი და შეტყობინების ფორმა',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'mobile-adaptation',
    number: '01.',
    title: 'მობილური ადაპტაცია iPhone და Android მოწყობილობებისთვის',
    summary:
      'ინტერფეისის ზუსტი მორგება როგორც iOS Safari-ის (Dynamic Island და Safe Area), ისე Android Chrome ბრაუზერების სტანდარტებზე — სწრაფი შეხების ზონებით და გლუვი ნავიგაციით.',
    deliverable: 'iOS და Android თავსებადობა · მინიმუმ 44px ღილაკები',
    timeline: '7–14 სამუშაო დღე',
    featured: true,
  },
  {
    id: 'dark-ui-design',
    number: '02.',
    title: 'მუქი თემის UI/UX დიზაინი',
    summary:
      'მაღალი კონტრასტის მქონე მუქი ინტერფეისები, რომლებიც ამცირებს თვალის დაღლილობას და ინარჩუნებს ტექსტის მკაფიო კითხვადობას ნებისმიერ განათებაზე.',
    deliverable: 'WCAG AA კონტრასტი · ტიპოგრაფიული სისტემა',
    timeline: '5–10 სამუშაო დღე',
  },
  {
    id: 'html-css-architecture',
    number: '03.',
    title: 'სუფთა HTML და CSS არქიტექტურა',
    summary:
      'სემანტიკური კოდი, მოქნილი Grid და Flexbox განლაგება და ოპტიმიზებული რესურსები, რაც უზრუნველყოფს მყისიერ ჩატვირთვას მობილურ ინტერნეტზეც.',
    deliverable: 'სემანტიკური მარკაპი · 0.8 წმ-მდე ჩატვირთვა',
    timeline: '10–18 სამუშაო დღე',
  },
  {
    id: 'technical-support',
    number: '04.',
    title: 'ტექნიკური მხარდაჭერა და ოპტიმიზაცია',
    summary:
      'ვებგვერდის მუდმივი განახლება, სიჩქარის მონიტორინგი, უსაფრთხოების შემოწმება და საძიებო სისტემებისთვის (SEO) ტექნიკური გამართვა.',
    deliverable: 'ყოველთვიური აუდიტი · პრიორიტეტული რეაგირება',
    timeline: 'მუდმივი თანამშრომლობა',
  },
];

export const STUDIO_METRICS = [
  {
    value: '45+',
    label: 'განხორციელებული პროექტი',
    detail: '2022–2026 წლებში',
  },
  {
    value: '99.9%',
    label: 'ბრაუზერული სტაბილურობა',
    detail: 'iPhone და Android ეკრანებზე',
  },
  {
    value: '+140%',
    label: 'მობილური ჩართულობის ზრდა',
    detail: 'რედიზაინის პირველ 6 თვეში',
  },
];

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  likes: number;
  isUserCreated?: boolean;
}

export interface BlogPost {
  id: string;
  number: string;
  category: 'მობილური ადაპტაცია' | 'მუქი დიზაინი' | 'JavaScript';
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  readTime: string;
  initialComments: BlogComment[];
}

export interface YouTubeVideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  duration: string;
  description: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ios-android-safe-area',
    number: '01.',
    category: 'მობილური ადაპტაცია',
    title: 'როგორ მოვარგოთ ვებგვერდი iPhone-ის Dynamic Island-სა და Android ეკრანებს',
    excerpt:
      'Safe Area ცვლადების, 100dvh სიმაღლისა და 44px შეხების ზონების პრაქტიკული გამოყენება მობილურ ბრაუზერებში.',
    content: [
      'თანამედროვე სმარტფონებზე — იქნება ეს iPhone Safari თუ Android Chrome — ეკრანის ზედა და ქვედა ნაწილებში ხშირად გვხვდება კამერის კუნძულები და ჟესტების პანელები. viewport-fit=cover მეტა-თეგი და CSS env(safe-area-inset-*) ფუნქციები საშუალებას გვაძლევს თავიდან ავიცილოთ ინტერფეისის გადაფარვა.',
      'არანაკლებ მნიშვნელოვანია 100dvh ერთეულის გამოყენება 100vh-ის ნაცვლად, რადგან მობილური ბრაუზერის მისამართების ზოლი სქროლის დროს ზომას იცვლის. სწორი ბადე და მინიმუმ 44×44px ღილაკები უზრუნველყოფს უშეცდომო შეხებას ცალი ხელით ნავიგაციისას.',
    ],
    publishedAt: '12 ნოემბერი, 2026',
    readTime: '4 წთ საკითხავი',
    initialComments: [
      {
        id: 'c-101',
        author: 'ნიკა კაპანაძე',
        text: 'env(safe-area-inset-bottom) ჩემს iPhone 15-ზე ზუსტად მოაგვარა ქვედა მენიუს გადაფარვის პრობლემა.',
        createdAt: '12 ნოემბერი · 14:20',
        likes: 5,
      },
      {
        id: 'c-102',
        author: 'მარიამ ლომიძე',
        text: 'Android Chrome-შიც 100dvh ბევრად სტაბილურად მუშაობს, ვიდრე ძველი 100vh.',
        createdAt: '12 ნოემბერი · 17:05',
        likes: 3,
      },
    ],
  },
  {
    id: 'dark-theme-typography',
    number: '02.',
    category: 'მუქი დიზაინი',
    title: 'მუქი თემის კონტრასტი და ქართული ტიპოგრაფიის კითხვადობა',
    excerpt:
      'რატომ არის #0A0B0E ზედაპირი და ზომიერი ასოებს შორის დაშორება უკეთესი სუფთა შავ ფონზე.',
    content: [
      'აბსოლუტურად შავ (#000000) ფონზე თეთრი ტექსტი ხშირად ქმნის ვიზუალურ ბზინვარებას OLED ეკრანებზე. ღრმა ობსიდიანის ტონალობა (#0A0B0E) და რბილი ღია ნაცრისფერი ტექსტი (#F4F4F5) ინარჩუნებს WCAG AA კონტრასტს და ამცირებს თვალის დაძაბვას.',
      'ქართული მხედრული შრიფტისთვის აუცილებელია სწორი line-height (1.55–1.7) და Noto Sans Georgian-ის გამოყენება, რაც განსაკუთრებით კარგად იკითხება მცირე მობილურ ეკრანებზე.',
    ],
    publishedAt: '08 ნოემბერი, 2026',
    readTime: '3 წთ საკითხავი',
    initialComments: [
      {
        id: 'c-201',
        author: 'ლევან ბერიძე',
        text: 'მუქ თემაზე კონტრასტის დაბალანსება მართლაც გადამწყვეტია გრძელი სტატიების კითხვისას.',
        createdAt: '09 ნოემბერი · 11:40',
        likes: 4,
      },
    ],
  },
  {
    id: 'bootstrap-js-components',
    number: '03.',
    category: 'JavaScript',
    title: 'Bootstrap 5 ბადე და JavaScript ინტერაქტიულობა მსუბუქ საიტებზე',
    excerpt:
      'როგორ გავაერთიანოთ Bootstrap-ის კომპონენტები და თანამედროვე JavaScript სუფთა არქიტექტურაში.',
    content: [
      'Bootstrap 5.3 გვთავაზობს ჩაშენებულ მუქ თემას (data-bs-theme="dark"), რესპონსიულ 12-სვეტიან ბადესა და ratio-16x9 კონტეინერებს ვიდეო ჩანართებისთვის. ეს საგრძნობლად ამარტივებს ბლოგისა და მედია ბლოკების აწყობას.',
      'JavaScript-ის დახმარებით შეგვიძლია დავამატოთ მყისიერი კატეგორიის ფილტრაცია, localStorage-ში შენახული კომენტარები და YouTube ბმულების დინამიური ჩატვირთვა გვერდის გადატვირთვის გარეშე.',
    ],
    publishedAt: '02 ნოემბერი, 2026',
    readTime: '5 წთ საკითხავი',
    initialComments: [
      {
        id: 'c-301',
        author: 'თამარ ჯანელიძე',
        text: 'Bootstrap-ის data-bs-theme="dark" და ratio-16x9 ძალიან მოსახერხებელია ვიდეოების ჩასასმელად.',
        createdAt: '03 ნოემბერი · 19:15',
        likes: 2,
      },
    ],
  },
];

export const YOUTUBE_VIDEOS: YouTubeVideoItem[] = [
  {
    id: 'yt-1',
    youtubeId: 'UB1O30fR-EE',
    title: 'HTML და CSS საფუძვლები — სუფთა სტრუქტურა და ადაპტირება',
    channel: 'Traversy Media',
    duration: '1:00:41',
    description:
      'პრაქტიკული ვიდეო-გაკვეთილი სემანტიკური HTML5 მარკაპისა და თანამედროვე CSS განლაგების შესახებ.',
  },
  {
    id: 'yt-2',
    youtubeId: 'PkZNo7MFNFg',
    title: 'JavaScript-ის სრული კურსი და DOM ინტერაქცია',
    channel: 'freeCodeCamp.org',
    duration: '3:26:42',
    description:
      'მონაცემთა დამუშავება, მოვლენების მართვა და ინტერაქტიული ინტერფეისების შექმნა JavaScript-ზე.',
  },
  {
    id: 'yt-3',
    youtubeId: '4sosXZsdy-s',
    title: 'Bootstrap 5 რესპონსიული დიზაინი და ბადის სისტემა',
    channel: 'Traversy Media',
    duration: '1:15:20',
    description:
      'როგორ ავაწყოთ სწრაფად ადაპტირებული გვერდები Bootstrap 5-ის ბადისა და კომპონენტების გამოყენებით.',
  },
];
