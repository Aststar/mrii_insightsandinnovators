import { useState, useEffect } from 'react';

const WP_API_URL = 'https://mrii.org/wp-json/wp/v2/podcast';

/**
 * Lazily fetches the full transcript for a single episode by post id.
 * Kept separate from `useEpisodes` so the large transcript (~40KB/episode)
 * is only loaded on the individual episode page, never in the list views.
 */
export function useEpisodeTranscript(id: number | undefined) {
  const [transcript, setTranscript] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id == null) {
      setTranscript('');
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${WP_API_URL}/${id}?_fields=episode_transcript`)
      .then(res => (res.ok ? res.json() : Promise.reject(new Error(`API error: ${res.status}`))))
      .then((data: { episode_transcript?: string }) => {
        if (!cancelled) {
          setTranscript(data.episode_transcript ?? '');
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { transcript, loading, error };
}
