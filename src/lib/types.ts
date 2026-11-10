export type Language = "en" | "id";

export type ArtworkCategory =
  | "OC Universe"
  | "Illustrations"
  | "Pixel Playground"
  | "Random Creations"
  | "Experiments";

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  category: ArtworkCategory;
  year: string;
  thumbnail: string;
  image: string;
  frames?: string[];
  description: string;
  descriptionId?: string;
  tools: string[];
  featured: boolean;
  isPixelArt?: boolean;
  aspect?: "portrait" | "square" | "landscape";
  order: number;
}

export interface CreativeInterest {
  id: string;
  labelEn: string;
  labelId: string;
  noteEn: string;
  noteId: string;
}

export interface ToolItem {
  name: string;
  status: "confirmed" | "placeholder";
}

export interface ProfileData {
  artistName: string;
  nickname: string;
  handle: string;
  tagline: string;
  taglineId: string;
  mascotImage: string;
  avatarPlaceholderNote: string;
  interests: CreativeInterest[];
  tools: ToolItem[];
  journeyPlaceholderEn: string;
  journeyPlaceholderId: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  configured: boolean;
}

export interface CategoryMeta {
  label: string;
  tagline: string;
}

export interface Translations {
  nav: {
    home: string;
    portfolio: string;
    playground: string;
    about: string;
    contact: string;
  };
  hero: {
    badge: string;
    greeting: string;
    tagline: string;
    intro: string;
    primaryCta: string;
    secondaryCta: string;
    mascotCaption: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    empty: string;
  };
  playground: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allLabel: string;
    countSuffix: string;
    emptyCategory: string;
    categories: Record<ArtworkCategory, CategoryMeta>;
  };
  about: {
    eyebrow: string;
    title: string;
    introTitle: string;
    introBody: string;
    interestsTitle: string;
    approachTitle: string;
    approachBody: string;
    journeyTitle: string;
    toolsTitle: string;
    toolsNote: string;
    mascotCardLabel: string;
    mascotCardNote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    closing: string;
    configuredLabel: string;
    placeholderLabel: string;
  };
  lightbox: {
    close: string;
    previous: string;
    next: string;
    year: string;
    category: string;
    tools: string;
    toolsUnlisted: string;
    framesTitle: string;
    play: string;
    pause: string;
    frameLabel: string;
  };
  footer: {
    madeWith: string;
    rights: string;
  };
}
