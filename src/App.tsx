import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 border-b border-[#3a302c]/15 bg-[#f7f3ed]/90 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-10">
        <button data-testid="button-mobile-menu" onClick={() => setOpen(!open)} className="md:hidden" aria-label="Open menu">
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <Link data-testid={`link-${label.toLowerCase().replaceAll(' ', '-')}`} className="text-[11px] tracking-[.1em] text-[#655852] transition-colors duration-300 hover:text-[#ad7e8a]" href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>
        <Link data-testid="link-home" href="/" className="absolute left-1/2 -translate-x-1/2 text-[27px] tracking-[-.04em] text-[#3a302c] serif transition-opacity hover:opacity-80">mogan</Link>
        <div className="flex items-center gap-5 text-[#3a302c]">
          <button data-testid="button-search" onClick={() => setLocation('/shop')} className="hidden transition-transform duration-300 hover:scale-110 md:block" aria-label="Search">
            <Search size={18} strokeWidth={1.35} />
          </button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            data-testid="button-bag"
            onClick={onBag}
            className="relative flex items-center gap-2 text-[11px] tracking-[.1em]"
            aria-label="Open shopping bag"
          >
            <ShoppingBag size={18} strokeWidth={1.35} />
            <span className="hidden md:inline">Bag</span>
            {bagCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-3 -top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#bd8d9b] text-[9px] text-[#f7f3ed]"
              >
                {bagCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-[#3a302c]/15 bg-[#f7f3ed] px-6 pb-7 pt-2 md:hidden"
          >
            {links.map(([label, href], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link onClick={() => setOpen(false)} data-testid={`mobile-link-${label.toLowerCase().replaceAll(' ', '-')}`} className="block border-t border-[#3a302c]/15 py-4 text-sm tracking-[.08em]" href={href}>
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function BagDrawer({ open, onClose, bagCount, onRemove }: { open: boolean; onClose: () => void; bagCount: number; onRemove: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#3a302c]/30 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(event) => event.stopPropagation()}
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-[420px] flex-col bg-[#f7f3ed] p-6 shadow-2xl md:p-9"
          >
            <div className="flex items-center justify-between border-b border-[#3a302c]/15 pb-5">
              <span className="serif text-2xl">Your bag <span className="font-sans text-xs text-[#897a70]">({bagCount})</span></span>
              <button data-testid="button-close-bag" onClick={onClose} className="transition-transform duration-300 hover:rotate-90">
                <X size={21} strokeWidth={1.3} />
              </button>
            </div>
            {bagCount === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-[70%] flex-col items-center justify-center text-center"
              >
                <ShoppingBag className="mb-5 text-[#bd8d9b]" size={34} strokeWidth={1} />
                <p className="serif text-2xl">A little room to breathe.</p>
                <p className="mt-2 max-w-[230px] text-xs leading-5 text-[#897a70]">Your ritual begins with something that feels good to hold.</p>
                <Link data-testid="link-shop-from-empty-bag" href="/shop" onClick={onClose} className="mt-7 border-b border-[#3a302c] pb-1 text-[10px] uppercase tracking-[.18em] transition-opacity hover:opacity-70">Explore the collection</Link>
              </motion.div>
            ) : (
              <div className="flex h-full flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 border-b border-[#3a302c]/15 py-6"
                >
                  <motion.img
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    src={productImage}
                    alt="The Daily Veil"
                    className="h-24 w-20 object-cover"
                  />
                  <div className="flex-1">
                    <p className="serif text-lg">The Daily Veil</p>
                    <p className="mt-1 text-[11px] text-[#897a70]">Nourishing face oil</p>
                    <p className="mt-3 text-xs">$54</p>
                  </div>
                  <button data-testid="button-remove-product" onClick={onRemove} className="text-[#897a70] transition-colors hover:text-[#3a302c]">
                    <Minus size={16} strokeWidth={1.3} />
                  </button>
                </motion.div>
                <div className="mt-auto border-t border-[#3a302c]/15 pt-5">
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>$54</span></div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Link data-testid="button-checkout" href="/checkout" onClick={onClose} className="mt-5 block w-full bg-[#66715f] py-4 text-center text-[10px] uppercase tracking-[.18em] text-[#f7f3ed] transition-colors hover:bg-[#3a302c]">Continue to checkout</Link>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
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
    <motion.article
      data-testid={`card-product-${index}`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`group ${index === 0 ? 'md:pt-12' : ''}`}
    >
      <div className={`image-wrap relative aspect-[.88] overflow-hidden ${product.tone === 'rose' ? 'bg-[#d2a2ad]' : product.tone === 'sage' ? 'bg-[#c0c9b9]' : 'bg-[#e5ddd5]'}`}>
        <Link href={`/shop/${product.slug}`} className="block h-full">
          <motion.img
            initial={{ scale: 1.06, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: index * 0.15 }}
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          data-testid={`button-add-${index}`}
          onClick={onAdd}
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f3ed] text-[#3a302c] opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100"
          aria-label={`Add ${product.name} to bag`}
        >
          <Plus size={17} strokeWidth={1.2} />
        </motion.button>
        <span className="absolute left-4 top-4 text-[9px] uppercase tracking-[.16em] text-[#3a302c]/60">0{index + 1}</span>
      </div>
      <Link href={`/shop/${product.slug}`} className="flex items-start justify-between pt-4">
        <div>
          <h3 className="serif text-xl transition-colors duration-300 group-hover:text-[#ad7e8a]">{product.name}</h3>
          <p className="mt-1 text-[11px] text-[#897a70]">{product.type}</p>
        </div>
        <span className="text-xs text-[#6f615a]">{product.price}</span>
      </Link>
    </motion.article>
  );
}

function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: ReactNode; body?: string }) {
  return (
    <section className="overflow-hidden bg-[#f7f3ed] px-6 py-20 md:px-[12vw] md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.14 },
          },
        }}
        className="mx-auto max-w-[760px] text-center"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="eyebrow text-[#9a8580]"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
          }}
          className="mt-5 text-[clamp(2.8rem,6vw,6rem)] leading-[.95] tracking-[-.06em] text-[#3a302c] serif"
        >
          {title}
        </motion.h1>
        {body && (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="mx-auto mt-8 max-w-[460px] text-[13px] leading-6 text-[#756760]"
          >
            {body}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden bg-[#3a302c] px-6 pb-8 pt-16 text-[#f7f3ed] md:px-[7vw] md:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
      >
        <div>
          <Link href="/" className="serif text-4xl tracking-[-.05em] transition-opacity hover:opacity-80">mogan</Link>
          <p className="mt-5 max-w-[230px] text-[12px] leading-6 text-[#f7f3ed]/60">Beauty for the everyday. Made slowly, used often.</p>
        </div>
        <div>
          <p className="eyebrow text-[#f7f3ed]/40">Explore</p>
          <div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75">
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/shop">Shop all</Link>
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/rituals">Our rituals</Link>
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/journal">The journal</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#f7f3ed]/40">Care</p>
          <div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75">
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/shipping-returns">Shipping & returns</Link>
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/contact">Contact us</Link>
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/stockists">Stockists</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[#f7f3ed]/40">Find us</p>
          <div className="mt-5 flex flex-col gap-3 text-[12px] text-[#f7f3ed]/75">
            <a className="transition-colors hover:text-[#d2a2ad]" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a className="transition-colors hover:text-[#d2a2ad]" href="https://www.pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
            <Link className="transition-colors hover:text-[#d2a2ad]" href="/contact">Melbourne, AU</Link>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 flex flex-col justify-between gap-4 border-t border-[#f7f3ed]/20 pt-5 text-[9px] uppercase tracking-[.16em] text-[#f7f3ed]/40 md:flex-row"
      >
        <span>© 2025 Mogan Beauty</span>
        <span>Made with care for skin and soil</span>
        <span><Link href="/privacy">Privacy</Link> <span className="mx-1">/</span> <Link href="/terms">Terms</Link></span>
      </motion.div>
    </footer>
  );
}

function HomePage() {
  return (
    <PageShell>
      {({ addToBag }) => (
        <>
          {/* Hero Section */}
          <section className="relative grid min-h-[calc(100dvh-72px)] grid-cols-1 overflow-hidden bg-[#c6929f] md:min-h-[680px] md:grid-cols-[1.05fr_.95fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.16, delayChildren: 0.1 },
                },
              }}
              className="relative order-2 flex flex-col justify-center px-8 py-16 md:order-1 md:px-[10vw] md:py-20"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="eyebrow text-[#f7f3ed]/75"
              >
                Beauty for your everyday
              </motion.p>
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="mt-5 max-w-[540px] text-[clamp(3.5rem,7.4vw,7.5rem)] leading-[.88] tracking-[-.065em] text-[#f7f3ed] serif"
              >
                Skin, <em>softly</em><br />considered.
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="mt-8 max-w-[320px] text-[13px] leading-6 text-[#f7f3ed]/80"
              >
                Thoughtful formulas for the small rituals that make a day feel like yours.
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
              >
                <Link
                  data-testid="link-discover-ritual"
                  href="/rituals"
                  className="mt-10 inline-flex w-fit items-center gap-5 border-b border-[#f7f3ed]/70 pb-2 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] transition-transform duration-300 hover:translate-x-1"
                >
                  Discover the ritual <ArrowDown size={15} strokeWidth={1.1} />
                </Link>
              </motion.div>
              <span className="absolute bottom-7 left-8 text-[9px] uppercase tracking-[.2em] text-[#f7f3ed]/55 md:left-[10vw]">01 / 05</span>
            </motion.div>
            <div className="image-wrap relative order-1 min-h-[58vh] overflow-hidden md:order-2 md:min-h-0">
              <motion.img
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                src={heroImage}
                alt="Woman holding a Mogan skincare bottle"
                className="h-full w-full object-cover object-center"
              />
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-7 right-7 text-right text-[9px] uppercase tracking-[.18em] text-[#f7f3ed]/80"
              >
                New season<br />Skin studies
              </motion.div>
            </div>
          </section>

          {/* Slower approach section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#f7f3ed] px-6 py-24 md:px-[12vw] md:py-36"
          >
            <div className="mx-auto max-w-[720px] text-center">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="eyebrow text-[#9a8580]"
              >
                A slower approach
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.02] tracking-[-.045em] text-[#3a302c] serif"
              >
                We believe in the<br /><em>beauty of enough.</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mx-auto mt-8 max-w-[450px] text-[13px] leading-6 text-[#756760]"
              >
                Mogan is a collection of uncomplicated, high-performing essentials. Made in small batches, chosen with care, and designed to stay close to your skin.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link data-testid="link-read-our-story" href="/about" className="underline-link mt-8 text-[10px] uppercase tracking-[.18em] text-[#66715f]">
                  Read our story <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Story / Method section */}
          <section id="story" className="grid items-stretch overflow-hidden bg-[#e6ddd4] md:grid-cols-[.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap min-h-[480px] overflow-hidden md:min-h-[680px]"
            >
              <img src={studioImage} alt="Quiet beauty studio ritual" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw] md:py-28"
            >
              <p className="eyebrow text-[#8c7770]">The Mogan method</p>
              <h2 className="mt-5 max-w-[520px] text-[clamp(2.5rem,5vw,5.3rem)] leading-[.95] tracking-[-.055em] text-[#3a302c] serif">
                Ritual is a form<br /><em>of remembering.</em>
              </h2>
              <p className="mt-8 max-w-[370px] text-[13px] leading-6 text-[#6f615a]">
                We leave room for the pause. For warming an oil between your palms. For noticing the light in the mirror. Your skin does not need more noise — it needs a little attention.
              </p>
              <div className="mt-12 grid max-w-[440px] grid-cols-2 gap-x-8 gap-y-7 border-t border-[#3a302c]/20 pt-7">
                {['Considered ingredients', 'Small-batch making', 'No unnecessary extras', 'A kinder daily rhythm'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-3 text-[11px] text-[#6f615a]"
                  >
                    <span className="serif text-lg text-[#bd8d9b]">0{index + 1}</span>
                    <span className="pt-1">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Essentials / Shop section */}
          <section id="shop" className="overflow-hidden bg-[#f7f3ed] px-6 py-24 md:px-[7vw] md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <p className="eyebrow text-[#9a8580]">The essentials</p>
                <h2 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-.05em] serif">Made for your shelf.</h2>
              </div>
              <Link data-testid="link-view-all-products" href="/shop" className="hidden text-[10px] uppercase tracking-[.18em] text-[#66715f] transition-opacity hover:opacity-70 md:inline">
                View all <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr_.85fr]">
              {products.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} onAdd={addToBag} />
              ))}
            </div>
          </section>

          {/* Rituals Highlight */}
          <section id="rituals" className="grid overflow-hidden bg-[#66715f] text-[#f7f3ed] md:grid-cols-[1.1fr_.9fr]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-24 md:order-1 md:px-[11vw] md:py-32"
            >
              <p className="eyebrow text-[#f7f3ed]/60">A daily gesture</p>
              <h2 className="mt-5 text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.91] tracking-[-.06em] serif">
                The five-minute<br /><em>reset.</em>
              </h2>
              <p className="mt-8 max-w-[360px] text-[13px] leading-6 text-[#f7f3ed]/70">
                A simple rhythm for skin that feels lived in, loved, and light. Take a breath. Begin again.
              </p>
              <Link data-testid="link-explore-ritual" href="/rituals" className="mt-10 w-fit border-b border-[#f7f3ed]/60 pb-2 text-[10px] uppercase tracking-[.2em] transition-transform duration-300 hover:translate-x-1">
                Explore the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap order-first min-h-[480px] overflow-hidden md:order-2 md:min-h-[650px]"
            >
              <img src={ritualImage} alt="Woman applying face cream" className="h-full w-full object-cover" />
            </motion.div>
          </section>

          {/* Botanical Ingredients Section */}
          <section className="overflow-hidden bg-[#d2a2ad] px-6 py-24 md:px-[10vw] md:py-32">
            <div className="grid items-center gap-12 md:grid-cols-[.9fr_1.1fr] md:gap-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="image-wrap mx-auto w-full max-w-[470px] overflow-hidden shadow-lg"
              >
                <img src={ingredientsImage} alt="Mogan botanical ingredients" className="aspect-square w-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[570px]"
              >
                <p className="eyebrow text-[#6f4e56]">From the earth, gently</p>
                <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.92] tracking-[-.06em] text-[#3a302c] serif">
                  Good things<br /><em>take root.</em>
                </h2>
                <p className="mt-8 max-w-[390px] text-[13px] leading-6 text-[#614b4f]">
                  Every formula begins with a short list of ingredients you can recognize. Sourced for their quiet efficacy, blended to keep skin in its own balance.
                </p>
                <div className="mt-10 grid max-w-[480px] grid-cols-3 gap-5 border-t border-[#6f4e56]/30 pt-5 text-[10px] uppercase tracking-[.13em] text-[#6f4e56]">
                  {[['01', 'Oat lipid'], ['02', 'Meadowfoam'], ['03', 'Sage leaf']].map(([num, name], idx) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                    >
                      <span className="serif mb-2 block text-xl normal-case text-[#3a302c]">{num}</span>
                      {name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="overflow-hidden bg-[#f7f3ed] px-6 py-24 md:px-[12vw] md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85 }}
              className="mx-auto max-w-[720px] text-center"
            >
              <p className="eyebrow text-[#9a8580]">Notes from the community</p>
              <div className="mt-10 text-[#bd8d9b]">
                <span className="serif text-6xl">“</span>
              </div>
              <blockquote className="mt-1 text-[clamp(1.8rem,3.3vw,3.3rem)] leading-[1.08] tracking-[-.035em] text-[#3a302c] serif">
                My evening routine has become the gentlest part of my day.
              </blockquote>
              <p className="mt-7 text-[10px] uppercase tracking-[.18em] text-[#897a70]">— Amara, Melbourne</p>
            </motion.div>
            <div className="mx-auto mt-16 grid max-w-[920px] items-center gap-8 md:grid-cols-[.8fr_1.2fr]">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="image-wrap mx-auto h-[260px] w-[210px] overflow-hidden shadow-md md:h-[330px] md:w-[270px]"
              >
                <img src={testimonialImage} alt="Mogan customer with glowing skin" className="h-full w-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.1 }}
              >
                <p className="eyebrow text-[#9a8580]">A little proof</p>
                <p className="mt-4 max-w-[390px] text-[14px] leading-7 text-[#6f615a]">
                  “The Daily Veil is the rare product that feels like a ritual and works like one too. My skin is calm, luminous, and still looks like mine.”
                </p>
                <div className="mt-7 flex gap-1 text-[#bd8d9b]">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <span key={item} className="text-xs">/</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Marquee Banner */}
          <section className="border-y border-[#3a302c]/15 bg-[#e6ddd4] py-20 overflow-hidden">
            <div className="marquee flex w-max items-center gap-12 text-[clamp(2.6rem,6vw,6rem)] tracking-[-.06em] text-[#8c7770]/65 serif">
              <span>Skin, softly considered.</span>
              <span className="text-[#bd8d9b]">·</span>
              <span>Skin, softly considered.</span>
              <span className="text-[#bd8d9b]">·</span>
            </div>
          </section>

          {/* Journal Section */}
          <section id="journal" className="overflow-hidden bg-[#f7f3ed] px-6 py-24 md:px-[8vw] md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex items-end justify-between"
            >
              <div>
                <p className="eyebrow text-[#9a8580]">From the journal</p>
                <h2 className="mt-4 text-[clamp(2.4rem,4vw,4rem)] leading-none tracking-[-.05em] serif">Small observations.</h2>
              </div>
              <Link data-testid="link-all-journal" href="/journal" className="hidden text-[10px] uppercase tracking-[.18em] text-[#66715f] transition-opacity hover:opacity-70 md:inline">
                All journal notes <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-3">
              {journalEntries.map((entry, index) => (
                <motion.div
                  key={entry.slug}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <Link data-testid={`link-journal-${index}`} href={`/journal/${entry.slug}`} className="group block">
                    <div className="image-wrap aspect-[1.25] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                        src={entry.image}
                        alt={entry.title}
                        className="h-full w-full object-cover grayscale-[.15]"
                      />
                    </div>
                    <p className="mt-5 text-[10px] uppercase tracking-[.16em] text-[#9a8580]">Field note 0{index + 1}</p>
                    <h3 className="mt-2 text-2xl tracking-[-.03em] transition-colors group-hover:text-[#bd8d9b] serif">{entry.title}</h3>
                    <p className="mt-2 text-[12px] text-[#897a70]">{entry.subtitle}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Newsletter Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden bg-[#c6929f] px-6 py-20 text-center md:py-28"
          >
            <p className="eyebrow text-[#f7f3ed]/70">A note, now and then</p>
            <h2 className="mx-auto mt-5 max-w-[600px] text-[clamp(2.5rem,5vw,5rem)] leading-[.92] tracking-[-.06em] text-[#f7f3ed] serif">
              Come a little<br /><em>closer.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-[330px] text-[13px] leading-6 text-[#f7f3ed]/75">
              New rituals, considered ingredients, and a few beautiful things to notice.
            </p>
            <Newsletter />
          </motion.section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  if (subscribed) {
    return (
      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        data-testid="status-subscribed"
        className="mx-auto mt-10 text-sm text-[#f7f3ed]"
      >
        You are on the list. See you soon.
      </motion.p>
    );
  }
  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      onSubmit={(event) => {
        event.preventDefault();
        if (email) setSubscribed(true);
      }}
      className="mx-auto mt-9 flex max-w-[390px] border-b border-[#f7f3ed]/60 pb-2"
    >
      <input
        data-testid="input-email"
        required
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        className="min-w-0 flex-1 bg-transparent text-sm text-[#f7f3ed] outline-none placeholder:text-[#f7f3ed]/60"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-subscribe"
        type="submit"
        className="text-[10px] uppercase tracking-[.18em] text-[#f7f3ed]"
      >
        Subscribe <ArrowUpRight className="ml-1 inline" size={13} strokeWidth={1.2} />
      </motion.button>
    </motion.form>
  );
}

function ShopPage() {
  return (
    <PageShell>
      {({ addToBag }) => (
        <>
          <PageHeading
            eyebrow="The collection"
            title={<>Everything you need,<br /><em>nothing you don't.</em></>}
            body="Three considered essentials for a daily ritual that feels simple, sensorial, and completely yours."
          />
          <section className="bg-[#f7f3ed] px-6 pb-24 md:px-[7vw] md:pb-32">
            <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr_.85fr]">
              {products.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} onAdd={addToBag} />
              ))}
            </div>
          </section>
          <section className="grid overflow-hidden bg-[#e6ddd4] md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <p className="eyebrow text-[#8c7770]">The edit</p>
              <h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] leading-[.95] tracking-[-.055em] serif">
                A small shelf<br /><em>of good things.</em>
              </h2>
              <p className="mt-8 max-w-[370px] text-[13px] leading-6 text-[#6f615a]">
                Each formula is made to stand alone, and even better together. Begin with the cleanser, follow with the oil, and let the balm catch the last light.
              </p>
              <Link href="/rituals" className="mt-10 w-fit border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em] transition-transform duration-300 hover:translate-x-1">
                See the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap min-h-[500px] overflow-hidden"
            >
              <img src={studioImage} alt="Mogan products on a studio shelf" className="h-full w-full object-cover" />
            </motion.div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <NotFound />;

  return (
    <PageShell>
      {({ addToBag }) => (
        <>
          <section className="grid overflow-hidden bg-[#f7f3ed] md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`image-wrap min-h-[560px] overflow-hidden md:min-h-[780px] ${product.tone === 'rose' ? 'bg-[#d2a2ad]' : product.tone === 'sage' ? 'bg-[#c0c9b9]' : 'bg-[#e5ddd5]'}`}
            >
              <img src={product.image} alt={product.name} className="h-full w-full object-cover mix-blend-multiply" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <Link href="/shop" className="mb-16 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#897a70] transition-colors hover:text-[#3a302c]">
                <ArrowLeft size={14} strokeWidth={1.2} /> Back to collection
              </Link>
              <p className="eyebrow text-[#9a8580]">{product.type}</p>
              <h1 className="mt-5 text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.06em] serif">{product.name}</h1>
              <p className="mt-8 max-w-[390px] text-[14px] leading-7 text-[#6f615a]">{product.description}</p>
              <div className="mt-10 flex items-center justify-between border-y border-[#3a302c]/15 py-5 text-sm">
                <span>One-time purchase</span>
                <span>{product.price}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToBag}
                className="mt-6 w-full bg-[#66715f] py-5 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] shadow-md transition-colors hover:bg-[#3a302c]"
              >
                Add to bag
              </motion.button>
              <div className="mt-12 grid gap-4 border-t border-[#3a302c]/15 pt-6">
                {product.details.map((detail, index) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-[11px] text-[#6f615a]"
                  >
                    <Check size={14} className="text-[#bd8d9b]" strokeWidth={1.2} />
                    {detail}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden bg-[#e6ddd4] px-8 py-24 md:px-[15vw] md:py-32"
          >
            <div className="mx-auto max-w-[650px] text-center">
              <p className="eyebrow text-[#8c7770]">A little more about it</p>
              <h2 className="mt-5 text-[clamp(2.4rem,4.5vw,4.5rem)] leading-none tracking-[-.05em] serif">
                Made to be <em>felt.</em>
              </h2>
              <p className="mx-auto mt-8 max-w-[450px] text-[13px] leading-6 text-[#6f615a]">
                A quiet formula that meets you where you are. No complicated steps, no performance for performance's sake — only a beautiful daily pause.
              </p>
            </div>
          </motion.section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function RitualsPage() {
  const steps = [
    ['01', 'Cleanse softly', 'Start with warm water and Soft Focus. Massage slowly, then rinse with a clean cloth.'],
    ['02', 'Press, don’t pull', 'Warm two or three drops of The Daily Veil between your palms and press into damp skin.'],
    ['03', 'Catch the light', 'Finish with Quiet Light wherever you want a little reflected glow.'],
  ];

  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="Our rituals"
            title={<>Five minutes<br /><em>to come back to yourself.</em></>}
            body="The best routine is the one that gives something back. A simple three-step rhythm for skin and mind."
          />
          <section className="grid overflow-hidden bg-[#66715f] text-[#f7f3ed] md:grid-cols-[.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap min-h-[520px] overflow-hidden md:min-h-[700px]"
            >
              <img src={ritualImage} alt="Woman applying Mogan skincare" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <p className="eyebrow text-[#f7f3ed]/60">The daily reset</p>
              <h2 className="mt-5 text-[clamp(2.8rem,5vw,5.3rem)] leading-[.92] tracking-[-.06em] serif">
                Let the day<br /><em>soften.</em>
              </h2>
              <div className="mt-12 grid gap-8">
                {steps.map(([number, title, copy], idx) => (
                  <motion.div
                    key={number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="grid grid-cols-[40px_1fr] gap-4 border-t border-[#f7f3ed]/20 pt-5"
                  >
                    <span className="serif text-2xl text-[#d2a2ad]">{number}</span>
                    <div>
                      <h3 className="serif text-2xl">{title}</h3>
                      <p className="mt-2 max-w-[330px] text-[12px] leading-6 text-[#f7f3ed]/70">{copy}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden bg-[#d2a2ad] px-6 py-24 text-center md:py-32"
          >
            <p className="eyebrow text-[#6f4e56]">A note to keep</p>
            <blockquote className="mx-auto mt-6 max-w-[720px] text-[clamp(2rem,4.5vw,4.5rem)] leading-[.98] tracking-[-.05em] text-[#3a302c] serif">
              “Your skin does not need more noise. It needs a little attention.”
            </blockquote>
            <Link href="/shop" className="mt-10 inline-block border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em] text-[#3a302c] transition-opacity hover:opacity-70">
              Shop the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
            </Link>
          </motion.section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function JournalPage() {
  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="The journal"
            title={<>Small observations<br /><em>for softer days.</em></>}
            body="Notes on skin, ritual, ingredients, and the quiet beauty of paying attention."
          />
          <section className="overflow-hidden bg-[#f7f3ed] px-6 pb-24 md:px-[8vw] md:pb-32">
            <div className="grid gap-10 md:grid-cols-3">
              {journalEntries.map((entry, index) => (
                <motion.div
                  key={entry.slug}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  <Link href={`/journal/${entry.slug}`} className="group block">
                    <div className="image-wrap aspect-[.9] overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7 }}
                        src={entry.image}
                        alt={entry.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-5 text-[10px] uppercase tracking-[.16em] text-[#9a8580]">{entry.category} · 0{index + 1}</p>
                    <h2 className="mt-2 text-3xl tracking-[-.04em] transition-colors group-hover:text-[#bd8d9b] serif">{entry.title}</h2>
                    <p className="mt-3 text-[13px] leading-6 text-[#897a70]">{entry.subtitle}</p>
                    <span className="mt-6 inline-block border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.18em]">
                      Read note <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function JournalArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = journalEntries.find((item) => item.slug === slug);
  if (!entry) return <NotFound />;

  return (
    <PageShell>
      {() => (
        <>
          <section className="grid overflow-hidden bg-[#e6ddd4] md:grid-cols-[.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap min-h-[460px] overflow-hidden md:min-h-[650px]"
            >
              <img src={entry.image} alt={entry.title} className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <Link href="/journal" className="mb-16 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[.18em] text-[#897a70] transition-colors hover:text-[#3a302c]">
                <ArrowLeft size={14} strokeWidth={1.2} /> Back to journal
              </Link>
              <p className="eyebrow text-[#9a8580]">{entry.category}</p>
              <h1 className="mt-5 text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.06em] serif">{entry.title}</h1>
              <p className="mt-8 max-w-[390px] text-[16px] leading-7 text-[#6f615a]">{entry.subtitle}</p>
            </motion.div>
          </section>
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
            className="overflow-hidden bg-[#f7f3ed] px-8 py-24 md:px-[20vw] md:py-32"
          >
            <p className="text-[15px] leading-8 text-[#6f615a]">
              There is a certain kind of beauty in making space before the day fills it. A window opened, a warm cloth, a few drops pressed slowly into the skin. These are small things, but small things are where a life becomes recognizable.
            </p>
            <p className="mt-8 text-[15px] leading-8 text-[#6f615a]">
              We made Mogan for these pauses. Not as another thing to keep up with, but as a gentle reason to come back to the present. The ritual is never about perfection. It is about noticing what is already here.
            </p>
            <div className="mt-16 border-t border-[#3a302c]/15 pt-6">
              <Link href="/shop" className="text-[10px] uppercase tracking-[.18em] text-[#66715f] transition-opacity hover:opacity-70">
                Explore the essentials <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </div>
          </motion.article>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="Our story"
            title={<>Beauty, with<br /><em>less noise.</em></>}
            body="Mogan began with a simple question: what if a skincare routine felt less like a checklist and more like a place to land?"
          />
          <section className="grid overflow-hidden bg-[#e6ddd4] md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="image-wrap min-h-[500px] overflow-hidden md:min-h-[700px]"
            >
              <img src={studioImage} alt="Mogan studio" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <p className="eyebrow text-[#8c7770]">The Mogan method</p>
              <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.92] tracking-[-.06em] serif">
                Keep what is<br /><em>useful and beautiful.</em>
              </h2>
              <p className="mt-8 max-w-[390px] text-[13px] leading-7 text-[#6f615a]">
                We work in small batches, choose ingredients for their quiet efficacy, and leave out anything that does not need to be there. Every bottle is an invitation to slow down for five minutes.
              </p>
              <Link href="/rituals" className="mt-10 w-fit border-b border-[#3a302c]/50 pb-2 text-[10px] uppercase tracking-[.2em] transition-transform duration-300 hover:translate-x-1">
                Meet the ritual <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
              </Link>
            </motion.div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function ShippingPage() {
  const rows = [
    ['Where do you ship?', 'We ship across Australia and New Zealand. International shipping is coming soon.'],
    ['When will my order arrive?', 'Orders leave our studio within 2–3 business days. Allow 2–5 business days for delivery within Australia.'],
    ['Can I return something?', 'Unused, unopened products can be returned within 14 days of delivery. Contact us first so we can help.'],
    ['What if my order arrives damaged?', 'Send us a note with a photo within 48 hours and we will make it right.'],
  ];

  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="Care"
            title={<>Shipping &<br /><em>returns.</em></>}
            body="A few useful details, so your order can make its way to you with ease."
          />
          <section className="overflow-hidden bg-[#f7f3ed] px-6 pb-24 md:px-[20vw] md:pb-32">
            <div className="border-t border-[#3a302c]/15">
              {rows.map(([question, answer], idx) => (
                <motion.details
                  key={question}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group border-b border-[#3a302c]/15 py-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-xl serif">
                    {question}
                    <Plus className="transition-transform duration-300 group-open:rotate-45" size={19} strokeWidth={1.2} />
                  </summary>
                  <p className="mt-4 max-w-[520px] text-[13px] leading-7 text-[#6f615a]">{answer}</p>
                </motion.details>
              ))}
            </div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="We’re here"
            title={<>Come say<br /><em>hello.</em></>}
            body="Questions about a formula, an order, or where to find Mogan? We would love to hear from you."
          />
          <section className="grid overflow-hidden bg-[#e6ddd4] md:grid-cols-[1fr_1.15fr]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85 }}
              className="flex flex-col justify-center px-8 py-20 md:px-[10vw]"
            >
              <p className="eyebrow text-[#8c7770]">Contact</p>
              <div className="mt-8 grid gap-6 text-sm text-[#6f615a]">
                <a href="mailto:hello@moganbeauty.com" className="flex items-center gap-3 transition-colors hover:text-[#bd8d9b]">
                  <Mail size={17} strokeWidth={1.2} />hello@moganbeauty.com
                </a>
                <a href="mailto:orders@moganbeauty.com" className="flex items-center gap-3 transition-colors hover:text-[#bd8d9b]">
                  <ShoppingBag size={17} strokeWidth={1.2} />orders@moganbeauty.com
                </a>
                <div className="flex items-center gap-3">
                  <Clock3 size={17} strokeWidth={1.2} />Monday–Friday, 9am–5pm
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="bg-[#f7f3ed] px-8 py-20 md:px-[8vw]"
            >
              <p className="eyebrow text-[#9a8580]">Send a note</p>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[310px] flex-col justify-center"
                >
                  <Check className="text-[#66715f]" size={28} strokeWidth={1.2} />
                  <h2 className="mt-5 text-4xl serif">Thank you.</h2>
                  <p className="mt-3 text-[13px] text-[#6f615a]">We’ll be in touch soon.</p>
                </motion.div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                  className="mt-8 grid gap-7"
                >
                  <input required placeholder="Your name" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <input required type="email" placeholder="Email address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <textarea required placeholder="How can we help?" rows={4} className="resize-none border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-fit bg-[#66715f] px-7 py-4 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] shadow-md transition-colors hover:bg-[#3a302c]"
                  >
                    Send message <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function StockistsPage() {
  const stockists = [
    ['Kindred House', 'Fitzroy, Melbourne', 'A quiet edit of skincare and objects for everyday living.'],
    ['The Still Room', 'Paddington, Sydney', 'A considered space for slow beauty and good light.'],
    ['Sunday Supply', 'Byron Bay, NSW', 'A small collection of useful, beautiful things.'],
  ];

  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="Find Mogan"
            title={<>Come by<br /><em>in person.</em></>}
            body="Visit one of our stockists to explore the collection, ask a question, and take your time."
          />
          <section className="overflow-hidden bg-[#f7f3ed] px-6 pb-24 md:px-[12vw] md:pb-32">
            <div className="grid gap-5 md:grid-cols-3">
              {stockists.map(([name, location, copy], idx) => (
                <motion.article
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="border border-[#3a302c]/15 p-7"
                >
                  <MapPin className="text-[#bd8d9b]" size={21} strokeWidth={1.2} />
                  <h2 className="mt-9 text-2xl serif">{name}</h2>
                  <p className="mt-2 text-[10px] uppercase tracking-[.15em] text-[#9a8580]">{location}</p>
                  <p className="mt-6 text-[13px] leading-6 text-[#6f615a]">{copy}</p>
                  <a href="mailto:hello@moganbeauty.com" className="mt-8 inline-block border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.16em] transition-opacity hover:opacity-70">
                    Get directions <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                  </a>
                </motion.article>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-[#66715f] px-8 py-12 text-[#f7f3ed] md:px-16"
            >
              <p className="eyebrow text-[#f7f3ed]/60">Want to carry Mogan?</p>
              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
                <h2 className="mt-4 max-w-[500px] text-4xl leading-none tracking-[-.05em] serif">
                  We’re always happy to meet a good home for the collection.
                </h2>
                <Link href="/contact" className="w-fit border-b border-[#f7f3ed]/60 pb-2 text-[10px] uppercase tracking-[.18em] transition-transform duration-300 hover:translate-x-1">
                  Talk to us <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                </Link>
              </div>
            </motion.div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function CheckoutPage() {
  const [placed, setPlaced] = useState(false);

  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="Your order"
            title={<>A beautiful<br /><em>beginning.</em></>}
            body="Complete your details below and we’ll prepare your Mogan ritual with care."
          />
          <section className="grid overflow-hidden bg-[#e6ddd4] md:grid-cols-[1.05fr_.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85 }}
              className="px-8 py-20 md:px-[10vw]"
            >
              <p className="eyebrow text-[#8c7770]">Delivery details</p>
              {placed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[360px] flex-col justify-center"
                >
                  <Check className="text-[#66715f]" size={30} strokeWidth={1.2} />
                  <h2 className="mt-5 text-4xl serif">Order received.</h2>
                  <p className="mt-3 max-w-[330px] text-[13px] leading-6 text-[#6f615a]">
                    Thank you. We’ll send a confirmation to your inbox and begin preparing your order.
                  </p>
                  <Link href="/" className="mt-8 w-fit border-b border-[#3a302c]/40 pb-1 text-[10px] uppercase tracking-[.18em]">
                    Return home
                  </Link>
                </motion.div>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPlaced(true);
                  }}
                  className="mt-8 grid gap-6"
                >
                  <input required placeholder="Full name" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <input required type="email" placeholder="Email address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <input required placeholder="Shipping address" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  <div className="grid grid-cols-2 gap-5">
                    <input required placeholder="City" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                    <input required placeholder="Postcode" className="border-b border-[#3a302c]/25 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-[#9a8580] focus:border-[#3a302c]" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 bg-[#66715f] py-5 text-[10px] uppercase tracking-[.2em] text-[#f7f3ed] shadow-md transition-colors hover:bg-[#3a302c]"
                  >
                    Place order <ArrowUpRight className="ml-2 inline" size={13} strokeWidth={1.2} />
                  </motion.button>
                </form>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="bg-[#f7f3ed] px-8 py-20 md:px-[8vw]"
            >
              <p className="eyebrow text-[#9a8580]">Order summary</p>
              <div className="mt-8 flex gap-5 border-y border-[#3a302c]/15 py-6">
                <motion.img
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  src={productImage}
                  alt="The Daily Veil"
                  className="h-28 w-24 object-cover"
                />
                <div className="flex flex-1 justify-between">
                  <div>
                    <h2 className="serif text-xl">The Daily Veil</h2>
                    <p className="mt-1 text-[11px] text-[#897a70]">Nourishing face oil</p>
                    <p className="mt-4 text-xs">Qty 1</p>
                  </div>
                  <span className="text-sm">$54</span>
                </div>
              </div>
              <div className="mt-5 flex justify-between text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="mt-5 flex justify-between border-t border-[#3a302c]/15 pt-5 text-sm">
                <span>Total</span>
                <span>$54</span>
              </div>
            </motion.div>
          </section>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const privacy = kind === 'privacy';
  return (
    <PageShell>
      {() => (
        <>
          <PageHeading
            eyebrow="The small print"
            title={privacy ? <>Privacy,<br /><em>with care.</em></> : <>Terms of<br /><em>use.</em></>}
            body={privacy ? 'A plain-language overview of how Mogan looks after your information.' : 'The simple terms that keep our little corner of the internet clear and kind.'}
          />
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-hidden bg-[#f7f3ed] px-8 pb-24 md:px-[20vw] md:pb-32"
          >
            <div className="grid gap-10 border-t border-[#3a302c]/15 pt-10 text-[13px] leading-7 text-[#6f615a]">
              <div>
                <h2 className="serif text-2xl text-[#3a302c]">{privacy ? 'What we collect' : 'Using this site'}</h2>
                <p className="mt-4">
                  {privacy
                    ? 'We only collect the details needed to send orders, reply to messages, and share the occasional note when you ask us to. We do not sell personal information.'
                    : 'Mogan is a small beauty studio. Please use this site thoughtfully and do not reproduce our words, images, or brand materials without permission.'}
                </p>
              </div>
              <div>
                <h2 className="serif text-2xl text-[#3a302c]">{privacy ? 'Questions' : 'Orders and products'}</h2>
                <p className="mt-4">
                  {privacy
                    ? 'For any question about your information, email hello@moganbeauty.com and we’ll help.'
                    : 'Product availability, shipping, returns, and order support are covered on our care pages. If something feels unclear, contact us before placing an order.'}
                </p>
              </div>
            </div>
          </motion.article>
          <Footer />
        </>
      )}
    </PageShell>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <RoutedErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/shop/:slug" component={ProductPage} />
            <Route path="/rituals" component={RitualsPage} />
            <Route path="/journal" component={JournalPage} />
            <Route path="/journal/:slug" component={JournalArticlePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/shipping-returns" component={ShippingPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/stockists" component={StockistsPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/privacy" component={() => <LegalPage kind="privacy" />} />
            <Route path="/terms" component={() => <LegalPage kind="terms" />} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
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
