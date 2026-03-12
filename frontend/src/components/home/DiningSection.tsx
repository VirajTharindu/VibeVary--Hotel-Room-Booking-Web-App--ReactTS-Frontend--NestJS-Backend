import * as React from 'react';
import { motion } from 'framer-motion';

export const DiningSection: React.FC = () => {
  return (
    <section id="dining" className="py-32 relative z-10 bg-[#080406] overflow-hidden">
      {/* Rose/Pink Background Sync - Intensified to match SuitesSection masterbrand */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/15 via-transparent to-rose-950/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Side Atmosphere Glows - Signature Rose/Pink */}
      <div className="absolute top-1/2 left-[-20%] -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/15 blur-[250px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-[-15%] w-[800px] h-[800px] bg-rose-600/10 blur-[200px] rounded-full pointer-events-none" />
      
      {/* Structural Vertical Accents */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-[700px] w-px bg-gradient-to-b from-transparent via-brand-primary/40 to-transparent hidden xl:block z-10" />
      <div className="absolute inset-y-0 right-1/2 translate-x-[700px] w-px bg-gradient-to-b from-transparent via-brand-primary/40 to-transparent hidden xl:block z-10" />

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <p className="text-brand-primary text-xs lg:text-sm font-medium tracking-[0.4em] uppercase mb-6">Gastronomy</p>
            <h2 className="font-serif text-5xl lg:text-7xl tracking-tight mb-8 leading-tight">Culinary<br />Artistry</h2>
            <div className="h-[1px] w-32 bg-brand-primary/50 mb-10" />
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-lg mb-12">
              Discover a sanctuary of taste where Michelin-starred innovation meets the world's rarest ingredients. Our chefs choreograph flavors into unforgettable masterpieces.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-serif text-2xl mb-2 opacity-90">The Atelier</h4>
                <p className="text-white/30 text-sm font-light">Intimate chef's table experience</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl mb-2 opacity-90">Sky Lounge</h4>
                <p className="text-white/30 text-sm font-light">Panoramic mixology & spirit</p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/[0.05] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" 
                alt="Fine Dining" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080406] via-transparent to-transparent opacity-60" />
            </motion.div>
            
            {/* Absolute floating detail image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute -bottom-10 -left-10 w-64 aspect-square rounded-3xl overflow-hidden border-4 border-[#080406] shadow-2xl z-20 hidden md:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80" 
                alt="Chef Plating" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
