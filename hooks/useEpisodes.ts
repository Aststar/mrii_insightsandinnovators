import { useState, useEffect } from 'react';
import { Episode } from '../types';

const WP_API_URL = 'https://mrii.org/wp-json/wp/v2/podcast';

interface WPPodcast {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  link: string;
  episode_player?: string;
  episode_description?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

/** Pull the iframe `src` out of the WP `episode_player` HTML blob. Returns null if none found. */
function extractPlayerUrl(html?: string): string | null {
  if (!html) return null;
  const match = html.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function mapWPToEpisode(post: WPPodcast): Episode {
  const thumbnail =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80';

  return {
    id: post.id,
    title: post.title.rendered,
    slug: post.slug,
    date: post.date,
    link: post.link,
    thumbnail,
    playerUrl: extractPlayerUrl(post.episode_player),
    description: post.episode_description ?? '',
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
          `${WP_API_URL}?_embed&per_page=${perPage}&orderby=date&order=desc` +
            `&_fields=id,title,slug,date,link,episode_player,episode_description,_links,_embedded`
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
