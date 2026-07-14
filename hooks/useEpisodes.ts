import { useState, useEffect } from 'react';
import { Episode } from '../types';

const WP_API_URL = 'https://mrii.org/wp-json/wp/v2/podcast';

/** WP field names for the per-episode platform links. */
const PLATFORM_FIELD_KEYS = [
  'spotify',
  'apple_podcasts',
  'youtube',
  'amazon_music',
  'iheart_radio',
  'player_fm',
  'podchaser',
  'greenbook_network',
] as const;

interface WPPodcast {
  id: number;
  title: { rendered: string };
  slug: string;
  date: string;
  link: string;
  episode_player?: string;
  episode_description?: string;
  /** ACF values when exposed under the `acf` key; an empty array when none. */
  acf?: Record<string, unknown> | unknown[];
  /** Per-episode platform links when exposed as top-level REST fields. */
  [key: string]: unknown;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

/**
 * Read a custom field from a WP REST record, whether it's exposed as a
 * top-level field (register_post_meta) or under the `acf` object
 * (ACF "Show in REST API"). Returns a trimmed string, or '' if unset.
 */
function readField(post: WPPodcast, key: string): string {
  const acf = !Array.isArray(post.acf) ? (post.acf as Record<string, unknown> | undefined) : undefined;
  const raw = (post[key] ?? acf?.[key] ?? '') as unknown;
  return typeof raw === 'string' ? raw.trim() : '';
}

/**
 * WordPress returns titles HTML-encoded (e.g. `Colgate&#8217;s`, `Q&amp;A`).
 * The title is rendered as plain text, so decode the entities first.
 */
function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
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

  const platforms: Record<string, string> = {};
  for (const key of PLATFORM_FIELD_KEYS) {
    const url = readField(post, key);
    if (url) platforms[key] = url;
  }

  return {
    id: post.id,
    title: decodeHtmlEntities(post.title.rendered),
    slug: post.slug,
    date: post.date,
    link: post.link,
    thumbnail,
    // Per-episode player: prefer the newer `embed_code` (Captivate iframe),
    // fall back to the legacy `episode_player` field.
    playerUrl:
      extractPlayerUrl(readField(post, 'embed_code')) ||
      extractPlayerUrl(post.episode_player),
    description: post.episode_description ?? '',
    platforms,
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
            `&_fields=id,title,slug,date,link,episode_player,embed_code,episode_description,acf,` +
            `${PLATFORM_FIELD_KEYS.join(',')},_links,_embedded`
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
