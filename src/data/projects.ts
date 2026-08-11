export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  slug: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  year: string;
  accentColor: string;
  bgHex: string;
  textHex: string;
  tagline: string;
  href: string;
  layoutType: 'feature' | 'split-left' | 'split-right' | 'horizontal' | 'offset' | 'vertical-tall' | 'vertical-wide' | 'finale';
  aspectRatio: string;
}

export const PROJECTS: Project[] = [
  {
    id: "coca-cola",
    number: "01",
    title: "COCA-COLA",
    client: "The Coca-Cola Company",
    category: "Brand Experience / Campaign Website",
    slug: "coca-cola",
    tagline: "Refreshment in Motion",
    description: "An energetic digital experience built around movement, refreshment and the unmistakable personality of the brand.",
    fullDescription: "A campaign digital experience engineered to translate Coca-Cola's iconic brand heritage into a tactile, responsive web interface. Combining high-velocity typography, dynamic fluid visual transitions, and immersive sound design cues.",
    challenge: "Translating a world-renowned physical product into a digital experience that feels as crisp, energetic, and immediate as opening an ice-cold bottle.",
    solution: "We designed a high-contrast editorial campaign experience with oversized kinetic typography, micro-interactions mimicking fluid motion, and an interactive flavor wheel exhibit.",
    deliverables: ["Art Direction", "Interactive Campaign", "Fluid UI Architecture", "Performance Tuning"],
    year: "2026",
    accentColor: "#F40009",
    bgHex: "#110505",
    textHex: "#FFFFFF",
    href: "/projects/coca-cola",
    layoutType: "feature",
    aspectRatio: "aspect-[16/9]"
  },
  {
    id: "nike",
    number: "02",
    title: "NIKE",
    client: "Nike Performance Lab",
    category: "Performance / Product Experience",
    slug: "nike",
    tagline: "Speed & Structure",
    description: "A dramatic athletic editorial platform focused on movement, innovation and high-performance product storytelling.",
    fullDescription: "An athletic editorial showcase designed to express raw physical power and engineering precision. Built with stark monochromatic contrast, high-speed product breakdown frames, and athlete performance data overlays.",
    challenge: "Designing a product feature that communicates motion and technical engineering without cluttering the aesthetic.",
    solution: "A minimalist sports grid utilizing monochrome photography, technical spec typography, and high-frequency reveal interactions.",
    deliverables: ["Product Storytelling", "High-Contrast UI", "Motion Design", "Mobile Optimization"],
    year: "2026",
    accentColor: "#E0E0E0",
    bgHex: "#0D0D0D",
    textHex: "#F5F5F5",
    href: "/projects/nike",
    layoutType: "split-left",
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "beauty-store",
    number: "03",
    title: "BEAUTY STORE",
    client: "AURA Botanical Skincare",
    category: "Beauty / Ecommerce",
    slug: "beauty-store",
    tagline: "Tactile Luxury",
    description: "A serene, tactile ecommerce platform designed with natural palettes, soft lighting and sophisticated editorial layouts.",
    fullDescription: "A modern luxury skincare storefront centered on tranquility, purity, and sensory elegance. Replaces typical aggressive ecommerce badges with calm editorial photography and intuitive ingredient exploration.",
    challenge: "Creating a luxury shopping experience that feels calming and organic while still achieving strong conversion mechanics.",
    solution: "Warm neutral tones, generous whitespace, understated serif and sans pairings, and seamless bag-to-checkout flows.",
    deliverables: ["Brand Identity Direction", "Headless Ecommerce", "Ingredient Explorer", "Responsive Design"],
    year: "2025",
    accentColor: "#C9B6A1",
    bgHex: "#F7F5F0",
    textHex: "#2C2926",
    href: "/projects/beauty-store",
    layoutType: "split-right",
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "ecommerce",
    number: "04",
    title: "FORM / MARKET",
    client: "Form Objects",
    category: "Ecommerce Experience",
    slug: "ecommerce",
    tagline: "Curated Utility",
    description: "A contemporary general ecommerce concept focused on object design, clear structural hierarchy and effortless shopping.",
    fullDescription: "A structured, minimal commerce platform built for modern industrial design and lifestyle objects. Engineered with instant filtering, high-density product grids, and effortless detail previews.",
    challenge: "Presenting a broad catalog of varied design objects while maintaining a disciplined, museum-grade aesthetic.",
    solution: "Clean grid architecture, dark mode sub-views, and tactile category filtering with real-time stock feedback.",
    deliverables: ["Catalog Architecture", "Fast Search & Filter", "Cart & Checkout Flow", "Design System"],
    year: "2026",
    accentColor: "#3B4CCA",
    bgHex: "#F2F0EB",
    textHex: "#141414",
    href: "/projects/ecommerce",
    layoutType: "horizontal",
    aspectRatio: "aspect-[21/9]"
  },
  {
    id: "hospital",
    number: "05",
    title: "DHANWANTARI",
    client: "Dhanwantari Specialty Healthcare",
    category: "Healthcare / Institutional Website",
    slug: "hospital",
    tagline: "Human-Centered Care",
    description: "A modern, comforting healthcare website that elevates patient confidence with clear structure, warm tones and human warmth.",
    fullDescription: "A humanized digital portal for a premier medical institution. Replaces clinical coldness with warm architectural photography, reassuring doctor profiles, and effortless appointment scheduling.",
    challenge: "Transforming complex medical information and multi-department scheduling into an empathetic, easy-to-navigate web portal.",
    solution: "Soothing sage and slate palette, clear department navigation, instant emergency contact access, and empathetic typography.",
    deliverables: ["UX Information Architecture", "Doctor Directory", "Appointment Engine", "WCAG AA Accessibility"],
    year: "2026",
    accentColor: "#2E5A44",
    bgHex: "#F4F7F4",
    textHex: "#1B2A23",
    href: "/projects/hospital",
    layoutType: "offset",
    aspectRatio: "aspect-[16/10]"
  },
  {
    id: "burger-place",
    number: "06",
    title: "STACKED",
    client: "Stacked Artisanal Burgers",
    category: "Restaurant / Food Experience",
    slug: "burger-place",
    tagline: "Bold Craft Culinary",
    description: "A vibrant, appetizing restaurant digital showcase with rich food photography, interactive menus and instant ordering.",
    fullDescription: "A high-taste culinary experience built for an artisanal burger brand. Combining smoky dark background tones, mouth-watering imagery, and an interactive custom burger stacker.",
    challenge: "Making a digital restaurant site feel irresistible and premium without adopting cheap fast-food tropes.",
    solution: "Dramatic food lighting, tactile typography, seamless online ordering integration, and custom location finder.",
    deliverables: ["Visual Identity Cues", "Interactive Menu", "Order Integration", "Location & Hours Hub"],
    year: "2025",
    accentColor: "#E65100",
    bgHex: "#141110",
    textHex: "#F9F6F0",
    href: "/projects/burger-place",
    layoutType: "vertical-tall",
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "travel",
    number: "07",
    title: "ROAM",
    client: "Roam Expeditions & Retreats",
    category: "Travel / Experience Platform",
    slug: "travel",
    tagline: "Curated Destinations",
    description: "An immersive travel platform featuring expansive landscape photography, editorial itineraries and quiet luxury.",
    fullDescription: "An inspirational expedition platform designed to evoke wanderlust through majestic photography, narrative travel guides, and bespoke itinerary booking.",
    challenge: "Balancing high-resolution visual storytelling with lightning-fast load times and seamless trip planning.",
    solution: "Expansive full-screen imagery, editorial travelogue typography, responsive map integration, and curated destination previews.",
    deliverables: ["Destination Discovery UI", "Itinerary Builder", "Editorial Layouts", "Performance Tuning"],
    year: "2026",
    accentColor: "#2C5282",
    bgHex: "#EFF4F8",
    textHex: "#1A202C",
    href: "/projects/travel",
    layoutType: "vertical-wide",
    aspectRatio: "aspect-[4/5]"
  },
  {
    id: "construction",
    number: "08",
    title: "FORMWORK",
    client: "Formwork Structural Studio",
    category: "Construction / Architecture",
    slug: "construction",
    tagline: "Concrete & Precision",
    description: "A sophisticated architectural and construction showcase highlighting structural engineering, materials and spatial design.",
    fullDescription: "A refined studio portfolio built for a leading architectural construction firm. Emphasizes material honesty, precise grid alignment, structural project archives, and corporate credibility.",
    challenge: "Communicating heavy engineering capability while maintaining aesthetic elegance and architectural sophistication.",
    solution: "Raw stone and concrete tones, blueprint overlay accents, strict grid layouts, and comprehensive project case study frameworks.",
    deliverables: ["Architectural Archive", "Blueprint Interactivity", "Company Credibility Hub", "B2B Contact Flow"],
    year: "2026",
    accentColor: "#525252",
    bgHex: "#ECEAE6",
    textHex: "#1C1C1C",
    href: "/projects/construction",
    layoutType: "finale",
    aspectRatio: "aspect-[16/9]"
  }
];

export const CAPABILITIES = [
  {
    number: "01",
    title: "WEBSITES",
    subtitle: "Bespoke Brand Platforms",
    description: "From focused business sites to fully art-directed digital experiences.",
    previewProjectSlug: "hospital"
  },
  {
    number: "02",
    title: "STORES",
    subtitle: "Ecommerce Platforms",
    description: "Online shops designed around products, people and conversion.",
    previewProjectSlug: "ecommerce"
  },
  {
    number: "03",
    title: "EXPERIENCES",
    subtitle: "High-Interaction Interfaces",
    description: "Interfaces that feel like more than another webpage.",
    previewProjectSlug: "nike"
  },
  {
    number: "04",
    title: "CAMPAIGNS",
    subtitle: "Launch & Brand Moments",
    description: "Digital spaces built around an idea, launch or story.",
    previewProjectSlug: "coca-cola"
  },
  {
    number: "05",
    title: "DIGITAL WORLDS",
    subtitle: "Immersive Studio Environments",
    description: "Websites that give a brand somewhere to live.",
    previewProjectSlug: "travel"
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "THE IDEA",
    description: "You bring the thought. We figure out what it could become.",
    detail: "We unpack your concept, identify what makes it distinct, and define the scope of the digital experience."
  },
  {
    number: "02",
    title: "THE DIRECTION",
    description: "We shape the visual language, structure and experience around it.",
    detail: "We establish typography, spatial layout, art direction, and interaction hierarchy for maximum clarity."
  },
  {
    number: "03",
    title: "THE BUILD",
    description: "We turn the direction into a fast, responsive, polished website.",
    detail: "We engineer performant, WCAG accessible, responsive bespoke code with smooth motion and micro-interactions."
  },
  {
    number: "04",
    title: "THE LAUNCH",
    description: "We refine the details and put the finished experience into the world.",
    detail: "We polish performance, double-check responsive behavior across devices, and deploy your site smoothly."
  }
];
