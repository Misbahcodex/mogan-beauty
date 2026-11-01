import { useState, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Clock3, Mail, MapPin, Menu, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import heroImage from './assets/hero-campaign.jpg';
import productImage from './assets/product-stilllife.jpg';
import ritualImage from './assets/ritual-portrait.jpg';
import ingredientsImage from './assets/ingredients.jpg';
import testimonialImage from './assets/testimonial.jpg';
import studioImage from './assets/studio.jpg';

const queryClient = new QueryClient();

type Product = {
  slug: string;
  name: string;
  type: string;
  price: string;
  description: string;
  details: string[];
  image: string;
  tone: string;
};

const products: Product[] = [
  {
    slug: 'daily-veil',
    name: 'The Daily Veil',
    type: 'Nourishing face oil',
    price: '$54',
    description: 'A weightless blend of meadowfoam, oat lipid, and sage leaf for calm, luminous skin.',
    details: ['30ml / 1 fl oz', 'For all skin types', 'Use morning or evening'],
    image: productImage,
    tone: 'rose',
  },
  {
    slug: 'soft-focus',
    name: 'Soft Focus',
    type: 'Cloud cream cleanser',
    price: '$38',
    description: 'A milky, cushion-soft cleanser that lifts the day away without taking your balance with it.',
    details: ['100ml / 3.4 fl oz', 'For all skin types', 'Use morning and evening'],
    image: ritualImage,
    tone: 'ivory',
  },
  {
    slug: 'quiet-light',
    name: 'Quiet Light',
    type: 'Mineral glow balm',
    price: '$42',
    description: 'A sheer, skin-first balm that catches the light without asking your skin to be anything else.',
    details: ['15g / 0.5 oz', 'Buildable finish', 'Use wherever light finds you'],
    image: ingredientsImage,
    tone: 'sage',
  },
];

const journalEntries = [
  { slug: 'making-space', title: 'On making space', subtitle: 'A softer way into the morning.', image: studioImage, category: 'Practice' },
  { slug: 'language-of-skin', title: 'The language of skin', subtitle: 'What it means to look a little closer.', image: ritualImage, category: 'Skin notes' },
  { slug: 'note-on-enough', title: 'A note on enough', subtitle: 'Less, but better chosen.', image: productImage, category: 'Perspective' },
];

function Header({ onBag, bagCount }: { onBag: () => void; bagCount: number }) {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();
  const links = [
    ['Shop', '/shop'],
    ['Our rituals', '/rituals'],
    ['The journal', '/journal'],
  ];

  return (
    <header className="relative z-30 border-b border-[#3a302c]/15 bg-[#f7f3ed]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-10">
        <button data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="md:hidden" aria-label="Open menu">
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <Link data-testid={`link-${label.toLowerCase().replaceAll(' ', '-')}`} className="text-[11px] tracking-[.1em] text-[#655852] transition-colors hover:text-[#ad7e8a]" href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <Link data-testid="link-home" href="/" className="absolute left-1/2 -translate-x-1/2 text-[27px] tracking-[-.04em] text-[#3a302c] serif">mogan</Link>
        <div className="flex items-center gap-5 text-[#3a302c]">
          <button data-testid="button-search" onClick={() => setLocation('/shop')} className="hidden md:block" aria-label="Search">
            <Search size={18} strokeWidth={1.35} />
          </button>
          <button data-testid="button-bag" onClick={onBag} className="relative flex items-center gap-2 text-[11px] tracking-[.1em]" aria-label="Open shopping bag">
            <ShoppingBag size={18} strokeWidth={1.35} />
            <span className="hidden md:inline">Bag</span>
            {bagCount > 0 && <span className="absolute -right-3 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#bd8d9b] text-[9px] text-[#f7f3ed]">{bagCount}</span>}
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-[72px] border-b border-[#3a302c]/15 bg-[#f7f3ed] px-6 pb-7 pt-2 md:hidden">
          {links.map(([label, href]) => (
            <Link onClick={() => setOpen(false)} data-testid={`mobile-link-${label.toLowerCase().replaceAll(' ', '-')}`} className="block border-t border-[#3a302c]/15 py-4 text-sm tracking-[.08em]" href={href} key={label}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function BagDrawer({ open, onClose, bagCount, onRemove }: { open: boolean; onClose: () => void; bagCount: number; onRemove: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#3a302c]/25" onClick={onClose}>
      <aside onClick={(event) => event.stopPropagation()} className="absolute bottom-0 right-0 top-0 w-full max-w-[420px] bg-[#f7f3ed] p-6 md:p-9">
        <div className="flex items-center justify-between border-b border-[#3a302c]/15 pb-5">
          <span className="serif text-2xl">Your bag <span className="font-sans text-xs text-[#897a70]">({bagCount})</span></span>
          <button data-testid="button-close-bag" onClick={onClose}><X size={21} strokeWidth={1.3} /></button>
        </div>
        {bagCount === 0 ? (
          <div className="flex h-[70%] flex-col items-center justify-center text-center">
            <ShoppingBag className="mb-5 text-[#bd8d9b]" size={34} strokeWidth={1} />
            <p className="serif text-2xl">A little room to breathe.</p>
            <p className="mt-2 max-w-[230px] text-xs leading-5 text-[#897a70]">Your ritual begins with something that feels good to hold.</p>
            <Link data-testid="link-shop-from-empty-bag" href="/shop" onClick={onClose} className="mt-7 border-b border-[#3a302c] pb-1 text-[10px] uppercase tracking-[.18em]">Explore the collection</Link>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-4 border-b border-[#3a302c]/15 py-6">
              <img src={productImage} alt="The Daily Veil" className="h-24 w-20 object-cover" />
              <div className="flex-1"><p className="serif text-lg">The Daily Veil</p><p className="mt-1 text-[11px] text-[#897a70]">Nourishing face oil</p><p className="mt-3 text-xs">$54</p></div>
              <button data-testid="button-remove-product" onClick={onRemove} className="text-[#897a70]"><Minus size={16} strokeWidth={1.3} /></button>
            </div>
            <div className="mt-auto border-t border-[#3a302c]/15 pt-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>$54</span></div>
              <Link data-testid="button-checkout" href="/checkout" onClick={onClose} className="mt-5 block w-full bg-[#66715f] py-4 text-center text-[10px] uppercase tracking-[.18em] text-[#f7f3ed] transition-colors hover:bg-[#3a302c]">Continue to checkout</Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function PageShell({ children }: { children: (actions: { addToBag: () => void }) => ReactNode }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const addToBag = () => {
    setBagCount(1);
    setBagOpen(true);
  };

  return (
    <main className="mogan-page">
      <Header onBag={() => setBagOpen(true)} bagCount={bagCount} />
      {children({ addToBag })}
      <BagDrawer open={bagOpen} onClose={() => setBagOpen(false)} bagCount={bagCount} onRemove={() => setBagCount(0)} />
    </main>
  );
}

function ProductCard({ product, index, onAdd }: { product: Product; index: number; onAdd: () => void }) {
  return (
    <article data-testid={`card-product-${index}`} className={`group ${index === 0 ? 'md:pt-12' : ''}`}>
      <div className={`image-wrap relative aspect-[.88] ${product.tone === 'rose' ? 'bg-[#d2a2ad]' : product.tone === 'sage' ? 'bg-[#c0c9b9]' : 'bg-[#e5ddd5]'}`}>
        <Link href={`/shop/${product.slug}`} className="block h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply opacity-90" />
        </Link>
        <button data-testid={`button-add-${index}`} onClick={onAdd} className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f3ed] text-[#3a302c] opacity-0 transition-all duration-300 group-hover:opacity-100" aria-label={`Add ${product.name} to bag`}>
          <Plus size={17} strokeWidth={1.2} />
        </button>
        <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[.16em] text-[#3a302c]/60">0{index + 1}</span>
      </div>
      <Link href={`/shop/${product.slug}`} className="flex items-start justify-between pt-4">
        <div><h3 className="serif text-xl">{product.name}</h3><p className="mt-1 text-[11px] text-[#897a70]">{product.type}</p></div>
        <span className="text-xs text-[#6f615a]">{product.price}</span>
      </Link>
    </article>
  );
}

function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: ReactNode; body?: string }) {
  return (
    <section className="bg-[#f7f3ed] px-6 py-20 md:px-[12vw] md:py-28">
      <div className="mx-auto max-w-[760px] text-center">
        <p className="eyebrow text-[#9a8580]">{eyebrow}</p>
        <h1 className="mt-5 text-[clamp(2.8rem,6vw,6rem)] leading-[.95] tracking-[-.06em] text-[#3a302c] serif">{title}</h1>
        {body && <p className="mx-auto mt-8 max-w-[460px] text-[13px] leading-6 text-[#756760]">{body}</p>}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#3a302c] px-6 pb-8 pt-16 text-[#f7f3ed] md:px-[7vw] md:pt-24">
      <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div><Link href="/" className="text-4xl tracking-[-.05em] serif">mogan</Link><p className="mt-5 max-w-[230px] text-[12px] leading-6 text-[#f7f3ed]/60">Beauty for the everyday. Made slowly, used often.</p></div>
        <div><p className="eyebrow text-[#f7f3ed]/40">Explore</p><div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75"><Link href="/shop">Shop all</Link><Link href="/rituals">Our rituals</Link><Link href="/journal">The journal</Link></div></div>
        <div><p className="eyebrow text-[#f7f3ed]/40">Care</p><div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75"><Link href="/shipping-returns">Shipping & returns</Link><Link href="/contact">Contact us</Link><Link href="/stockists">Stockists</Link></div></div>
        <div><p className="eyebrow text-[#f7f3ed]/40">Find us</p><div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75"><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.pinterest.com" target="_blank" rel="noreferrer">Pinterest</a><Link href="/contact">Melbourne, AU</Link></div></div>
      </div>
      <div className="mt-20 flex flex-col justify-between gap-4 border-t border-[#f7f3ed]/20 pt-5 text-[9px] uppercase tracking-[.16em] text-[#f7f3ed]/40 md:flex-row"><span>© 2025 Mogan Beauty</span><span>Made with care for skin and soil</span><span><Link href="/privacy">Privacy</Link> <span className="mx-1">/</span> <Link href="/terms">Terms</Link></span></div>
    </footer>
  );
}

function HomePage() {
  return (
    <PageShell>
      {({ addToBag }) => (
        <>
          <section className="relative grid min-h-[calc(100dvh-72px)] grid-cols-1 bg-[#c6929f] md:min-h-[680px] md:grid-cols-[1.05fr_.95fr]">
            <div className="relative order-2 flex flex-col justify-center px-8 py-16 md:order-1 md:px-[10vw] md:py-20">
              <p className="eyebrow reveal text-[#f7f3ed]/75">Beauty for your everyday</p>
              <h1 className="reveal reveal-delay-1 mt-5 max-w-[540px] text-[clamp(3.5rem,7.4vw,7.5rem)] leading-[.88] tracking-[-.065em] text-[#f7f3ed] serif">Skin, <em>softly</em><br />considered.</h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-[320px] text-[13px] leading-6 text-[#f7f3ed]/80">Thoughtful formulas for the small rituals that make a day feel like yours.</p>
              <Link data-testid="link-discover-ritual" href="/rituals" className="reveal reveal-delay-3 mt-10 inline-flex w-fit items-center gap-5 border-b border-[#f7f3ed]/70 pb-2 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed]">Discover the ritual <ArrowDown size={15} strokeWidth={1.1} /></Link>
              <span className="absolute bottom-7 left-8 text-[9px] uppercase tracking-[.2em] text-[#f7f3ed]/55 md:left-[10vw]">01 / 05</span>
            </div>
            <div className="image-wrap relative order-1 min-h-[58vh] md:order-2 md:min-h-0">
              <img src={heroImage} alt="Woman holding a Mogan skincare bottle" className="h-full w-full object-cover object-center" />
              <div className="absolute bottom-7 right-7 text-right text-[9px] uppercase tracking-[.18em] text-[#f7f3ed]/80">New season<br />Skin studies</div>
            </div>
          </section>

          <section className="bg-[#f7f3ed] px-6 py-24 md:px-[12vw] md:py-36">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="eyebrow text-[#9a8580]">A slower approach</p>
              <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.02] tracking-[-.045em] text-[#3a302c] serif">We believe in the<br /><em>beauty of enough.</em></h2>
              <p className="mx-auto mt-8 max-w-[450px] text-[13px] leading-6 text-[#756760]">Mogan is a collection of uncomplicated, high-performing essentials. Made in small batches, chosen with care, and designed to stay close to your skin.</p>
              <Link data-testid="link-read-our-story" href="/about" className="underline-link mt-8 text-[10px] uppercase tracking-[.18em] text-[#66715f]">Read our story <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link>
            </div>
          </section>

          <section id="story" className="grid items-stretch bg-[#e6ddd4] md:grid-cols-[.9fr_1.1fr]">
            <div className="image-wrap min-h-[480px] md:min-h-[680px]"><img src={studioImage} alt="Quiet beauty studio ritual" className="h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-center px-8 py-20 md:px-[10vw] md:py-28">
              <p className="eyebrow text-[#8c7770]">The Mogan method</p>
              <h2 className="mt-5 max-w-[520px] text-[clamp(2.5rem,5vw,5.3rem)] leading-[.95] tracking-[-.055em] text-[#3a302c] serif">Ritual is a form<br /><em>of remembering.</em></h2>
              <p className="mt-8 max-w-[370px] text-[13px] leading-6 text-[#6f615a]">We leave room for the pause. For warming an oil between your palms. For noticing the light in the mirror. Your skin does not need more noise — it needs a little attention.</p>
              <div className="mt-12 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-7 border-t border-[#3a302c]/20 pt-7">
                {['Considered ingredients', 'Small-batch making', 'No unnecessary extras', 'A kinder daily rhythm'].map((item, index) => <div key={item} className="flex gap-3 text-[11px] text-[#6f615a]"><span className="serif text-lg text-[#bd8d9b]">0{index + 1}</span><span className="pt-1">{item}</span></div>)}
              </div>
            </div>
          </section>

          <section id="shop" className="bg-[#f7f3ed] px-6 py-24 md:px-[7vw] md:py-32">
            <div className="mb-12 flex items-end justify-between">
              <div><p className="eyebrow text-[#9a8580]">The essentials</p><h2 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-.05em] serif">Made for your shelf.</h2></div>
              <Link data-testid="link-view-all-products" href="/shop" className="hidden text-[10px] uppercase tracking-[.18em] text-[#66715f] md:inline">View all <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link>
            </div>
            <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr_.85fr]">{products.map((product, index) => <ProductCard key={product.slug} product={product} index={index} onAdd={addToBag} />)}</div>
          </section>

          <section id="rituals" className="grid bg-[#66715f] text-[#f7f3ed] md:grid-cols-[1.1fr_.9fr]">
            <div className="flex flex-col justify-center px-8 py-24 md:order-1 md:px-[11vw] md:py-32">
              <p className="eyebrow text-[#f7f3ed]/60">A daily gesture</p>
              <h2 className="mt-5 text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.91] tracking-[-.06em] serif">The five-minute<br /><em>reset.</em></h2>
              <p className="mt-8 max-w-[360px] text-[13px] leading-6 text-[#f7f3ed]/70">A simple rhythm for skin that feels lived in, loved, and light. Take a breath. Begin again.</p>
              <Link data-testid="link-explore-ritual" href="/rituals" className="mt-10 w-fit border-b border-[#f7f3ed]/60 pb-2 text-[10px] uppercase tracking-[.2em]">Explore the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link>
            </div>
            <div className="image-wrap order-first min-h-[480px] md:order-2 md:min-h-[650px]"><img src={ritualImage} alt="Woman applying face cream" className="h-full w-full object-cover" /></div>
          </section>

          <section className="bg-[#d2a2ad] px-6 py-24 md:px-[10vw] md:py-32">
            <div className="grid items-center gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-24">
              <div className="image-wrap mx-auto w-full max-w-[470px] rotate-[-2deg]"><img src={ingredientsImage} alt="Mogan botanical ingredients" className="aspect-square w-full object-cover" /></div>
              <div className="max-w-[570px]">
                <p className="eyebrow text-[#6f4e56]">From the earth, gently</p>
                <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.92] tracking-[-.06em] text-[#3a302c] serif">Good things<br /><em>take root.</em></h2>
                <p className="mt-8 max-w-[390px] text-[13px] leading-6 text-[#614b4f]">Every formula begins with a short list of ingredients you can recognize. Sourced for their quiet efficacy, blended to keep skin in its own balance.</p>
                <div className="mt-10 grid max-w-[480px] grid-cols-3 gap-5 border-t border-[#6f4e56]/30 pt-5 text-[10px] uppercase tracking-[.13em] text-[#6f4e56]"><div><span className="serif mb-2 block text-xl normal-case text-[#3a302c]">01</span>Oat lipid</div><div><span className="serif mb-2 block text-xl normal-case text-[#3a302c]">02</span>Meadowfoam</div><div><span className="serif mb-2 block text-xl normal-case text-[#3a302c]">03</span>Sage leaf</div></div>
              </div>
            </div>
          </section>

          <section className="bg-[#f7f3ed] px-6 py-24 md:px-[12vw] md:py-32">
            <div className="mx-auto max-w-[720px] text-center"><p className="eyebrow text-[#9a8580]">Notes from the community</p><div className="mt-10 text-[#bd8d9b]"><span className="serif text-6xl">“</span></div><blockquote className="mt-1 text-[clamp(1.8rem,3.3vw,3.3rem)] leading-[1.08] tracking-[-.035em] text-[#3a302c] serif">My evening routine has become the gentlest part of my day.</blockquote><p className="mt-7 text-[10px] uppercase tracking-[.18em] text-[#897a70]">— Amara, Melbourne</p></div>
            <div className="mx-auto mt-16 grid max-w-[920px] items-center gap-8 md:grid-cols-[.8fr_1.2fr]"><div className="image-wrap mx-auto h-[260px] w-[210px] rotate-[3deg] md:h-[330px] md:w-[270px]"><img src={testimonialImage} alt="Mogan customer with glowing skin" className="h-full w-full object-cover" /></div><div><p className="eyebrow text-[#9a8580]">A little proof</p><p className="mt-4 max-w-[390px] text-[14px] leading-7 text-[#6f615a]">“The Daily Veil is the rare product that feels like a ritual and works like one too. My skin is calm, luminous, and still looks like mine.”</p><div className="mt-7 flex gap-1 text-[#bd8d9b]">{[1, 2, 3, 4, 5].map((item) => <span key={item} className="text-xs">/</span>)}</div></div></div>
          </section>

          <section className="border-y border-[#3a302c]/15 bg-[#e6ddd4] py-20"><div className="marquee flex w-max items-center gap-12 text-[clamp(2.6rem,6vw,6rem)] tracking-[-.06em] text-[#8c7770]/65 serif"><span>Skin, softly considered.</span><span className="text-[#bd8d9b]">·</span><span>Skin, softly considered.</span><span className="text-[#bd8d9b]">·</span></div></section>

          <section id="journal" className="bg-[#f7f3ed] px-6 py-24 md:px-[8vw] md:py-32">
            <div className="mb-12 flex items-end justify-between"><div><p className="eyebrow text-[#9a8580]">From the journal</p><h2 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-.05em] serif">Small observations.</h2></div><Link data-testid="link-all-journal" href="/journal" className="hidden text-[10px] uppercase tracking-[.18em] text-[#66715f] md:inline">All journal notes <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></div>
            <div className="grid gap-8 md:grid-cols-3">{journalEntries.map((entry, index) => <Link data-testid={`link-journal-${index}`} href={`/journal/${entry.slug}`} key={entry.slug} className="group"><div className="image-wrap aspect-[1.25]"><img src={entry.image} alt={entry.title} className="h-full w-full object-cover grayscale-[.15]" /></div><p className="mt-5 text-[10px] uppercase tracking-[.16em] text-[#9a8580]">Field note 0{index + 1}</p><h3 className="mt-2 text-2xl tracking-[-.03em] transition-colors group-hover:text-[#bd8d9b] serif">{entry.title}</h3><p className="mt-2 text-[12px] text-[#897a70]">{entry.subtitle}</p></Link>)}</div>
          </section>

          <section className="bg-[#c6929f] px-6 py-20 text-center md:py-28"><p className="eyebrow text-[#f7f3ed]/70">A note, now and then</p><h2 className="mx-auto mt-5 max-w-[600px] text-[clamp(2.5rem,5vw,5rem)] leading-[.92] tracking-[-.06em] text-[#f7f3ed] serif">Come a little<br /><em>closer.</em></h2><p className="mx-auto mt-6 max-w-[330px] text-[13px] leading-6 text-[#f7f3ed]/75">New rituals, considered ingredients, and a few beautiful things to notice.</p><Newsletter /></section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  if (subscribed) return <p data-testid="status-subscribed" className="mx-auto mt-10 text-sm text-[#f7f3ed]">You are on the list. See you soon.</p>;
  return <form onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true); }} className="mx-auto mt-9 flex max-w-[390px] border-b border-[#f7f3ed]/60 pb-2"><input data-testid="input-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm text-[#f7f3ed] outline-none placeholder:text-[#f7f3ed]/60" /><button data-testid="button-subscribe" type="submit" className="text-[10px] uppercase tracking-[.18em] text-[#f7f3ed]">Subscribe <ArrowUpRight className="ml-1 inline" size={13} strokeWidth={1.2} /></button></form>;
}

function ShopPage() {
  return <PageShell>{({ addToBag }) => <><PageHeading eyebrow="The collection" title={<>Everything you need,<br /><em>nothing you don't.</em></>} body="Three considered essentials for a daily ritual that feels simple, sensorial, and completely yours." /><section className="bg-[#f7f3ed] px-6 pb-24 md:px-[7vw] md:pb-32"><div className="grid gap-5 md:grid-cols-[1.15fr_.85fr_.85fr]">{products.map((product, index) => <ProductCard key={product.slug} product={product} index={index} onAdd={addToBag} />)}</div></section><section className="grid bg-[#e6ddd4] md:grid-cols-2"><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><p className="eyebrow text-[#8c7770]">The edit</p><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] leading-[.95] tracking-[-.055em] serif">A small shelf<br /><em>of good things.</em></h2><p className="mt-8 max-w-[370px] text-[13px] leading-6 text-[#6f615a]">Each formula is made to stand alone, and even better together. Begin with the cleanser, follow with the oil, and let the balm catch the last light.</p><Link href="/rituals" className="mt-10 w-fit border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em]">See the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></div><div className="image-wrap min-h-[500px]"><img src={studioImage} alt="Mogan products on a studio shelf" className="h-full w-full object-cover" /></div></section><Footer /></>}</PageShell>;
}

function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFound />;
  return <PageShell>{({ addToBag }) => <><section className="grid bg-[#f7f3ed] md:grid-cols-2"><div className={`image-wrap min-h-[560px] md:min-h-[780px] ${product.tone === 'rose' ? 'bg-[#d2a2ad]' : product.tone === 'sage' ? 'bg-[#c0c9b9]' : 'bg-[#e5ddd5]'}`}><img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply" /></div><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><Link href="/shop" className="mb-16 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#897a70]"><ArrowLeft size={14} strokeWidth={1.2} /> Back to collection</Link><p className="eyebrow text-[#9a8580]">{product.type}</p><h1 className="mt-5 text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.06em] serif">{product.name}</h1><p className="mt-8 max-w-[390px] text-[14px] leading-7 text-[#6f615a]">{product.description}</p><div className="mt-10 flex items-center justify-between border-y border-[#3a302c]/15 py-5 text-sm"><span>One-time purchase</span><span>{product.price}</span></div><button onClick={addToBag} className="mt-6 w-full bg-[#66715f] py-5 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] transition-colors hover:bg-[#3a302c]">Add to bag</button><div className="mt-12 grid gap-4 border-t border-[#3a302c]/15 pt-6">{product.details.map((detail) => <div key={detail} className="flex items-center gap-3 text-[11px] text-[#6f615a]"><Check size={14} className="text-[#bd8d9b]" strokeWidth={1.2} />{detail}</div>)}</div></div></section><section className="bg-[#e6ddd4] px-8 py-24 md:px-[15vw] md:py-32"><div className="mx-auto max-w-[650px] text-center"><p className="eyebrow text-[#8c7770]">A little more about it</p><h2 className="mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)] leading-none tracking-[-.05em] serif">Made to be <em>felt.</em></h2><p className="mx-auto mt-8 max-w-[450px] text-[13px] leading-6 text-[#6f615a]">A quiet formula that meets you where you are. No complicated steps, no performance for performance's sake — only a beautiful daily pause.</p></div></section><Footer /></>}</PageShell>;
}

function RitualsPage() {
  const steps = [['01', 'Cleanse softly', 'Start with warm water and Soft Focus. Massage slowly, then rinse with a clean cloth.'], ['02', 'Press, don’t pull', 'Warm two or three drops of The Daily Veil between your palms and press into damp skin.'], ['03', 'Catch the light', 'Finish with Quiet Light wherever you want a little reflected glow.']];
  return <PageShell>{() => <><PageHeading eyebrow="Our rituals" title={<>Five minutes<br /><em>to come back to yourself.</em></>} body="The best routine is the one that gives something back. A simple three-step rhythm for skin and mind." /><section className="grid bg-[#66715f] text-[#f7f3ed] md:grid-cols-[.9fr_1.1fr]"><div className="image-wrap min-h-[520px] md:min-h-[700px]"><img src={ritualImage} alt="Woman applying Mogan skincare" className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><p className="eyebrow text-[#f7f3ed]/60">The daily reset</p><h2 className="mt-5 text-[clamp(2.8rem,5vw,5.3rem)] leading-[.92] tracking-[-.06em] serif">Let the day<br /><em>soften.</em></h2><div className="mt-12 grid gap-8">{steps.map(([number, title, copy]) => <div key={number} className="grid grid-cols-[40px_1fr] gap-4 border-t border-[#f7f3ed]/20 pt-5"><span className="serif text-2xl text-[#d2a2ad]">{number}</span><div><h3 className="serif text-2xl">{title}</h3><p className="mt-2 max-w-[330px] text-[12px] leading-6 text-[#f7f3ed]/70">{copy}</p></div></div>)}</div></div></section><section className="bg-[#d2a2ad] px-6 py-24 text-center md:py-32"><p className="eyebrow text-[#6f4e56]">A note to keep</p><blockquote className="mx-auto mt-6 max-w-[720px] text-[clamp(2rem,4.5vw,4.5rem)] leading-[.98] tracking-[-.05em] text-[#3a302c] serif">“Your skin does not need more noise. It needs a little attention.”</blockquote><Link href="/shop" className="mt-10 inline-block border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em] text-[#3a302c]">Shop the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></section><Footer /></>}</PageShell>;
}

function JournalPage() {
  return <PageShell>{() => <><PageHeading eyebrow="The journal" title={<>Small observations<br /><em>for softer days.</em></>} body="Notes on skin, ritual, ingredients, and the quiet beauty of paying attention." /><section className="bg-[#f7f3ed] px-6 pb-24 md:px-[8vw] md:pb-32"><div className="grid gap-10 md:grid-cols-3">{journalEntries.map((entry, index) => <Link href={`/journal/${entry.slug}`} key={entry.slug} className="group"><div className="image-wrap aspect-[.9]"><img src={entry.image} alt={entry.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div><p className="mt-5 text-[10px] uppercase tracking-[.16em] text-[#9a8580]">{entry.category} · 0{index + 1}</p><h2 className="mt-2 text-3xl tracking-[-.04em] transition-colors group-hover:text-[#bd8d9b] serif">{entry.title}</h2><p className="mt-3 text-[13px] leading-6 text-[#897a70]">{entry.subtitle}</p><span className="mt-6 inline-block border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.18em]">Read note <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></span></Link>)}</div></section><Footer /></>}</PageShell>;
}

function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = journalEntries.find((item) => item.slug === slug);
  if (!entry) return <NotFound />;
  return <PageShell>{() => <><section className="grid bg-[#e6ddd4] md:grid-cols-[.9fr_1.1fr]"><div className="image-wrap min-h-[460px] md:min-h-[650px]"><img src={entry.image} alt={entry.title} className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><Link href="/journal" className="mb-16 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#897a70]"><ArrowLeft size={14} strokeWidth={1.2} /> Back to journal</Link><p className="eyebrow text-[#9a8580]">{entry.category}</p><h1 className="mt-5 text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.06em] serif">{entry.title}</h1><p className="mt-8 max-w-[390px] text-[16px] leading-7 text-[#6f615a]">{entry.subtitle}</p></div></section><article className="bg-[#f7f3ed] px-8 py-24 md:px-[20vw] md:py-32"><p className="text-[15px] leading-8 text-[#6f615a]">There is a certain kind of beauty in making space before the day fills it. A window opened, a warm cloth, a few drops pressed slowly into the skin. These are small things, but small things are where a life becomes recognizable.</p><p className="mt-8 text-[15px] leading-8 text-[#6f615a]">We made Mogan for these pauses. Not as another thing to keep up with, but as a gentle reason to come back to the present. The ritual is never about perfection. It is about noticing what is already here.</p><div className="mt-16 border-t border-[#3a302c]/15 pt-6"><Link href="/shop" className="text-[10px] uppercase tracking-[.18em] text-[#66715f]">Explore the essentials <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></div></article><Footer /></>}</PageShell>;
}

function AboutPage() {
  return <PageShell>{() => <><PageHeading eyebrow="Our story" title={<>Beauty, with<br /><em>less noise.</em></>} body="Mogan began with a simple question: what if a skincare routine felt less like a checklist and more like a place to land?" /><section className="grid bg-[#e6ddd4] md:grid-cols-2"><div className="image-wrap min-h-[500px] md:min-h-[700px]"><img src={studioImage} alt="Mogan studio" className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><p className="eyebrow text-[#8c7770]">The Mogan method</p><h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.92] tracking-[-.06em] serif">Keep what is<br /><em>useful and beautiful.</em></h2><p className="mt-8 max-w-[390px] text-[13px] leading-7 text-[#6f615a]">We work in small batches, choose ingredients for their quiet efficacy, and leave out anything that does not need to be there. Every bottle is an invitation to slow down for five minutes.</p><Link href="/rituals" className="mt-10 w-fit border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em]">Meet the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></div></section><Footer /></>}</PageShell>;
}

function ShippingPage() {
  const rows = [['Where do you ship?', 'We ship across Australia and New Zealand. International shipping is coming soon.'], ['When will my order arrive?', 'Orders leave our studio within 2–3 business days. Allow 2–5 business days for delivery within Australia.'], ['Can I return something?', 'Unused, unopened products can be returned within 14 days of delivery. Contact us first so we can help.'], ['What if my order arrives damaged?', 'Send us a note with a photo within 48 hours and we will make it right.']];
  return <PageShell>{() => <><PageHeading eyebrow="Care" title={<>Shipping &<br /><em>returns.</em></>} body="A few useful details, so your order can make its way to you with ease." /><section className="bg-[#f7f3ed] px-6 pb-24 md:px-[20vw] md:pb-32"><div className="border-t border-[#3a302c]/15">{rows.map(([question, answer]) => <details key={question} className="group border-b border-[#3a302c]/15 py-6"><summary className="flex cursor-pointer list-none items-center justify-between text-xl serif">{question}<Plus className="transition group-open:rotate-45" size={19} strokeWidth={1.2} /></summary><p className="mt-4 max-w-[520px] text-[13px] leading-7 text-[#6f615a]">{answer}</p></details>)}</div></section><Footer /></>}</PageShell>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <PageShell>{() => <><PageHeading eyebrow="We’re here" title={<>Come say<br /><em>hello.</em></>} body="Questions about a formula, an order, or where to find Mogan? We would love to hear from you." /><section className="grid bg-[#e6ddd4] md:grid-cols-[1fr_1.15fr]"><div className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"><p className="eyebrow text-[#8c7770]">Contact</p><div className="mt-8 grid gap-6 text-sm text-[#6f615a]"><a href="mailto:hello@moganbeauty.com" className="flex items-center gap-3 hover:text-[#bd8d9b]"><Mail size={17} strokeWidth={1.2} />hello@moganbeauty.com</a><a href="mailto:orders@moganbeauty.com" className="flex items-center gap-3 hover:text-[#bd8d9b]"><ShoppingBag size={17} strokeWidth={1.2} />orders@moganbeauty.com</a><div className="flex items-center gap-3"><Clock3 size={17} strokeWidth={1.2} />Monday–Friday, 9am–5pm</div></div></div><div className="bg-[#f7f3ed] px-8 py-20 md:px-[8vw]"><p className="eyebrow text-[#9a8580]">Send a note</p>{sent ? <div className="flex min-h-[310px] flex-col justify-center"><Check className="text-[#66715f]" size={28} strokeWidth={1.2} /><h2 className="mt-5 text-4xl serif">Thank you.</h2><p className="mt-3 text-[13px] text-[#6f615a]">We’ll be in touch soon.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-8 grid gap-7"><input required placeholder="Your name" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><input required type="email" placeholder="Email address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><textarea required placeholder="How can we help?" rows={4} className="resize-none border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><button className="w-fit bg-[#66715f] px-7 py-4 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] hover:bg-[#3a302c]">Send message <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></button></form>}</div></section><Footer /></>}</PageShell>;
}

function StockistsPage() {
  return <PageShell>{() => <><PageHeading eyebrow="Find Mogan" title={<>Come by<br /><em>in person.</em></>} body="Visit one of our stockists to explore the collection, ask a question, and take your time." /><section className="bg-[#f7f3ed] px-6 pb-24 md:px-[12vw] md:pb-32"><div className="grid gap-5 md:grid-cols-3">{[['Kindred House', 'Fitzroy, Melbourne', 'A quiet edit of skincare and objects for everyday living.'], ['The Still Room', 'Paddington, Sydney', 'A considered space for slow beauty and good light.'], ['Sunday Supply', 'Byron Bay, NSW', 'A small collection of useful, beautiful things.']].map(([name, location, copy]) => <article key={name} className="border border-[#3a302c]/15 p-7"><MapPin className="text-[#bd8d9b]" size={21} strokeWidth={1.2} /><h2 className="mt-9 text-2xl serif">{name}</h2><p className="mt-2 text-[10px] uppercase tracking-[.15em] text-[#9a8580]">{location}</p><p className="mt-6 text-[13px] leading-6 text-[#6f615a]">{copy}</p><a href="mailto:hello@moganbeauty.com" className="mt-8 inline-block border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.16em]">Get directions <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></a></article>)}</div><div className="mt-16 bg-[#66715f] px-8 py-12 text-[#f7f3ed] md:px-16"><p className="eyebrow text-[#f7f3ed]/60">Want to carry Mogan?</p><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><h2 className="mt-4 max-w-[500px] text-4xl leading-none tracking-[-.05em] serif">We’re always happy to meet a good home for the collection.</h2><Link href="/contact" className="w-fit border-b border-[#f7f3ed]/60 pb-2 text-[10px] uppercase tracking-[.18em]">Talk to us <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></Link></div></div></section><Footer /></>}</PageShell>;
}

function CheckoutPage() {
  const [placed, setPlaced] = useState(false);
  return <PageShell>{() => <><PageHeading eyebrow="Your order" title={<>A beautiful<br /><em>beginning.</em></>} body="Complete your details below and we’ll prepare your Mogan ritual with care." /><section className="grid bg-[#e6ddd4] md:grid-cols-[1.05fr_.95fr]"><div className="px-8 py-20 md:px-[10vw]"><p className="eyebrow text-[#8c7770]">Delivery details</p>{placed ? <div className="flex min-h-[360px] flex-col justify-center"><Check className="text-[#66715f]" size={30} strokeWidth={1.2} /><h2 className="mt-5 text-4xl serif">Order received.</h2><p className="mt-3 max-w-[330px] text-[13px] leading-6 text-[#6f615a]">Thank you. We’ll send a confirmation to your inbox and begin preparing your order.</p><Link href="/" className="mt-8 w-fit border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.18em]">Return home</Link></div> : <form onSubmit={(event) => { event.preventDefault(); setPlaced(true); }} className="mt-8 grid gap-6"><input required placeholder="Full name" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><input required type="email" placeholder="Email address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><input required placeholder="Shipping address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><div className="grid grid-cols-2 gap-5"><input required placeholder="City" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /><input required placeholder="Postcode" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none placeholder:text-[#9a8580]" /></div><button className="mt-4 bg-[#66715f] py-5 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] hover:bg-[#3a302c]">Place order <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} /></button></form>}</div><div className="bg-[#f7f3ed] px-8 py-20 md:px-[8vw]"><p className="eyebrow text-[#9a8580]">Order summary</p><div className="mt-8 flex gap-5 border-y border-[#3a302c]/15 py-6"><img src={productImage} alt="The Daily Veil" className="h-28 w-24 object-cover" /><div className="flex flex-1 justify-between"><div><h2 className="serif text-xl">The Daily Veil</h2><p className="mt-1 text-[11px] text-[#897a70]">Nourishing face oil</p><p className="mt-4 text-xs">Qty 1</p></div><span className="text-sm">$54</span></div></div><div className="mt-5 flex justify-between text-sm"><span>Shipping</span><span>Free</span></div><div className="mt-5 flex justify-between border-t border-[#3a302c]/15 pt-5 text-sm"><span>Total</span><span>$54</span></div></div></section><Footer /></>}</PageShell>;
}

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return <PageShell>{() => <><PageHeading eyebrow="The small print" title={privacy ? <>Privacy,<br /><em>with care.</em></> : <>Terms of<br /><em>use.</em></>} body={privacy ? 'A plain-language overview of how Mogan looks after your information.' : 'The simple terms that keep our little corner of the internet clear and kind.'} /><article className="bg-[#f7f3ed] px-8 pb-24 md:px-[20vw] md:pb-32"><div className="grid gap-10 border-t border-[#3a302c]/15 pt-10 text-[13px] leading-7 text-[#6f615a]"><div><h2 className="text-2xl text-[#3a302c] serif">{privacy ? 'What we collect' : 'Using this site'}</h2><p className="mt-4">{privacy ? 'We only collect the details needed to send orders, reply to messages, and share the occasional note when you ask us to. We do not sell personal information.' : 'Mogan is a small beauty studio. Please use this site thoughtfully and do not reproduce our words, images, or brand materials without permission.'}</p></div><div><h2 className="text-2xl text-[#3a302c] serif">{privacy ? 'Questions' : 'Orders and products'}</h2><p className="mt-4">{privacy ? 'For any question about your information, email hello@moganbeauty.com and we’ll help.' : 'Product availability, shipping, returns, and order support are covered on our care pages. If something feels unclear, contact us before placing an order.'}</p></div></div></article><Footer /></>}</PageShell>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={HomePage} /><Route path="/shop" component={ShopPage} /><Route path="/shop/:slug" component={ProductPage} /><Route path="/rituals" component={RitualsPage} /><Route path="/journal" component={JournalPage} /><Route path="/journal/:slug" component={JournalArticlePage} /><Route path="/about" component={AboutPage} /><Route path="/shipping-returns" component={ShippingPage} /><Route path="/contact" component={ContactPage} /><Route path="/stockists" component={StockistsPage} /><Route path="/checkout" component={CheckoutPage} /><Route path="/privacy" component={() => <LegalPage kind="privacy" />} /><Route path="/terms" component={() => <LegalPage kind="terms" />} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;