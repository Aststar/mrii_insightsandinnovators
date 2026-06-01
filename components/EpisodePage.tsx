
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Globe,
  Radio,
  Heart,
  Share2,
  Youtube,
  Headphones,
  Music,
  ChevronDown,
  ChevronUp,
  FileText,
  Mic,
} from 'lucide-react';
import { useEpisodes } from '../hooks/useEpisodes';

const PLATFORM_LINKS = [
  {
    name: 'Spotify',
    icon: <Music size={18} />,
    color: '#1DB954',
    url: 'https://open.spotify.com/show/4EyJeQzhfWNJaRJDU8i8Cm',
  },
  {
    name: 'Apple Podcasts',
    icon: <Headphones size={18} />,
    color: '#9933CC',
    url: 'https://podcasts.apple.com/us/podcast/insights-innovators-podcast-from-mrii/id1765372856',
  },
  {
    name: 'YouTube',
    icon: <Youtube size={18} />,
    color: '#FF0000',
    url: 'https://www.youtube.com/watch?v=oyg0YR93koQ&list=PL9ZbKlSKSGAWsggyyom2NRoQO1V1_UstK',
  },
  {
    name: 'Amazon Music',
    icon: <Music size={18} />,
    color: '#00A8E1',
    url: 'https://music.amazon.com/podcasts/312fed45-d03e-4553-89c8-12cfb9bab3a2/insights-innovators-podcast-from-mrii',
  },
  {
    name: 'iHeart Radio',
    icon: <Heart size={18} />,
    color: '#C6002B',
    url: 'https://www.iheart.com/podcast/1323-insights-innovators-podca-212284235/',
  },
  {
    name: 'Player FM',
    icon: <Radio size={18} />,
    color: '#F39C12',
    url: 'https://player.fm/series/3597609',
  },
  {
    name: 'Podchaser',
    icon: <Share2 size={18} />,
    color: '#B244D7',
    url: 'https://www.podchaser.com/podcasts/insights-innovators-podcast-fr-5826762',
  },
  {
    name: 'Greenbook Network',
    icon: <Globe size={18} />,
    color: '#1A4A5E',
    url: 'https://www.greenbook.org/podcast-network/insights-innovators-podcast',
  },
];

/** Extract the Captivate iframe src from the raw embed HTML stored in WP meta */
function extractCaptivateEmbedSrc(playerCode: string): string | null {
  if (!playerCode) return null;
  const match = playerCode.match(/src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

const EpisodePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { episodes, loading, error } = useEpisodes(100);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const episode = episodes.find(ep => ep.slug === slug);

  const formattedDate = episode
    ? new Date(episode.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const captivateEmbedSrc = episode ? extractCaptivateEmbedSrc(episode.playerCode) : null;

  if (loading) {
    return (
      <section className="py-24 min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-gray-400 text-lg font-medium">
          Loading episode...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 text-red-400 text-lg font-medium">
          Unable to load episode. Please try again later.
        </div>
      </section>
    );
  }

  if (!episode) {
    return (
      <section className="py-24 min-h-screen bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Episode Not Found</h1>
          <p className="text-gray-600 mb-8">The episode you're looking for doesn't exist.</p>
          <Link
            to="/allepisodes"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
          >
            <ArrowLeft size={18} /> Browse All Episodes
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50/50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/[0.05] rounded-full" />
          <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120Z" fill="rgb(249 250 251 / 0.5)" />
            <path d="M0,90 C300,110 600,60 900,90 C1100,105 1300,95 1440,90 L1440,120 L0,120Z" fill="rgb(249 250 251)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/allepisodes"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={16} /> All Episodes
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Episode
            </span>
            <span className="flex items-center gap-1.5 text-white/70 text-sm">
              <Calendar size={14} />
              {formattedDate}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-3xl"
          >
            {episode.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-sm font-medium"
          >
            Insights &amp; Innovators Podcast from MRII
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-24">

        {/* Captivate Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 md:p-8">
            {captivateEmbedSrc ? (
              <iframe
                src={captivateEmbedSrc}
                width="100%"
                height="200"
                frameBorder="0"
                scrolling="no"
                title="Podcast Player"
                style={{ borderRadius: '12px', display: 'block' }}
              />
            ) : (
              <div className="flex items-center gap-4 py-6 px-4 bg-gray-50 rounded-xl text-gray-500 text-sm font-medium">
                <Headphones size={24} className="text-primary shrink-0" />
                <span>Player not available for this episode — use the links below to listen on your favourite platform.</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Show Notes */}
        {episode.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Show Notes</h2>
                <p className="text-gray-400 text-sm">Episode summary &amp; resources</p>
              </div>
            </div>
            <div
              className="prose prose-gray max-w-none text-gray-700 leading-relaxed episode-description"
              dangerouslySetInnerHTML={{ __html: episode.description }}
            />
          </motion.div>
        )}

        {/* Transcript */}
        {episode.transcript && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-8 overflow-hidden"
          >
            <button
              onClick={() => setTranscriptOpen(prev => !prev)}
              className="w-full flex items-center gap-3 p-6 md:px-8 md:py-6 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mic size={20} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                  Full Transcript
                </h2>
                <p className="text-gray-400 text-sm">Complete episode transcript with timestamps</p>
              </div>
              <span className="text-gray-400 group-hover:text-primary transition-colors">
                {transcriptOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </span>
            </button>

            <AnimatePresence>
              {transcriptOpen && (
                <motion.div
                  key="transcript"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-6 md:px-8 pb-8 pt-2 border-t border-gray-100">
                    <div
                      className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-sm episode-transcript"
                      dangerouslySetInnerHTML={{ __html: episode.transcript }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Listen & Subscribe Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8"
        >
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            Listen &amp; Subscribe
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PLATFORM_LINKS.map(platform => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
              >
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: platform.color }}
                >
                  {React.cloneElement(platform.icon, { size: 14 })}
                </span>
                <span className="group-hover:text-gray-900 transition-colors text-xs">
                  {platform.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* More Episodes */}
        {episodes.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900">More Episodes</h2>
              <Link
                to="/allepisodes"
                className="text-primary font-bold text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {episodes
                .filter(ep => ep.id !== episode.id)
                .slice(0, 3)
                .map((ep, index) => (
                  <motion.div
                    key={ep.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Link to={`/episode/${ep.slug}`} className="block group">
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={ep.thumbnail}
                            alt={ep.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 line-clamp-2 text-sm group-hover:text-primary transition-colors">
                            {ep.title}
                          </h3>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(ep.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EpisodePage;
