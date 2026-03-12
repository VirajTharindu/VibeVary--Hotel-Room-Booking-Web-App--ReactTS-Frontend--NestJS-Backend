import * as React from 'react';
import { motion } from 'framer-motion';

export const WellnessSection: React.FC = () => {
  return (
    <section id="wellness" className="py-0 relative z-10 bg-[#0c0508] overflow-hidden border-t border-white/[0.04]">
      {/* Decorative Brand Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="font-serif text-[30vw] tracking-[-0.05em] leading-none uppercase">Sanctuary</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[90vh] lg:min-h-screen">
        {[
          {
            tag: "Restorative",
            title: "Zen Spa",
            desc: "Bespoke therapies choreographed to your biological rhythm.",
            img: "https://images.unsplash.com/photo-1544161515-4ae6ce6ca6bd?auto=format&fit=crop&q=80",
            delay: 0
          },
          {
            tag: "Equilibrium",
            title: "Hydro Haven",
            desc: "Thermal mineral baths overlooking the celestial horizon.",
            img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80",
            delay: 0.2
          },
          {
            tag: "Metaphysical",
            title: "Yoga Studio",
            desc: "Transcendental meditation in open-air scenic pavilions.",
            img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80", // Striking minimalist yoga silhouette with warm glow
            delay: 0.4
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: item.delay }}
            className="group relative overflow-hidden flex flex-col justify-end p-12 lg:p-20 border-r border-white/[0.04] last:border-r-0"
          >
            {/* Massive Background Image with Ken Burns effect */}
            <motion.div 
              className="absolute inset-0 z-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0508] via-[#0c0508]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: item.delay + 0.3 }}
              >
                <div className="w-8 h-px bg-brand-primary" />
                <span className="text-brand-primary text-[10px] font-medium tracking-[0.5em] uppercase">{item.tag}</span>
              </motion.div>
              
              <h3 className="font-serif text-5xl lg:text-6xl tracking-tight mb-6">{item.title}</h3>
              <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {item.desc}
              </p>

              <div className="overflow-hidden">
                <span className="inline-block text-[10px] font-medium tracking-[0.3em] uppercase text-white/20 group-hover:text-brand-primary transition-colors duration-500 cursor-pointer">Explore Journey ›</span>
              </div>
            </div>

            {/* Vertical Index Number */}
            <div className="absolute top-12 right-12 font-serif text-white/5 text-4xl lg:text-6xl select-none">
              0{index + 1}
            </div>
            
            {/* Rose Flare on Hover */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
