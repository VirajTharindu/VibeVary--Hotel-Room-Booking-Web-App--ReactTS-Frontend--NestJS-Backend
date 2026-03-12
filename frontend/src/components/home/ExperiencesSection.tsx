import * as React from 'react';
import { motion } from 'framer-motion';

export const ExperiencesSection: React.FC = () => {
  return (
    <section id="experiences" className="py-32 relative z-10 bg-[#0c0508] overflow-hidden">
      {/* Side Atmosphere Glows - Hardcoded Crimson for definitive branding */}
      <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[800px] h-[800px] bg-[#e11d48]/20 blur-[180px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[800px] h-[800px] bg-[#e11d48]/20 blur-[180px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />
      
      {/* Structural Vertical Accents at 1400px boundaries */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-[700px] w-px bg-gradient-to-b from-transparent via-[#e11d48]/30 to-transparent hidden xl:block z-10" />
      <div className="absolute inset-y-0 right-1/2 translate-x-[700px] w-px bg-gradient-to-b from-transparent via-[#e11d48]/30 to-transparent hidden xl:block z-10" />

      {/* Edge Vignette for depth */}
      <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-[#0c0508] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-80 bg-gradient-to-l from-[#0c0508] to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col items-center relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center">
          <p className="text-brand-primary text-xs lg:text-sm font-medium tracking-[0.4em] uppercase mb-6">Curated For You</p>
          <div className="h-[2px] w-24 bg-brand-primary shadow-[0_0_15px_rgba(244,63,94,0.5)] mb-8" />
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-8">Unforgettable<br />Experiences</h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">Immerse yourself in a world of refined indulgence, where every moment is crafted to perfection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-5xl">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group rounded-[2rem] overflow-hidden bg-[#080406] border border-white/[0.04] p-4 lg:p-6 pb-8 lg:pb-10 hover:bg-white/[0.02] transition-colors duration-500 shadow-2xl"
          >
            <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden mb-8">
              <img src="/spa.png" alt="Wellness Retreat" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-transparent to-transparent opacity-80" />
            </div>
            <div className="px-4 text-center">
              <h3 className="font-serif text-3xl mb-3">Wellness & Spa</h3>
              <p className="text-white/40 font-light leading-relaxed">Rejuvenate in our world-class spa with infinity pools and thermal baths.</p>
            </div>
          </motion.div>
          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group rounded-[2rem] overflow-hidden bg-[#080406] border border-white/[0.04] p-4 lg:p-6 pb-8 lg:pb-10 hover:bg-white/[0.02] transition-colors duration-500 shadow-2xl"
          >
            <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden mb-8">
              <img src="/dining.png" alt="Fine Dining" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-transparent to-transparent opacity-80" />
            </div>
            <div className="px-4 text-center">
              <h3 className="font-serif text-3xl mb-3">Fine Dining</h3>
              <p className="text-white/40 font-light leading-relaxed">A culinary journey crafted by Michelin-starred chefs using the finest ingredients.</p>
            </div>
          </motion.div>
          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group rounded-[2rem] overflow-hidden bg-[#080406] border border-white/[0.04] p-4 lg:p-6 pb-8 lg:pb-10 hover:bg-white/[0.02] transition-colors duration-500 shadow-2xl"
          >
            <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden mb-8">
              <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80" alt="Private Yacht Charter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-transparent to-transparent opacity-80" />
            </div>
            <div className="px-4 text-center">
              <h3 className="font-serif text-3xl mb-3">Private Yacht</h3>
              <p className="text-white/40 font-light leading-relaxed">Sail the coastline in ultimate luxury with our exclusive fleet of chartered yachts.</p>
            </div>
          </motion.div>
          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group rounded-[2rem] overflow-hidden bg-[#080406] border border-white/[0.04] p-4 lg:p-6 pb-8 lg:pb-10 hover:bg-white/[0.02] transition-colors duration-500 shadow-2xl"
          >
            <div className="relative h-[400px] rounded-[1.5rem] overflow-hidden mb-8">
              <img src="https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&q=80" alt="Helicopter Tour" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-transparent to-transparent opacity-80" />
            </div>
            <div className="px-4 text-center">
              <h3 className="font-serif text-3xl mb-3">Aerial Tours</h3>
              <p className="text-white/40 font-light leading-relaxed">Experience breathtaking panoramic views with our bespoke helicopter excursions.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
