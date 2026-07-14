
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
  /**
   * Per-episode platform links, keyed by WP field name
   * (spotify, apple_podcasts, youtube, amazon_music, iheart_radio,
   * player_fm, podchaser, greenbook_network). Only includes keys that
   * have a value set on the episode; others fall back to generic show links.
   */
  platforms: Record<string, string>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
