export interface Treatment {
  id: string;
  slug: string;
  name: string;
  category: 'Signature Facials' | 'Advanced Skin Treatments' | 'Specialist Treatments' | 'Packages and Experiences';
  shortDescription: string;
  overview: string;
  whatToExpect: string[];
  consultationInfo: string;
  image: string;
  featured?: boolean;
  relatedSlugs: string[];
  bookingUrl: string;
}

export interface Review {
  id: string;
  author: string;
  treatment: string;
  practitioner?: string;
  content: string;
  date: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  treatmentsFocus: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export const BOOKING_URL = 'https://teoluxuryskincare.book.app/';
export const BUSINESS_EMAIL = 'info@teoluxuryskincare.co.uk';
export const BUSINESS_ADDRESS = {
  line1: 'Unit 7 The Apprentice Shop',
  line2: 'Merton Abbey Mills, 14 Watermill Way',
  city: 'London',
  postcode: 'SW19 2RD',
  country: 'United Kingdom',
};

export const OPENING_HOURS = [
  { day: 'Monday', hours: '9:30 AM – 5:00 PM', status: 'open' },
  { day: 'Tuesday', hours: '7:00 PM – 9:00 PM', status: 'open' },
  { day: 'Wednesday', hours: 'Closed', status: 'closed' },
  { day: 'Thursday', hours: '12:00 PM – 9:00 PM', status: 'open' },
  { day: 'Friday', hours: '9:30 AM – 5:00 PM', status: 'open' },
  { day: 'Saturday', hours: '10:00 AM – 6:00 PM', status: 'open' },
  { day: 'Sunday', hours: 'Closed', status: 'closed' },
];

export const GIFT_CARD_DENOMINATIONS = [25, 50, 75, 100, 150, 200, 300];

export const TREATMENTS: Treatment[] = [
  // Category 1: Signature Facials
  {
    id: 'sig-1',
    slug: 'teo-signature-facials',
    name: 'Teò Signature Facials',
    category: 'Signature Facials',
    shortDescription: 'Our flagship bespoke ritual combining restorative manual massage, clinical cleansing, and tailored infusions.',
    overview: 'The Teò Signature Facial is customized from start to finish around your current skin condition. Blending deep cleansing, gentle resurfacing, and lymphatic drainage massage, this treatment restores vital moisture and a calm, luminous glow.',
    whatToExpect: [
      'Comprehensive skin evaluation and discussion of your immediate priorities',
      'Double cleanse and gentle enzymatic polish to clarify skin texture',
      'Targeted facial massage to stimulate microcirculation and release tension',
      'Nourishing serum infusion and customized hydrating botanical mask'
    ],
    consultationInfo: 'Every signature facial begins with an in-depth skin assessment. Treatment steps are personalized to your skin’s tolerance and needs on the day.',
    image: '/images/teo/treatments/signature-facial.jpg',
    featured: true,
    relatedSlugs: ['korean-facials', 'hydrofacial', 'biorepeel-tca-peel'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'sig-2',
    slug: 'korean-facials',
    name: 'Korean Facials',
    category: 'Signature Facials',
    shortDescription: 'Innovative K-beauty inspired rituals focusing on barrier health, layered hydration, and radiant "glass skin".',
    overview: 'Drawing upon Korean skincare philosophies, this facial emphasizes gentle nurturing, deep hydration, and epidermal resilience. Multiple lightweight essences and skin-conditioning actives are infused to leave the complexion plump, calm, and visibly dewy.',
    whatToExpect: [
      'Gentle multi-step cleanse preserving the acid mantle',
      'Layered hydration utilizing nutrient-rich Korean botanical extracts',
      'Soothing sheet mask application with light lymphatic drainage',
      'Protective barrier sealing for long-lasting luminosity'
    ],
    consultationInfo: 'Ideal for dehydrated, dull, or sensitised skin requiring intensive hydration without harsh peeling.',
    image: '/images/teo/treatments/korean-facial.jpg',
    featured: true,
    relatedSlugs: ['teo-signature-facials', 'hydrofacial', 'skin-boosters'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'sig-3',
    slug: 'seasonal-exclusive-facials',
    name: 'Seasonal Exclusive Facials',
    category: 'Signature Facials',
    shortDescription: 'Limited-edition bespoke protocols tailored to the changing environmental demands of London seasons.',
    overview: 'Throughout the year, our skin faces changing weather, indoor heating, and shifting humidity. Teò Seasonal Facials adjust active ingredients quarterly to fortify the lipid barrier in winter and provide revitalizing antioxidant protection in summer.',
    whatToExpect: [
      'Seasonal skin consultation and exposure analysis',
      'Tailored active ingredients suited to current environmental factors',
      'Calming cryo-globe or thermal comfort ritual',
      'Protective botanical finishing balm with broad-spectrum shield'
    ],
    consultationInfo: 'Curated protocols rotate seasonally. Please speak with your practitioner for current seasonal variations.',
    image: '/images/teo/treatments/signature-facial.jpg',
    featured: false,
    relatedSlugs: ['teo-signature-facials', 'enzyme-peels'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'sig-4',
    slug: 'in-demand-treatments',
    name: 'In Demand Treatments',
    category: 'Signature Facials',
    shortDescription: 'Client-favourite combinations pairing deep resurfacing with intensive restorative nourishment.',
    overview: 'Curated based on client feedback and popular aesthetic requests, these combined protocols deliver immediate revitalisation and smooth texture for special occasions or continuous maintenance.',
    whatToExpect: [
      'Focused consultation addressing priority skin concerns',
      'Synergistic combination of gentle exfoliation and high-potency infusion',
      'Targeted pressure-point relaxation and calming mask'
    ],
    consultationInfo: 'Combinations are personalized during your consultation based on skin readiness.',
    image: '/images/teo/clinic/treatment-room.jpg',
    featured: false,
    relatedSlugs: ['dermaplaning', 'hydrofacial'],
    bookingUrl: BOOKING_URL,
  },

  // Category 2: Advanced Skin Treatments
  {
    id: 'adv-1',
    slug: 'microneedling',
    name: 'Microneedling',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Precision collagen induction therapy to refine skin texture, soften fine lines, and support dermal elasticity.',
    overview: 'Medical-grade automated microneedling creates controlled micro-channels in the superficial dermis. This naturally activates the body’s collagen and elastin production while dramatically enhancing the absorption of restorative peptides and hyaluronic acid.',
    whatToExpect: [
      'Thorough cleansing and skin preparation',
      'Application of comfortable topical numbing if appropriate',
      'Controlled micro-needling passes over targeted face and neck areas',
      'Soothing post-treatment cooling mask and barrier recovery serum'
    ],
    consultationInfo: 'A pre-treatment consultation is required to assess skin suitability, contraindications, and provide comprehensive aftercare advice.',
    image: '/images/teo/treatments/microneedling.jpg',
    featured: true,
    relatedSlugs: ['microneedling-with-exosomes', 'biorepeel-tca-peel', 'rf-microneedling'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-2',
    slug: 'microneedling-with-exosomes',
    name: 'Microneedling with Exosomes',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Advanced regenerative micro-needling enhanced with biotech exosome complexes to accelerate cellular recovery.',
    overview: 'Exosomes are nanoscale extracellular vesicles rich in growth factors and signaling proteins. Delivered via micro-channels, they encourage optimal cell communication, dramatically speed healing, and provide intense regenerative support.',
    whatToExpect: [
      'Clinical skin preparation and mapping',
      'Precision microneedling with immediate exosome solution infusion',
      'Deep cellular penetration for heightened barrier rejuvenation',
      'Calming post-procedure recovery protocol'
    ],
    consultationInfo: 'Suitable for clients seeking advanced regenerative care and accelerated post-treatment recovery.',
    image: '/images/teo/treatments/microneedling.jpg',
    featured: false,
    relatedSlugs: ['microneedling-exosomes-polynucleotides', 'microneedling'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-3',
    slug: 'microneedling-exosomes-polynucleotides',
    name: 'Microneedling with Exosomes & Polynucleotides',
    category: 'Advanced Skin Treatments',
    shortDescription: 'The pinnacle of regenerative aesthetics combining collagen stimulation, cellular exosomes, and DNA polynucleotides.',
    overview: 'This comprehensive protocol marries mechanical collagen induction with cutting-edge biomimetic actives. Polynucleotides work at the cellular level to enhance tissue elasticity and moisture retention, complemented by the regenerative potency of exosomes.',
    whatToExpect: [
      'Advanced skin diagnostic and protocol plan',
      'Precision microneedling application',
      'Dual active delivery of concentrated polynucleotide and exosome complexes',
      'Intensive skin repair soothing care'
    ],
    consultationInfo: 'Our most advanced cellular facial experience. A pre-treatment assessment confirms suitability.',
    image: '/images/teo/treatments/skin-boosters.jpg',
    featured: false,
    relatedSlugs: ['microneedling-with-exosomes', 'polynucleotides'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-4',
    slug: 'rf-microneedling',
    name: 'RF Microneedling',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Dual-action fractional radiofrequency and microneedling for targeted structural tightening and collagen remodelling.',
    overview: 'RF Microneedling combines physical microneedles with controlled thermal radiofrequency energy delivered directly to deeper dermal layers. This dual stimulation promotes profound dermal remodeling, firming lax tissue and smoothing irregular texture.',
    whatToExpect: [
      'Skin sanitization and customized energy depth configuration',
      'Comfort-focused topical preparation',
      'Systematic passes delivering uniform radiofrequency thermal pulses',
      'Anti-inflammatory cooling compress and epidermal shield'
    ],
    consultationInfo: 'Ideal for concerns involving skin laxity, enlarged pores, or acne scarring. Consultation required.',
    image: '/images/teo/treatments/rf-microneedling.jpg',
    featured: false,
    relatedSlugs: ['microneedling', 'radio-frequency'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-5',
    slug: 'biorepeel-tca-peel',
    name: 'BioRePeel (TCA Peel)',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Innovative biphasic 35% TCA peel providing intense rejuvenation and pore clarification without significant downtime.',
    overview: 'BioRePeel is a patented two-phase peel that bypasses the superficial epidermis to deliver trichloroacetic acid (TCA), amino acids, and vitamins directly to deeper layers. It stimulates cellular renewal, refines texture, and combats dullness with minimal visible shedding.',
    whatToExpect: [
      'Skin preparation and degreasing phase',
      'Biphasic formulation massage into targeted areas',
      'Neutralization and calming pH balancing',
      'Restorative post-peel hydration and mineral barrier cream'
    ],
    consultationInfo: 'Suitable for all skin types throughout the year. Patch test and consultation carried out prior to treatment.',
    image: '/images/teo/treatments/biorepeel.jpg',
    featured: true,
    relatedSlugs: ['microneedling', 'hydrofacial', 'enzyme-peels'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-6',
    slug: 'enzyme-peels',
    name: 'Enzyme Peels',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Gentle biological fruit enzymes that dissolve dead keratinized cells for immediate clarity and smoothness.',
    overview: 'Enzyme peels harness natural papain, bromelain, and pumpkin extracts to break down protein bonds between dull surface cells. An exceptional choice for sensitive skins seeking radiant clarification without chemical irritation.',
    whatToExpect: [
      'Gentle double cleanse and warm compress preparation',
      'Warm enzymatic mask application allowing enzymes to activate',
      'Cool soothing removal and nourishing antioxidant treatment',
      'Deep barrier replenishing finish'
    ],
    consultationInfo: 'Ideal for first-time peel clients or skins with heightened sensitivity.',
    image: '/images/teo/treatments/enzyme-peels.jpg',
    featured: false,
    relatedSlugs: ['biorepeel-tca-peel', 'dermaplaning'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-7',
    slug: 'dermaplaning',
    name: 'Dermaplaning',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Manual exfoliation utilizing a sterile surgical blade to sweep away vellus hair and surface cellular buildup.',
    overview: 'Dermaplaning precisely glides across the skin at a 45-degree angle, removing dead epidermal cells and fine vellus hair (peach fuzz). The result is an ultra-smooth canvas allowing optimal skincare absorption and radiant light reflection.',
    whatToExpect: [
      'Skin antiseptic preparation and tensioning technique',
      'Gentle, systematic manual exfoliation with single-use sterile scalpel',
      'Deep hydrating serum infusion and calming gel mask',
      'Broad-spectrum UV protection'
    ],
    consultationInfo: 'Contraindicated for active inflamed acne or cystic breakouts. Assessed during consultation.',
    image: '/images/teo/treatments/dermaplaning.jpg',
    featured: true,
    relatedSlugs: ['hydrofacial', 'biorepeel-tca-peel', 'teo-signature-facials'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-8',
    slug: 'radio-frequency',
    name: 'Radio Frequency',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Non-invasive therapeutic thermal energy that stimulates collagen synthesis and tightens facial contours.',
    overview: 'Radio frequency gently heats the deeper dermal layers to between 39°C and 42°C, causing existing collagen fibers to contract while triggering long-term collagen and elastin regeneration for lifted, firmer skin contours.',
    whatToExpect: [
      'Conductive hydration gel application',
      'Systematic circular passes with warm RF handpiece along jawline and cheeks',
      'Soothing lymphatic massage',
      'Hydrating collagen-boosting cream'
    ],
    consultationInfo: 'A comfortable, warm sensation with zero downtime. Recommended as a course for cumulative firmness.',
    image: '/images/teo/treatments/rf-microneedling.jpg',
    featured: false,
    relatedSlugs: ['rf-microneedling', 'high-frequency'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-9',
    slug: 'high-frequency',
    name: 'High Frequency',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Enriched oxygenating ozone therapy that purifies bacteria, calms breakouts, and stimulates micro-circulation.',
    overview: 'Using an inert gas-filled glass electrode, high frequency produces a gentle electrical current and enriched ozone. This naturally sanitizes acne-causing bacteria, reduces localized inflammation, and promotes rapid cellular oxygenation.',
    whatToExpect: [
      'Pore cleansing and skin preparation',
      'Direct high frequency contact on blemish-prone zones',
      'Calming botanical serum application',
      'Hydration lock to maintain balanced skin barrier'
    ],
    consultationInfo: 'Beneficial for congested, breakout-prone, or sluggish complexions.',
    image: '/images/teo/treatments/signature-facial.jpg',
    featured: false,
    relatedSlugs: ['hydrofacial', 'enzyme-peels'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-10',
    slug: 'hydrofacial',
    name: 'HydroFacial',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Multi-stage vortex suction therapy that simultaneously vacuums pores, exfoliates, and infuses restorative serums.',
    overview: 'HydroFacial combines physical vortex exfoliation with automated painless extractions and deep serum infusion. It flushes out cellular debris, sebum, and environmental pollution while drenching the skin in antioxidants and peptides.',
    whatToExpect: [
      'Vortex cleansing and painless lactic/salicylic exfoliation',
      'Automated vacuum extraction of congestion and blackheads',
      'Intensive vortex infusion of hyaluronic acid and peptide complexes',
      'Finishing antioxidant seal for an instant clean glow'
    ],
    consultationInfo: 'Perfect immediately before events or as monthly maintenance for clear, hydrated skin.',
    image: '/images/teo/treatments/hydrofacial.jpg',
    featured: true,
    relatedSlugs: ['dermaplaning', 'biorepeel-tca-peel', 'teo-signature-facials'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'adv-11',
    slug: 'rejuvology',
    name: 'Rejuvology',
    category: 'Advanced Skin Treatments',
    shortDescription: 'Specialised facial sculpting therapy working deeply into fascial planes to release tension and lift facial posture.',
    overview: 'Rejuvology is a precise, hands-on holistic facial rejuvenation technique. By releasing restrictions in the cranial and facial connective tissues, it improves lymphatic drainage, softens expression lines, and restores radiant ease to the face.',
    whatToExpect: [
      'Postural and facial asymmetry assessment',
      'Deep, rhythmic fascial mobilization across neck, jaw, and cheekbones',
      'Lymphatic decompression techniques',
      'Calming, grounding facial finish'
    ],
    consultationInfo: 'A deeply restorative experience tailored for tension relief and natural non-invasive sculpting.',
    image: '/images/teo/treatments/signature-facial.jpg',
    featured: false,
    relatedSlugs: ['teo-signature-facials', 'radio-frequency'],
    bookingUrl: BOOKING_URL,
  },

  // Category 3: Specialist Treatments
  {
    id: 'spec-1',
    slug: 'skin-boosters',
    name: 'Skin Boosters',
    category: 'Specialist Treatments',
    shortDescription: 'Micro-droplet stabilized hyaluronic acid infusions designed to intensely hydrate and improve skin architecture from within.',
    overview: 'Unlike superficial serums, skin boosters introduce biocompatible hyaluronic acid directly beneath the epidermis. This acts as an internal moisture reservoir, improving elasticity, smoothing crepey texture, and delivering sustained radiance.',
    whatToExpect: [
      'Detailed facial examination and mapping of treatment points',
      'Surface comfort preparation',
      'Precision micro-papule delivery of stabilized HA solution',
      'Anti-bruise botanical balm and soothing recovery advice'
    ],
    consultationInfo: 'Requires consultation to review treatment plan, product suitability, and expected outcomes.',
    image: '/images/teo/treatments/skin-boosters.jpg',
    featured: false,
    relatedSlugs: ['under-eye-skin-booster', 'polynucleotides'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-2',
    slug: 'under-eye-skin-booster',
    name: 'Under Eye Skin Booster',
    category: 'Specialist Treatments',
    shortDescription: 'Delicate peri-orbital micro-treatments formulated specifically to brighten darkness and firm fine under-eye crepey skin.',
    overview: 'The skin around the eyes is the thinnest on the face and often shows early exhaustion. This targeted protocol delivers specialized low-viscosity hydration and peptides to reduce hollow shadows and revitalize the delicate peri-orbital tissue.',
    whatToExpect: [
      'Gentle peri-orbital cleansing and light topical comfort',
      'Gentle micro-point placement around orbital rim',
      'Cooling botanical eye compress to minimize swelling',
      'Dedicated delicate eye aftercare guidance'
    ],
    consultationInfo: 'Assessed carefully during consultation to determine whether darkness is vascular, structural, or pigmentary.',
    image: '/images/teo/treatments/skin-boosters.jpg',
    featured: false,
    relatedSlugs: ['skin-boosters', 'polynucleotides'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-3',
    slug: 'polynucleotides',
    name: 'Polynucleotides',
    category: 'Specialist Treatments',
    shortDescription: 'Natural DNA fraction polymers that bio-stimulate fibroblast proliferation and tissue regeneration.',
    overview: 'Polynucleotides represent a paradigm shift in regenerative aesthetics. Derived from purified salmon DNA fractions, they stimulate fibroblasts to produce new collagen and hyaluronic acid while scavaging free radicals and promoting healthy vascularization.',
    whatToExpect: [
      'Comprehensive aesthetic consultation',
      'Targeted bio-remodelling placement in selected treatment areas',
      'Mild post-treatment swelling instructions and recovery advice',
      'Course planning for lasting structural benefit'
    ],
    consultationInfo: 'Recommended as a course of 2 to 3 sessions. Suitable for tired, sun-damaged, or aging skin.',
    image: '/images/teo/treatments/skin-boosters.jpg',
    featured: false,
    relatedSlugs: ['skin-boosters', 'microneedling-exosomes-polynucleotides'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-4',
    slug: 'led-light-therapy',
    name: 'LED Light Therapy',
    category: 'Specialist Treatments',
    shortDescription: 'Clinically proven photobiomodulation utilizing specific light wavelengths to heal, energize, and calm skin cells.',
    overview: 'LED Light Therapy delivers clinically calibrated red, near-infrared, and blue light waves directly to the skin. Red light stimulates ATP production and collagen synthesis, while blue light targets blemish-causing bacteria, offering zero downtime or discomfort.',
    whatToExpect: [
      'Gentle cleanse and protective eyewear placement',
      '20-30 minutes under medical-grade LED canopy with soothing ambient sound',
      'Cellular energization without heat or UV rays',
      'Nourishing antioxidant serum finish'
    ],
    consultationInfo: 'An excellent standalone reset or companion boost following microneedling, peels, or facials.',
    image: '/images/teo/treatments/led-light-therapy.jpg',
    featured: false,
    relatedSlugs: ['teo-signature-facials', 'biorepeel-tca-peel'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-5',
    slug: 'milia-removal',
    name: 'Milia Removal',
    category: 'Specialist Treatments',
    shortDescription: 'Safe, sterile extraction of keratin-filled micro-cysts to restore smooth, unblemished skin texture.',
    overview: 'Milia are tiny, hard white cysts that form when dead skin flakes become trapped under the skin surface. Our clinical extraction uses single-use sterile micro-lancets to gently release the encapsulated keratin without scarring.',
    whatToExpect: [
      'Antiseptic cleansing and magnification inspection',
      'Delicate micro-opening of the milia capsule using sterile micro-instruments',
      'Painless expression of the keratin deposit',
      'Antimicrobial soothing compress and healing serum'
    ],
    consultationInfo: 'Each milia is assessed individually. We advise on proper skincare to prevent future recurrence.',
    image: '/images/teo/treatments/dermaplaning.jpg',
    featured: false,
    relatedSlugs: ['enzyme-peels', 'hydrofacial'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-6',
    slug: 'male-facials',
    name: 'Male Facials',
    category: 'Specialist Treatments',
    shortDescription: 'Tailored skincare protocols designed for thicker skin, shaving irritation, ingrown hairs, and environmental exposure.',
    overview: 'Male skin has unique physiological characteristics, including greater epidermal thickness, higher sebum density, and constant shaving stress. This tailored treatment cleanses congested pores, soothes razor burn, and restores moisture balance without greasy residue.',
    whatToExpect: [
      'Shaving and barrier stress evaluation',
      'Deep steam cleanse and purifying enzymatic exfoliation',
      'High-frequency oxygenation or ultrasonic pore clearing',
      'Lightweight, non-greasy matte hydration and neck tension release'
    ],
    consultationInfo: 'Bearded or clean-shaven clients are equally welcomed. Customized to your grooming routine.',
    image: '/images/teo/treatments/male-facials.jpg',
    featured: false,
    relatedSlugs: ['hydrofacial', 'teo-signature-facials'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'spec-7',
    slug: 'melasma-treatment',
    name: 'Melasma Treatment',
    category: 'Specialist Treatments',
    shortDescription: 'Gentle, non-thermal depigmenting protocols and tyrosinase-inhibiting care for hormonally triggered hyperpigmentation.',
    overview: 'Melasma requires a thoughtful, conservative approach to avoid rebound hyperpigmentation. We combine gentle chemical resurfacing, tranexamic acid, vitamin C, and barrier fortifiers to suppress melanin synthesis without inflammatory heat.',
    whatToExpect: [
      'UV Wood’s lamp diagnostic and pigmentation depth mapping',
      'Low-inflammatory active peel application with depigmenting actives',
      'Soothing antioxidant calm ritual',
      'Mandatory daily sun protection protocol guidance'
    ],
    consultationInfo: 'Consultation is strictly required. Home care compliance and strict daily SPF are vital components.',
    image: '/images/teo/treatments/biorepeel.jpg',
    featured: false,
    relatedSlugs: ['biorepeel-tca-peel', 'enzyme-peels'],
    bookingUrl: BOOKING_URL,
  },

  // Category 4: Packages and Experiences
  {
    id: 'pkg-1',
    slug: 'treatment-packages',
    name: 'Treatment Packages',
    category: 'Packages and Experiences',
    shortDescription: 'Structured progressive treatment courses created to achieve cumulative, transformational skin health outcomes.',
    overview: 'Achieving lasting changes in texture, tone, and collagen density requires consistency. Our curated packages bundle complementary treatments such as Microneedling with BioRePeel and LED Therapy across structured multi-week intervals.',
    whatToExpect: [
      'Long-term skin goal roadmapping with your practitioner',
      'Structured 3 to 6-treatment progressive schedule',
      'Tailored adjustments at each milestone based on skin progress',
      'Complimentary homecare recommendations and progress checks'
    ],
    consultationInfo: 'Packages are tailored during your initial consultation based on your target skin outcomes.',
    image: '/images/teo/clinic/clinic-interior.jpg',
    featured: false,
    relatedSlugs: ['bestie-bundle', 'microneedling', 'biorepeel-tca-peel'],
    bookingUrl: BOOKING_URL,
  },
  {
    id: 'pkg-2',
    slug: 'bestie-bundle',
    name: 'Bestie Bundle',
    category: 'Packages and Experiences',
    shortDescription: 'A luxurious double appointment for two people to unwind together, including complimentary chilled prosecco and artisanal nibbles.',
    overview: 'Celebrate friendship or mark a special occasion with the Teò Bestie Bundle. You and your guest enjoy side-by-side or back-to-back bespoke signature facials in our serene Merton Abbey Mills clinic, accompanied by complimentary chilled prosecco and light refreshments.',
    whatToExpect: [
      'Warm welcome with chilled glasses of prosecco and artisanal treats',
      'Two fully customized facial treatments tailored to each person’s individual skin',
      'Relaxing neck, shoulder, and facial massage',
      'Unrushed after-treatment lounge experience in our boutique sanctuary'
    ],
    consultationInfo: 'Advance booking is recommended. Please inform us of any dietary preferences or alcohol-free alternatives upon booking.',
    image: '/images/teo/treatments/bestie-bundle.jpg',
    featured: false,
    relatedSlugs: ['teo-signature-facials', 'treatment-packages'],
    bookingUrl: BOOKING_URL,
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sophie M.',
    treatment: 'BioRePeel',
    practitioner: 'Sineád',
    rating: 5,
    date: 'Recent verified booking',
    content: 'Sineád was incredible! The BioRePeel gave my skin an immediate glow without any of the harsh shedding I was nervous about. The clinic in Merton Abbey Mills is stunning and so peaceful.',
  },
  {
    id: 'rev-2',
    author: 'Charlotte H.',
    treatment: 'Face Microneedling',
    practitioner: 'Sineád',
    rating: 5,
    date: 'Recent verified booking',
    content: 'Had face microneedling done and the difference in my skin texture and pore size after just two weeks is remarkable. Everything was explained thoroughly and I felt completely cared for.',
  },
  {
    id: 'rev-3',
    author: 'Emily R.',
    treatment: 'Clinicare Chemical Peel',
    practitioner: 'Tayla-Jade',
    rating: 5,
    date: 'Recent verified booking',
    content: 'Tayla-Jade gave me the best facial peel experience. My skin felt refreshed, clean, and radiant. The advice she gave for maintaining results at home was so thoughtful and realistic.',
  },
  {
    id: 'rev-4',
    author: 'Jessica T.',
    treatment: 'Luxury Dermaplane',
    practitioner: 'Sineád',
    rating: 5,
    date: 'Recent verified booking',
    content: 'The Luxury Dermaplane left my skin feeling like absolute silk. Makeup goes on seamlessly now and the hydration mask afterwards was so soothing. 10/10 recommend Teò Luxury Skincare!',
  },
  {
    id: 'rev-5',
    author: 'Hannah K.',
    treatment: 'HydroFacial',
    practitioner: 'Tayla-Jade',
    rating: 5,
    date: 'Recent verified booking',
    content: 'Unbelievable results from the HydroFacial. You can literally see the glow right away. Gentle, deeply relaxing, and the clinic atmosphere is pure luxury.',
  },
  {
    id: 'rev-6',
    author: 'Olivia B.',
    treatment: 'Teò Signature Facial',
    practitioner: 'Sineád',
    rating: 5,
    date: 'Recent verified booking',
    content: 'Sineád’s approach is so considered. She took time to understand my skin sensitivities before choosing the right actives. My complexion hasn’t looked this healthy in years.',
  },
];

export const TEAM: TeamMember[] = [
  {
    id: 'sinead',
    name: 'Sineád',
    role: 'Founder & Lead Aesthetician',
    bio: 'At the heart of Teò Luxury Skincare is Sineád’s deeply personal philosophy of considered client care. With a focus on understanding each client’s unique skin journey, she blends clinical precision with a warm, welcoming approach inside the Merton Abbey Mills clinic.',
    image: '/images/teo/team/sinead-founder.jpg',
    treatmentsFocus: ['Signature Facials', 'BioRePeel', 'Microneedling', 'Specialist Rejuvenation'],
  },
  {
    id: 'tayla-jade',
    name: 'Tayla-Jade',
    role: 'Skincare Practitioner',
    bio: 'Tayla-Jade brings meticulous care and genuine warmth to every treatment session. Mentioned consistently in client reviews for her thoughtful manner and attention to detail, she specializes in advanced facials and creating comforting, transformative client experiences.',
    image: '/images/teo/team/tayla-jade.jpg',
    treatmentsFocus: ['Chemical Peels', 'HydroFacial', 'Dermaplaning', 'Hydration Rituals'],
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Treatment Room',
    category: 'Clinic Sanctuary',
    image: '/images/teo/clinic/treatment-room.jpg',
    alt: 'Serene luxury treatment room at Teò Luxury Skincare with treatment couch and soft lighting',
  },
  {
    id: 'g-2',
    title: 'Precision Facial Therapy',
    category: 'Treatments',
    image: '/images/teo/treatments/signature-facial.jpg',
    alt: 'Bespoke facial massage and soothing application at Teò Luxury Skincare',
  },
  {
    id: 'g-3',
    title: 'Active Formulations',
    category: 'Skincare',
    image: '/images/teo/gallery/gallery-1.jpg',
    alt: 'High potency luxury skincare formulations and amber dropper bottles',
  },
  {
    id: 'g-4',
    title: 'Restorative LED Canopy',
    category: 'Advanced Care',
    image: '/images/teo/treatments/led-light-therapy.jpg',
    alt: 'Medical grade LED light therapy treatment session in calming atmosphere',
  },
  {
    id: 'g-5',
    title: 'Boutique Clinic Reception',
    category: 'Clinic Sanctuary',
    image: '/images/teo/clinic/clinic-interior.jpg',
    alt: 'Warm ivory and espresso aesthetic interior at Merton Abbey Mills clinic',
  },
  {
    id: 'g-6',
    title: 'Hydrating Botanical Mask',
    category: 'Treatments',
    image: '/images/teo/treatments/korean-facial.jpg',
    alt: 'Hydrating Korean glass skin facial mask application',
  },
  {
    id: 'g-7',
    title: 'Targeted Skin Needling',
    category: 'Aesthetics',
    image: '/images/teo/treatments/microneedling.jpg',
    alt: 'Professional microneedling treatment for texture and collagen support',
  },
  {
    id: 'g-8',
    title: 'Consultation Lounge',
    category: 'Client Care',
    image: '/images/teo/clinic/consultation-area.jpg',
    alt: 'Peaceful consultation area for personalized skin diagnostics',
  },
];
