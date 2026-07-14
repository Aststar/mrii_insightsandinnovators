
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const topics = [
  {
    title: "AI & The Future of Research",
    description: "How AI, synthetic data, and digital twins are reshaping the insights toolkit.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    stats: "Trending topic",
    span: "lg:col-span-2",
    filter: "AI",
  },
  {
    title: "Strategic Leadership",
    description: "Moving from data reporting to strategic business partnership and C-Suite influence.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
    stats: "Leadership insights",
    span: "lg:col-span-1",
    filter: "Leadership",
  },
  {
    title: "Storytelling & Influence",
    description: "Soft skills for managing stakeholder resistance and turning data into business decisions.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
    stats: "Persuasion skills",
    span: "lg:col-span-1",
    filter: "Storytelling",
  },
  {
    title: "Methodologies & Innovation",
    description: "Next-gen technical methods, micro-surveys, and innovative data integration strategies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    stats: "Innovation driven",
    span: "lg:col-span-1",
    filter: "Innovation",
  },
  {
    title: "Career Development",
    description: "Lessons on leadership, entrepreneurship, and future-proofing your career in insights.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80",
    stats: "Career growth",
    span: "lg:col-span-1",
    filter: "Career Development",
  },
];

const KnowledgeVault: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 text-gray-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-6 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Top Episode Topics
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-gray-900">
            The Innovation <span className="text-primary italic">Knowledge Vault</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Explore expert discussions on the most important market research challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[2rem] p-8 border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${topic.span}`}
            >
              <div className="relative z-10 h-full flex flex-col items-start">
                <div className="mb-8 w-20 h-20 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-500 ring-4 ring-gray-50">
                  <img 
                    src={topic.image} 
                    alt={topic.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight text-gray-900 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-10 flex-grow max-w-md font-medium">
                  {topic.description}
                </p>
                
                <div className="w-full flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {topic.stats}
                  </span>
                  
                  <Link
                    to={`/insights-and-innovators-podcast/allepisodes?topic=${topic.filter}`}
                    className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors"
                  >
                    <span>Related Episodes</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* View Full Curriculum Card */}
          <Link to="/insights-and-innovators-podcast/allepisodes">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-1 rounded-[2rem] p-8 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/30 hover:bg-white transition-all h-full"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <ArrowRight size={24} />
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">View All Episodes</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeVault;
