import { useState, useEffect } from 'react';
import { Episode, Category } from '../types';

const WP_API_BASE = 'https://mrii.org/wp-json/wp/v2';

interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

interface WPPodcast {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  link: string;
  episode_description?: string;
  episode_transcript?: string;
  episode_player?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<WPTerm>>;
  };
}

function mapWPToEpisode(post: WPPodcast): Episode {
  const thumbnail =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80';

  const allTerms = (post._embedded?.['wp:term'] || []).flat();
  const categories = allTerms
    .filter(t => t.taxonomy === 'category')
    .map(t => t.id);

  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    link: post.link,
    thumbnail,
    categories,
    description: post.episode_description || '',
    transcript: post.episode_transcript || '',
    playerCode: post.episode_player || '',
  };
}

export function useEpisodes(perPage: number = 100) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchEpisodes() {
      try {
        const res = await fetch(
          `${WP_API_BASE}/podcast?_embed&per_page=${perPage}&orderby=date&order=desc`
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: WPPodcast[] = await res.json();
        if (!cancelled) {
          setEpisodes(data.map(mapWPToEpisode));
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
          setLoading(false);
        }
      }
    }

    fetchEpisodes();
    return () => { cancelled = true; };
  }, [perPage]);

  return { episodes, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const res = await fetch(`https://mrii.org/dev-mrii/index.php?rest_route=/wp/v2/categories&parent=21&per_page=100&orderby=name&order=asc`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setCategories(
            data.map((cat: any) => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              count: cat.count,
            }))
          );
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCategories();
    return () => { cancelled = true; };
  }, []);

  return { categories, loading };
}
