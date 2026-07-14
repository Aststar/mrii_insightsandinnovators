
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Headphones, Radio, Globe, Heart, Share2, Youtube } from 'lucide-react';

const platforms = [
  { name: 'Spotify', icon: <Music size={24} />, color: '#1db954', url: 'https://open.spotify.com/show/4EyJeQzhfWNJaRJDU8i8Cm' },
  { name: 'Apple Podcasts', icon: <Headphones size={24} />, color: '#9933cc', url: 'https://podcasts.apple.com/us/podcast/insights-innovators-podcast-from-mrii/id1765372856' },
  { name: 'YouTube', icon: <Youtube size={24} />, color: '#ff0000', url: 'https://www.youtube.com/playlist?list=PL9ZbKlSKSGAWsggyyom2NRoQO1V1_UstK' },
  { name: 'Amazon Music', icon: <Music size={24} />, color: '#00a8e1', url: 'https://music.amazon.com/podcasts/312fed45-d03e-4553-89c8-12cfb9bab3a2/insights-innovators-podcast-from-mrii' },
  { name: 'iHeart Radio', icon: <Heart size={24} />, color: '#c60030', url: 'https://www.iheart.com/podcast/1323-insights-innovators-podca-212284235/' },
  { name: 'Player FM', icon: <Radio size={24} />, color: '#f39c12', url: 'https://player.fm/series/3597609' },
  { name: 'Podchaser', icon: <Share2 size={24} />, color: '#b244d7', url: 'https://www.podchaser.com/podcasts/insights-innovators-podcast-fr-5826762' },
  { name: 'Greenbook Network', icon: <Globe size={24} />, color: '#1a4a5e', url: 'https://www.greenbook.org/podcast-network/insights-innovators-podcast' }
];

const PodcastPlatforms: React.FC = () => {
  return (
    <section id="platforms" className="bg-gray-50/80 py-24 border-b border-gray-100 relative overflow-hidden">
      {/* Background decoration - subtle moving wave */}
      <motion.div 
        className="absolute top-0 left-0 w-[200%] h-full opacity-[0.03] pointer-events-none"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0 50 Q 125 0 250 50 T 500 50 T 750 50 T 1000 50" fill="none" stroke="#eb2d3f" strokeWidth="2" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-4">
            Available on Your <span className="text-primary">Favorite Platforms</span>
          </h2>
          <p className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-8">Select an app to listen and subscribe</p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-2 w-32 bg-primary mx-auto rounded-full mb-16"
          />
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial="initial"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={{
                initial: { opacity: 0, y: 20, scale: 0.95 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1, duration: 0.5 } 
                },
                hover: { y: -8, scale: 1.05 }
              }}
              className="flex items-center gap-4 px-10 py-6 bg-white shadow-xl border border-gray-100 rounded-[2rem] transition-all relative overflow-hidden group"
            >
              {/* Dynamic Background Fill */}
              <motion.div
                className="absolute inset-0 z-0"
                variants={{
                  initial: { backgroundColor: '#ffffff' },
                  hover: { backgroundColor: platform.color }
                }}
              />

              {/* Icon Container with specific color logic to prevent "disappearing" */}
              <motion.div 
                className="relative z-10 flex items-center justify-center"
                variants={{
                  initial: { color: platform.color, scale: 1 },
                  hover: { color: '#ffffff', scale: 1.2 }
                }}
              >
                {platform.icon}
              </motion.div>
              
              {/* Text with color transition */}
              <motion.span 
                className="text-lg font-black relative z-10 whitespace-nowrap"
                variants={{
                  initial: { color: '#1f2937' },
                  hover: { color: '#ffffff' }
                }}
              >
                {platform.name}
              </motion.span>

              {/* Subtle glass shine animation on hover */}
              <motion.div
                className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-[-25deg] z-20 pointer-events-none"
                variants={{
                  initial: { left: '-100%' },
                  hover: { left: '150%' }
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastPlatforms;
