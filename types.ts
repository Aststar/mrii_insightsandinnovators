
export interface Episode {
  id: number;
  title: string;
  slug: string;
  date: string;
  link: string;
  thumbnail: string;
  /** Per-episode player embed URL (e.g. Captivate), extracted from WP `episode_player`. Null if none set. */
  playerUrl: string | null;
  /** Episode show-notes HTML from WP `episode_description`. Empty string if none set. */
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
