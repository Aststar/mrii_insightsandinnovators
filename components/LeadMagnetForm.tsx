
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Lock, Globe, BarChart2 } from 'lucide-react';

const LeadMagnetForm: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-gray-100"
        >
          {/* Visual Side */}
          <div className="lg:w-1/2 relative min-h-[400px] bg-gray-900">
            <img
              src="https://mrii.org/wp-content/uploads/2026/04/MRII-State-of-Market-Research-2026_April-2026.png"
              alt="The State of the Market Research Industry 2026 Report Cover"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent flex items-end p-12">
              <div className="max-w-xs">
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                  April 2026
                </span>
                <h3 className="text-2xl font-black text-white leading-tight mb-3">
                  Global Research Wave for 2026
                </h3>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-2 text-gray-200 text-xs font-medium">
                    <Globe size={14} className="text-primary shrink-0" />
                    Global tracking study
                  </div>
                  <div className="flex items-center gap-2 text-gray-200 text-xs font-medium">
                    <BarChart2 size={14} className="text-primary shrink-0" />
                    Career paths, skills gaps & attitudes
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                <Download size={12} />
                Free Report
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                <span className="text-primary">The State of the Market Research Industry:</span> Workforce Trends and the Rise of AI
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Get the global tracking study of Market Research and Insights professionals about their industry and the forces impacting their work and career prospects.
              </p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = 'https://mrii.org/research/thank-you';
              }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700">
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700">
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full lg:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3"
                >
                  <Download size={20} />
                  DOWNLOAD THE REPORT
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Lock size={12} />
                <span>Your information is secure and will never be shared.</span>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnetForm;
