import { useEffect, useState } from 'react';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Heart,
  MapPin,
  Menu as MenuIcon,
  ParkingSquare,
  PhoneCall,
  Play,
  Star,
  Utensils,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import './index.css';

const queryClient = new QueryClient();

const menuData = {
  "Most loved": [
    { name: 'Club 24 Special Thali', note: 'A generous plate for the whole mood', price: '₹320', feature: true },
    { name: 'Masala Dosa', note: 'Crisp-edged, soft-centred, proper comfort', price: '₹180' },
    { name: 'Paneer Butter Masala', note: 'Silky gravy, charred paneer, warm spices', price: '₹240' },
    { name: 'Kesar Peda', note: 'A little saffron sweetness after the meal', price: '₹160' },
  ],
  'From the tawa': [
    { name: 'Masala Dosa', note: 'Crisp-edged, soft-centred, proper comfort', price: '₹180' },
    { name: 'Plain Dosa', note: 'Golden, thin, with sambar on the side', price: '₹140' },
    { name: 'Chole Bhature', note: 'Big flavours, made for a hungry table', price: '₹210' },
    { name: 'Idli Sambar', note: 'Soft, warm, and exactly right', price: '₹130' },
  ],
  'Sweet counter': [
    { name: 'Sonpapdi / Sonpatisha', note: 'Feathery layers, a Club 24 favourite', price: '₹120' },
    { name: 'Kesar Peda', note: 'Milk, saffron, and a fragrant finish', price: '₹160' },
    { name: 'Jalebi', note: 'Glossy, hot, and worth the napkin', price: '₹110' },
    { name: 'Motichoor Laddoo', note: 'Tender, festive, never too much', price: '₹140' },
  ],
};

type MenuCategory = keyof typeof menuData;

const reviews = [
  {
    quote: 'The kind of place you recommend without thinking twice. The thali is generous, the sweets are fresh, and the pricing feels wonderfully fair.',
    name: 'A regular at the table',
    detail: 'On the thali & value',
  },
  {
    quote: 'Came for dosa, left with Sonpapdi and a plan to return. Warm hospitality makes this feel like a neighbourhood secret everyone already knows.',
    name: 'A hungry traveller',
    detail: 'On dosa & sweets',
  },
  {
    quote: 'Parking nearby, food coming quickly, and an owner who notices his guests. Club 24 does the simple things with a lot of heart.',
    name: 'A family evening',
    detail: 'On welcome & ease',
  },
];

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`mono-label text-[10px] font-medium ${light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>
      {children}
    </p>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`focus-ring inline-flex items-center gap-3 ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--foreground))]'}`} data-testid="link-logo">
      <span className={`relative flex h-10 w-10 items-center justify-center rounded-full border ${light ? 'border-[hsl(var(--accent)/.6)]' : 'border-[hsl(var(--primary)/.55)]'}`}>
        <span className={`display-font text-[18px] font-semibold ${light ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>24</span>
        <span className={`absolute -bottom-1 h-1.5 w-1.5 rounded-full ${light ? 'bg-[hsl(var(--accent))]' : 'bg-[hsl(var(--primary))]'}`} />
      </span>
      <span className="leading-none">
        <span className="block text-[15px] font-bold tracking-[.19em]">CLUB 24</span>
        <span className={`mt-1 block text-[10px] tracking-[.08em] ${light ? 'text-[hsl(var(--background)/.67)]' : 'text-[hsl(var(--foreground)/.57)]'}`}>क्लब 24 रेस्टोरेंट</span>
      </span>
    </a>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Most loved');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    document.title = 'Club 24 Restaurant — Good food, properly local';
    const description = 'Club 24 Restaurant — a beloved neighbourhood Indian restaurant and sweets destination with generous food, warm service, and all-day energy.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  const goTo = (anchor: string) => {
    setMobileOpen(false);
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextReview = () => setReviewIndex((current) => (current + 1) % reviews.length);
  const previousReview = () => setReviewIndex((current) => (current - 1 + reviews.length) % reviews.length);

  return (
    <main id="top" className="min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]">
      <div className="relative z-50 bg-[hsl(var(--secondary))] px-5 py-2 text-center text-[11px] font-medium tracking-[.08em] text-[hsl(var(--background)/.8)]">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
        OPEN TODAY · SERVING THROUGH 11 PM
      </div>

      <header className="absolute left-0 right-0 top-9 z-40">
        <div className="section-wrap flex items-center justify-between py-5">
          <Logo light />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {[
              ['The feeling', '#story'],
              ['What to eat', '#menu'],
              ['What people say', '#reviews'],
              ['Plan a visit', '#visit'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="focus-ring text-[12px] font-semibold text-[hsl(var(--background)/.8)] transition-colors hover:text-[hsl(var(--accent))]" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </a>
            ))}
          </nav>
          <button
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--background)/.25)] text-[hsl(var(--background))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="mx-4 rounded-2xl border border-[hsl(var(--background)/.16)] bg-[hsl(var(--secondary)/.97)] p-3 shadow-2xl md:hidden" aria-label="Mobile navigation">
            {[
              ['The feeling', '#story'],
              ['What to eat', '#menu'],
              ['What people say', '#reviews'],
              ['Plan a visit', '#visit'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="focus-ring block rounded-xl px-4 py-3 text-sm text-[hsl(var(--background)/.83)] hover:bg-[hsl(var(--background)/.08)] hover:text-[hsl(var(--accent))]" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="grain relative min-h-[720px] overflow-hidden bg-[hsl(var(--secondary))] text-[hsl(var(--background))] sm:min-h-[780px]">
        <div className="absolute -right-36 top-28 h-[520px] w-[520px] rounded-full border border-[hsl(var(--accent)/.18)] sm:right-[-110px] sm:top-24 sm:h-[700px] sm:w-[700px]" />
        <div className="absolute right-[-100px] top-40 h-[440px] w-[440px] rounded-full border border-[hsl(var(--accent)/.13)] sm:right-[-70px] sm:top-32 sm:h-[600px] sm:w-[600px]" />
        <div className="section-wrap relative flex min-h-[720px] items-end pb-14 pt-36 sm:min-h-[780px] sm:pb-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[.92fr_1.08fr]">
            <div className="rise-in max-w-[620px]">
              <SectionLabel light>THE LOCAL TABLE · ALL DAY, EVERY DAY</SectionLabel>
              <h1 className="display-font mt-6 text-[clamp(3.7rem,9vw,8.2rem)] font-medium leading-[.87] tracking-[-.055em] text-[hsl(var(--background))]">
                Come hungry.<br />
                <span className="text-[hsl(var(--accent))]">Leave glowing.</span>
              </h1>
              <p className="mt-7 max-w-[430px] text-[16px] leading-7 text-[hsl(var(--background)/.7)] sm:text-[18px]">
                A generous Indian kitchen and sweet counter for family dinners, quick dosas, and the “let’s get one more” crowd.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#menu" className="focus-ring inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--secondary))] transition-transform hover:-translate-y-0.5" data-testid="link-hero-menu">
                  See what’s cooking <ArrowDownRight size={17} />
                </a>
                <a href="#visit" className="focus-ring inline-flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.3)] px-5 py-3.5 text-sm font-semibold text-[hsl(var(--background))] transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]" data-testid="link-hero-visit">
                  Plan a visit
                </a>
              </div>
              <div className="mt-11 flex items-center gap-7 border-t border-[hsl(var(--background)/.16)] pt-5">
                <div>
                  <div className="flex items-center gap-1 text-[hsl(var(--accent))]"><Star size={14} fill="currentColor" /><span className="text-[15px] font-bold text-[hsl(var(--background))]">4.4</span></div>
                  <p className="mt-1 text-[11px] text-[hsl(var(--background)/.5)]">383 reviews</p>
                </div>
                <div className="h-8 w-px bg-[hsl(var(--background)/.16)]" />
                <div>
                  <p className="text-[15px] font-bold text-[hsl(var(--background))]">₹200–800</p>
                  <p className="mt-1 text-[11px] text-[hsl(var(--background)/.5)]">per person</p>
                </div>
                <div className="h-8 w-px bg-[hsl(var(--background)/.16)]" />
                <div>
                  <p className="text-[15px] font-bold text-[hsl(var(--background))]">Till 11</p>
                  <p className="mt-1 text-[11px] text-[hsl(var(--background)/.5)]">open tonight</p>
                </div>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[530px] lg:ml-auto">
              <div className="absolute -left-5 top-9 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-center text-[11px] font-bold leading-[1.25] text-[hsl(var(--secondary))] shadow-lg sm:-left-8 sm:h-28 sm:w-28">
                <span>GOOD<br />FOOD<br />GOOD<br />PEOPLE</span>
              </div>
              <div className="float-soft relative aspect-[.89] overflow-hidden rounded-[46%_46%_18%_18%] border-[10px] border-[hsl(var(--background)/.12)] shadow-2xl">
                <img src="/club24-thali.jpg" alt="A generous Club 24 Special Thali" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary)/.5)] via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-3 rounded-2xl border border-[hsl(var(--background)/.18)] bg-[hsl(var(--secondary)/.82)] px-4 py-3 backdrop-blur-sm sm:-right-7">
                <p className="mono-label text-[9px] text-[hsl(var(--accent))]">TRY THIS FIRST</p>
                <p className="mt-1 text-sm font-semibold text-[hsl(var(--background))]">Club 24 Special Thali</p>
              </div>
            </div>
          </div>
        </div>
        <a href="#story" className="focus-ring absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-medium tracking-[.18em] text-[hsl(var(--background)/.48)] sm:flex" data-testid="link-scroll-story">
          SCROLL TO THE TABLE <span className="h-8 w-px bg-[hsl(var(--background)/.3)]" />
        </a>
      </section>

      <div className="overflow-hidden border-b border-t border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--accent))] py-3">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, repeat) => (
            <div key={repeat} className="flex items-center gap-10 text-[11px] font-bold tracking-[.15em] text-[hsl(var(--secondary))]">
              <span>THALI FIRST</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>DOSA OF THE DAY</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>SWEETS FOR THE ROAD</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>WARM SERVICE</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
              <span>OPEN TILL 11 PM</span><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
            </div>
          ))}
        </div>
      </div>

      <section id="story" className="relative scroll-mt-10 bg-[hsl(var(--background))] py-24 sm:py-36">
        <div className="section-wrap grid gap-16 lg:grid-cols-[.88fr_1.12fr] lg:gap-24">
          <div className="relative">
            <div className="sticky top-10">
              <SectionLabel>THE FEELING</SectionLabel>
              <h2 className="display-font mt-5 max-w-[440px] text-[clamp(2.8rem,5vw,5.3rem)] leading-[.94] tracking-[-.045em]">
                Some places<br /><em className="text-[hsl(var(--primary))]">feed you.</em><br />This one keeps you.
              </h2>
              <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">
                Club 24 is the reliable answer when everyone wants something different. A table that moves at its own lively pace — breakfast cravings, a full thali, something sweet for the ride home.
              </p>
              <div className="mt-9 flex items-center gap-3 text-sm font-bold text-[hsl(var(--primary))]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--primary)/.35)]"><Heart size={16} /></span>
                Made for regulars, first-timers, and the people they bring.
              </div>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative min-h-[285px] overflow-hidden rounded-[26px] bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--background))] sm:mt-12">
              <span className="absolute -right-5 -top-8 display-font text-[160px] leading-none text-[hsl(var(--accent)/.18)]">01</span>
              <Utensils className="relative text-[hsl(var(--accent))]" size={25} strokeWidth={1.5} />
              <h3 className="display-font relative mt-20 text-3xl">Generous by default.</h3>
              <p className="relative mt-3 text-sm leading-6 text-[hsl(var(--background)/.65)]">Proper portions, familiar flavours, and a menu that makes room for the whole group.</p>
            </div>
            <div className="relative min-h-[285px] overflow-hidden rounded-[26px] border border-[hsl(var(--foreground)/.13)] bg-[hsl(var(--card))] p-7 sm:mt-[-10px]">
              <span className="absolute -right-5 -top-8 display-font text-[160px] leading-none text-[hsl(var(--primary)/.09)]">02</span>
              <Clock3 className="relative text-[hsl(var(--primary))]" size={25} strokeWidth={1.5} />
              <h3 className="display-font relative mt-20 text-3xl">All-day rhythm.</h3>
              <p className="relative mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Come early, come late, come back for sweets. The lights stay warm till 11 pm.</p>
            </div>
            <div className="relative min-h-[285px] overflow-hidden rounded-[26px] border border-[hsl(var(--foreground)/.13)] bg-[hsl(var(--accent))] p-7 sm:col-span-2 sm:ml-12">
              <span className="absolute -right-2 -top-10 display-font text-[170px] leading-none text-[hsl(var(--secondary)/.1)]">03</span>
              <div className="relative flex max-w-[600px] flex-col justify-between gap-8 sm:flex-row">
                <div>
                  <Compass className="text-[hsl(var(--secondary))]" size={25} strokeWidth={1.5} />
                  <h3 className="display-font mt-20 text-3xl text-[hsl(var(--secondary))]">Local enough to trust.</h3>
                </div>
                <p className="max-w-[260px] self-end text-sm leading-6 text-[hsl(var(--secondary)/.7)]">The kind of recommendation that comes with directions, a parking tip, and “you have to try the peda.”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="scroll-mt-8 bg-[hsl(var(--secondary))] py-24 text-[hsl(var(--background))] sm:py-32">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <SectionLabel light>THE SHORTLIST</SectionLabel>
              <h2 className="display-font mt-5 max-w-[560px] text-[clamp(2.8rem,5vw,5.6rem)] leading-[.9] tracking-[-.05em]">Start here.<br /><span className="text-[hsl(var(--accent))]">Stay awhile.</span></h2>
            </div>
            <p className="max-w-[310px] text-sm leading-6 text-[hsl(var(--background)/.58)]">Our menu moves with the day. These are the things regulars put in the middle of the table.</p>
          </div>
          <div className="mt-14 flex flex-wrap gap-2 border-b border-[hsl(var(--background)/.15)] pb-3">
            {(Object.keys(menuData) as MenuCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`focus-ring rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${activeCategory === category ? 'bg-[hsl(var(--accent))] text-[hsl(var(--secondary))]' : 'text-[hsl(var(--background)/.57)] hover:bg-[hsl(var(--background)/.08)] hover:text-[hsl(var(--background))]'}`}
                data-testid={`button-menu-${category.toLowerCase().replaceAll(' ', '-')}`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-x-20 lg:grid-cols-[1fr_.75fr]">
            <div>
              {menuData[activeCategory].map((item, index) => (
                <div key={item.name} className={`group flex items-start justify-between gap-5 border-b border-[hsl(var(--background)/.13)] py-6 ${index === 0 ? 'pt-8' : ''}`} data-testid={`menu-item-${item.name.toLowerCase().replaceAll(' ', '-')}`}>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[17px] font-semibold">{item.name}</h3>
                      {'feature' in item && item.feature && <span className="rounded-full bg-[hsl(var(--primary))] px-2 py-1 text-[9px] font-bold tracking-[.12em] text-[hsl(var(--background))]">HOUSE PICK</span>}
                    </div>
                    <p className="mt-1.5 text-sm text-[hsl(var(--background)/.52)]">{item.note}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm text-[hsl(var(--accent))]">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="relative mt-10 hidden overflow-hidden rounded-[28px] lg:mt-8 lg:block">
              <img src="/club24-sweets.jpg" alt="Indian sweets arranged at the Club 24 counter" className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--secondary)/.85)] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="mono-label text-[9px] text-[hsl(var(--accent))]">DON'T SKIP THE EXIT</p>
                <p className="display-font mt-2 text-3xl">Take a little<br />sweetness home.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[hsl(var(--background)/.13)] pt-6">
            <span className="text-sm text-[hsl(var(--background)/.56)]">Prices are a guide — ask the team what is fresh today.</span>
            <span className="hidden h-px w-16 bg-[hsl(var(--accent)/.5)] sm:block" />
            <span className="text-sm font-semibold text-[hsl(var(--accent))]">Vegetarian-friendly favourites</span>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(var(--accent))] py-5">
        <div className="section-wrap flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm font-bold text-[hsl(var(--secondary))]">The sweet counter is right next door.</p>
          <p className="text-sm text-[hsl(var(--secondary)/.7)]">Look for Shristi Misthan Bhandaar — then leave with something wrapped.</p>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-8 bg-[hsl(var(--background))] py-24 sm:py-32">
        <div className="section-wrap grid gap-14 lg:grid-cols-[.68fr_1.32fr] lg:items-center">
          <div>
            <SectionLabel>THE WORD ON THE STREET</SectionLabel>
            <h2 className="display-font mt-5 max-w-[390px] text-[clamp(2.8rem,5vw,5.3rem)] leading-[.93] tracking-[-.05em]">People come back<br /><span className="text-[hsl(var(--primary))]">for a reason.</span></h2>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex gap-1 text-[hsl(var(--accent-foreground))]">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={17} fill="currentColor" className="text-[hsl(var(--accent))]" />)}
              </div>
              <span className="text-sm font-bold">4.4 from 383 reviews</span>
            </div>
          </div>
          <div className="relative rounded-[28px] bg-[hsl(var(--card))] p-7 shadow-[var(--shadow-md)] sm:p-12">
            <span className="display-font absolute right-7 top-3 text-[110px] leading-none text-[hsl(var(--primary)/.1)]">“</span>
            <div className="relative min-h-[220px]">
              <p className="display-font max-w-[720px] text-[clamp(1.8rem,3.2vw,3.15rem)] leading-[1.08] tracking-[-.035em]">“{reviews[reviewIndex].quote}”</p>
              <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[hsl(var(--foreground)/.13)] pt-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-sm font-bold">{reviews[reviewIndex].name}</p>
                  <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{reviews[reviewIndex].detail}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={previousReview} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--foreground)/.18)] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]" aria-label="Previous review" data-testid="button-previous-review"><ArrowLeft size={16} /></button>
                  <span className="px-2 font-mono text-[11px] text-[hsl(var(--muted-foreground))]">{String(reviewIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
                  <button onClick={nextReview} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--foreground)/.18)] transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]" aria-label="Next review" data-testid="button-next-review"><ArrowRight size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--background))]">
        <div className="absolute -right-16 top-[-110px] h-[300px] w-[300px] rounded-full border border-[hsl(var(--background)/.18)] sm:h-[500px] sm:w-[500px]" />
        <div className="section-wrap relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_.7fr]">
          <div>
            <SectionLabel light>A SMALL RITUAL</SectionLabel>
            <h2 className="display-font mt-5 max-w-[680px] text-[clamp(2.7rem,5.3vw,5.8rem)] leading-[.9] tracking-[-.05em]">Order the thali.<br />Add the sweet.<br /><span className="text-[hsl(var(--accent))]">Trust the room.</span></h2>
          </div>
          <div className="relative">
            <div className="absolute -left-2 -top-2 h-24 w-24 rounded-full border border-dashed border-[hsl(var(--accent)/.6)] sm:-left-8 sm:-top-8 sm:h-36 sm:w-36" />
            <p className="relative max-w-[360px] text-[16px] leading-7 text-[hsl(var(--background)/.74)]">There is no dress code, no secret handshake, and no wrong way to spend an evening here. Just arrive with an appetite.</p>
            <a href="#visit" className="focus-ring relative mt-8 inline-flex items-center gap-3 text-sm font-bold text-[hsl(var(--accent))] transition-transform hover:translate-x-1" data-testid="link-ritual-visit">
              Plan the easy kind of evening <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section id="visit" className="scroll-mt-8 bg-[hsl(var(--background))] py-24 sm:py-32">
        <div className="section-wrap">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <SectionLabel>PLAN YOUR VISIT</SectionLabel>
              <h2 className="display-font mt-5 max-w-[430px] text-[clamp(2.8rem,5vw,5.2rem)] leading-[.92] tracking-[-.05em]">Make room<br />for a good<br /><span className="text-[hsl(var(--primary))]">kind of busy.</span></h2>
              <p className="mt-6 max-w-[350px] text-[15px] leading-7 text-[hsl(var(--muted-foreground))]">Save this page, bring your people, and use the details below to time it just right.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-[hsl(var(--secondary))] p-7 text-[hsl(var(--background))] sm:col-span-2 sm:flex sm:items-end sm:justify-between">
                <div>
                  <Clock3 className="text-[hsl(var(--accent))]" size={25} strokeWidth={1.5} />
                  <p className="mono-label mt-8 text-[9px] text-[hsl(var(--accent))]">TODAY & EVERY DAY</p>
                  <h3 className="display-font mt-2 text-4xl">Open till 11 pm.</h3>
                </div>
                <p className="mt-5 max-w-[230px] text-sm leading-6 text-[hsl(var(--background)/.58)] sm:mb-1 sm:mt-0">The exact sweet spot for an early family dinner or a late plate and a slow conversation.</p>
              </div>
              <div className="rounded-[24px] border border-[hsl(var(--foreground)/.13)] p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent)/.22)] text-[hsl(var(--primary))]"><MapPin size={19} /></span>
                <h3 className="mt-7 text-lg font-bold">Find the table</h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Bharthana Road, Bakewar, Etawah, Uttar Pradesh, 206124.</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a href="https://maps.app.goo.gl/eoStbyHXYwTJVEc49" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:underline" data-testid="link-open-maps">Open directions <Compass size={14} /></a>
                  <button onClick={() => setGalleryOpen(true)} className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))] hover:underline" data-testid="button-open-gallery">See the place <Play size={14} fill="currentColor" /></button>
                </div>
              </div>
              <div className="rounded-[24px] border border-[hsl(var(--foreground)/.13)] p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent)/.22)] text-[hsl(var(--primary))]"><ParkingSquare size={19} /></span>
                <h3 className="mt-7 text-lg font-bold">Arrive easy</h3>
                <p className="mt-2 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Visitors mention parking nearby. Leave a little time to settle in.</p>
                <p className="mt-5 text-sm font-bold text-[hsl(var(--primary))]">₹200–800 per person</p>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-[hsl(var(--foreground)/.13)] pt-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--background))]"><PhoneCall size={15} /></span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">For today’s specials or a quick question, call <a href="tel:07830493213" className="font-bold text-[hsl(var(--primary))] hover:underline">07830 493213</a>.</span>
            </div>
            <span className="mono-label text-right text-[9px] text-[hsl(var(--primary))]">WALK-INS WELCOME<br />BAKEWAR · ETAWAH</span>
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(var(--secondary))] py-12 text-[hsl(var(--background))] sm:py-16">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-10 border-b border-[hsl(var(--background)/.15)] pb-12 sm:flex-row">
            <div>
              <Logo light />
              <p className="mt-6 max-w-[270px] text-sm leading-6 text-[hsl(var(--background)/.56)]">A warm table, a full plate, and something sweet for later.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm">
              <a href="#story" className="focus-ring text-[hsl(var(--background)/.65)] hover:text-[hsl(var(--accent))]" data-testid="link-footer-story">The feeling</a>
              <a href="#menu" className="focus-ring text-[hsl(var(--background)/.65)] hover:text-[hsl(var(--accent))]" data-testid="link-footer-menu">What to eat</a>
              <a href="#reviews" className="focus-ring text-[hsl(var(--background)/.65)] hover:text-[hsl(var(--accent))]" data-testid="link-footer-reviews">Reviews</a>
              <a href="#visit" className="focus-ring text-[hsl(var(--background)/.65)] hover:text-[hsl(var(--accent))]" data-testid="link-footer-visit">Plan a visit</a>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-6 text-[11px] text-[hsl(var(--background)/.38)] sm:flex-row">
            <p>CLUB 24 · क्लब 24 रेस्टोरेंट</p>
            <p>Made for hungry people and the people who bring them.</p>
          </div>
        </div>
      </footer>

      {galleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(var(--secondary)/.8)] p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Club 24 gallery">
          <div className="relative w-full max-w-[760px] overflow-hidden rounded-[26px] bg-[hsl(var(--card))] shadow-2xl">
            <button onClick={() => setGalleryOpen(false)} className="focus-ring absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--secondary)/.85)] text-[hsl(var(--background))]" aria-label="Close gallery" data-testid="button-close-gallery"><X size={18} /></button>
            <div className="grid sm:grid-cols-[1.2fr_.8fr]">
              <img src="/club24-sweets.jpg" alt="Sweets at the Club 24 counter" className="h-[280px] w-full object-cover sm:h-[390px]" />
              <div className="p-7 sm:p-9">
                <SectionLabel>LOOK FOR THE LIGHTS</SectionLabel>
                <h3 className="display-font mt-4 text-4xl leading-none">A table is waiting.</h3>
                <p className="mt-5 text-sm leading-6 text-[hsl(var(--muted-foreground))]">Club 24 sits beside Shristi Misthan Bhandaar — an easy landmark for a meal, a sweet stop, or both.</p>
                <div className="mt-8 flex items-start gap-3 text-sm font-semibold"><Check className="mt-0.5 text-[hsl(var(--primary))]" size={17} /> Walk-ins welcome</div>
                <div className="mt-3 flex items-start gap-3 text-sm font-semibold"><Check className="mt-0.5 text-[hsl(var(--primary))]" size={17} /> Open till 11 pm</div>
                <button onClick={() => { setGalleryOpen(false); goTo('#menu'); }} className="focus-ring mt-8 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-bold text-[hsl(var(--background))]" data-testid="button-gallery-menu">Browse the shortlist <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;