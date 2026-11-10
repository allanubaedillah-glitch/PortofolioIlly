import artworksRaw from "@/data/artworks.json";
import profileRaw from "@/data/profile.json";
import socialsRaw from "@/data/socials.json";
import enRaw from "@/data/translations/en.json";
import idRaw from "@/data/translations/id.json";
import type {
  Artwork,
  ArtworkCategory,
  Language,
  ProfileData,
  SocialLink,
  Translations,
} from "./types";

export const PLAYGROUND_CATEGORIES: ArtworkCategory[] = [
  "OC Universe",
  "Illustrations",
  "Pixel Playground",
  "Random Creations",
  "Experiments",
];

export const artworks: Artwork[] = (artworksRaw as Artwork[]).sort(
  (a, b) => a.order - b.order
);

export const featuredArtworks: Artwork[] = artworks.filter(
  (art) => art.featured
);

export const profile: ProfileData = profileRaw as ProfileData;

export const socials: SocialLink[] = socialsRaw as SocialLink[];

export const translations: Record<Language, Translations> = {
  en: enRaw as Translations,
  id: idRaw as Translations,
};

export function getArtworkDescription(
  artwork: Artwork,
  lang: Language
): string {
  if (lang === "id" && artwork.descriptionId) {
    return artwork.descriptionId;
  }
  return artwork.description;
}
