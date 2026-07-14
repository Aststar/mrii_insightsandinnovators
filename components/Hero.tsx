
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Disc, Radio, Music, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            width: Math.random() * 10 + 5, 
            height: Math.random() * 10 + 5 
          }}
          animate={{
            y: "-10%",
            x: [null, (Math.random() - 0.5) * 10 + 50 + "%"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-6 pb-16 lg:pt-10 lg:pb-24">
      <Particles />
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">New Episodes Every Thursday</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[0.95] mb-6 tracking-tighter">
              Hear <span className="text-primary">Insights</span><br/>
              <span className="text-gray-400">&</span> <span className="text-primary">Innovators</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed font-medium">
              Join MRII and industry leaders as we explore the future of market research, AI-driven practices, and the evolution of consumer behavior.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('platforms')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-primary/40"
              >
                <Play className="fill-current" size={24} />
                START LISTENING
              </motion.button>
              <Link to="/insights-and-innovators-podcast/allepisodes" className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-primary text-gray-900 px-8 py-5 rounded-2xl font-bold text-lg transition-all">
                Browse Archive
              </Link>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-black text-gray-900 leading-none uppercase tracking-wider">Top Rated Podcast</p>
              <div className="flex text-primary gap-1">
                {[1, 2, 3, 4, 5].map(s => <Sparkles key={s} size={10} fill="currentColor" />)}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            {/* Main Image Frame */}
            <motion.div 
              className="relative bg-white p-4 rounded-[2.5rem] shadow-2xl z-20 border border-gray-50"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80"
                alt="Professional Microphone"
                className="rounded-[2rem] w-full aspect-[4/5] object-cover"
              />
              
            </motion.div>

            {/* Background Decorative Disk */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -left-10 w-48 h-48 bg-primary/5 rounded-full border-2 border-dashed border-primary/20 flex items-center justify-center -z-10"
            >
              <Disc className="text-primary/10" size={100} />
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
