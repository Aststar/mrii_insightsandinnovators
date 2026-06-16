
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Cpu, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeepDiveSEO: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Mastering the Future of <span className="text-primary">Global Insights</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              Market Research Institute International (MRII) offers the industry's premier online market research education
              and content to develop the skills and capabilities of research professionals, research teams, and large organizations.
            </p>
          </motion.div>
        </div>

        {/* "Why Listen" Feature Block */}
        <div className="bg-gray-50 rounded-[3rem] p-8 lg:p-12 mb-24 border border-gray-100 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Market Research Professionals Listen</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                In an industry shaped by rapid technology shifts, staying ahead requires more than just data—it requires perspective.
                Market research professionals listen to the <strong>Insights & Innovators</strong> podcast to bridge the gap between
                technical execution and strategic influence. We provide the high-level dialogue to master your craft and lead with
                confidence in a complex global market.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "AI Integration",
                  "Strategic Influence",
                  "Advanced Methodology",
                  "Data Storytelling"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-full min-h-[400px]"
            >
               <img 
                 src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80" 
                 alt="Professional Podcast Studio" 
                 className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl"
               />
               <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-black/10"></div>
            </motion.div>
          </div>
        </div>

        {/* Detailed Features - Alternating Layout */}
        <div className="space-y-24 mb-24">
          
          {/* Feature 1: AI */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80" 
                   alt="Data Analytics Dashboard" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
               </div>
               {/* Floating Icon */}
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border border-gray-50">
                 <Cpu className="text-primary w-full h-full" strokeWidth={1.5} />
               </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Cpu className="text-primary" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">AI & Automation in Research</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Generative AI isn't just a buzzword; it's a fundamental shift in how we gather and interpret data. 
                Our episodes breakdown complex AI topics into actionable strategies for reshaping survey design, 
                sentiment analysis, and reporting speeds.
              </p>
              <Link to="/insights-innovators-new/allepisodes?topic=AI" className="text-primary font-bold hover:underline flex items-center gap-2">
                Listen to AI Episodes <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
          </div>

          {/* Feature 2: Strategy */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Strategic Leadership</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Moving from "data provider" to "strategic partner" is the ultimate goal for insights departments.
                Hear directly from VPs and Directors at Fortune 500 companies on how to turn raw data into 
                business-critical strategy that influences the C-suite.
              </p>
              <Link to="/insights-innovators-new/allepisodes?topic=Leadership" className="text-blue-600 font-bold hover:underline flex items-center gap-2">
                Explore Leadership Series <span aria-hidden="true">&rarr;</span>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                   alt="Strategic Board Meeting" 
                   className="w-full h-full object-cover"
                 />
               </div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border border-gray-50">
                 <Users className="text-blue-600 w-full h-full" strokeWidth={1.5} />
               </div>
            </motion.div>
          </div>

           {/* Feature 3: Global Standards */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                   alt="Global Connectivity" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
               </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border border-gray-50">
                 <Globe className="text-green-600 w-full h-full" strokeWidth={1.5} />
               </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-green-600" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Global Certification Standards</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                As the industry evolves, so do the standards of excellence. Our market-leading educational courses,
                offered in partnership with the University of Georgia and The Market Research Society (UK), are always
                updated and endorsed by leading national and international organizations.
              </p>
              <a href="https://mrii.org/course-catalog-overview/" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:underline flex items-center gap-2">
                View Certification Info <span aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Years of Excellence", value: "30+", color: "bg-gray-50 text-primary" },
            { label: "Professionals Trained", value: "10k+", color: "bg-primary text-white" },
            { label: "Countries", value: "114", color: "bg-gray-900 text-white" },
            { label: "YouTube Subscribers", value: "80k", color: "bg-gray-50 text-gray-900" }
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} p-6 md:p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg hover:transform hover:scale-105 transition-transform duration-300`}>
              <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default DeepDiveSEO;
