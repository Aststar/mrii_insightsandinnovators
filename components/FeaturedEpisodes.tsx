
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import EpisodeCard from './EpisodeCard';
import { useEpisodes } from '../hooks/useEpisodes';

const FeaturedEpisodes: React.FC = () => {
  const { episodes, loading, error } = useEpisodes(6);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-primary/10 text-primary font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-4"
            >
              Latest Content
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4"
            >
              Featured Episodes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              The most impactful conversations from the forefront of global market research.
            </motion.p>
          </div>
          <Link to="/insights-and-innovators-podcast/allepisodes">
            <motion.span
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-primary font-bold text-lg hover:underline transition-all"
            >
              View All Episodes <ChevronRight size={24} />
            </motion.span>
          </Link>
        </div>

        {loading && (
          <div className="text-center py-20 text-gray-400 text-lg font-medium">
            Loading episodes...
          </div>
        )}

        {error && (
          <div className="text-center py-20 text-red-400 text-lg font-medium">
            Unable to load episodes. Please try again later.
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EpisodeCard episode={episode} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEpisodes;
