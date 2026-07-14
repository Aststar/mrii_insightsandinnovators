import React from 'react';
import { motion } from 'framer-motion';

/**
 * Current podcast sponsor.
 * To swap sponsors, update these three values.
 * `logo` should be the WordPress Media "File URL" of the sponsor's logo
 * (open the image in Media Library → copy the "File URL" on the right).
 */
const SPONSOR = {
  name: 'ListenLabs',
  url: 'https://listenlabs.ai/',
  logo: 'https://mrii.org/wp-content/uploads/2026/07/ListenLabs.png',
};

const Sponsor: React.FC = () => {
  return (
    <section className="bg-white py-16 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-8"
        >
          Proudly Sponsored By
        </motion.p>

        <motion.a
          href={SPONSOR.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="inline-flex items-center justify-center"
          aria-label={`Visit our sponsor, ${SPONSOR.name}`}
        >
          {SPONSOR.logo ? (
            <img
              src={SPONSOR.logo}
              alt={`${SPONSOR.name} — podcast sponsor`}
              className="max-h-[216px] w-auto object-contain"
            />
          ) : (
            <span className="text-3xl font-black text-gray-900">{SPONSOR.name}</span>
          )}
        </motion.a>
      </div>
    </section>
  );
};

export default Sponsor;
