
export interface Episode {
  id: number;
  title: string;
  slug: string;
  date: string;
  link: string;
  thumbnail: string;
  categories: number[];
  description: string;
  transcript: string;
  playerCode: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}
