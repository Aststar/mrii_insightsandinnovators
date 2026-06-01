
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Episode } from '../types';
import Visualizer from './Visualizer';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(episode.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link to={`/episode/${episode.slug}`} className="block">
      <motion.div
        className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[16/12] overflow-hidden">
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-xl"
            >
              <Play size={32} className="fill-current ml-1" />
            </motion.div>
          </div>

          {/* Visualizer on Hover */}
          <div className="absolute bottom-4 right-4">
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Visualizer count={6} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {episode.title}
          </h3>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <span className="text-xs text-gray-400 font-semibold">{formattedDate}</span>
            <span className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Listen Now
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default EpisodeCard;
