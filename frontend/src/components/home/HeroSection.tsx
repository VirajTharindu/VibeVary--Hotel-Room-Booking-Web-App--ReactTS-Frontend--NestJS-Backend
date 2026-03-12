import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  onReserveClick: () => void;
}

const HERO_IMAGES = [
  '/hero.png',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onReserveClick }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={HERO_IMAGES[currentIndex]}
            src={HERO_IMAGES[currentIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Luxury Resort"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0508] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col items-center mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center mb-10"
        >
          <p className="text-brand-primary text-xs lg:text-sm font-medium tracking-[0.4em] uppercase mb-6">The Pinnacle of Luxury</p>
          <div className="h-[2px] w-24 bg-brand-primary shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
        </motion.div>
        
        <h1 className="hero-title font-serif text-6xl sm:text-7xl lg:text-[8rem] leading-[1] tracking-tight mb-14">
          <div className="overflow-hidden"><span className="inline-block relative drop-shadow-lg">Where Elegance</span></div>
          <div className="overflow-hidden"><span className="inline-block relative text-white/90 drop-shadow-lg">Meets <em className="italic font-light text-brand-primary mix-blend-screen">Excellence.</em></span></div>
        </h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <MagneticButton>
            <button
              onClick={onReserveClick}
              className="group relative px-12 py-6 md:px-14 md:py-7 bg-brand-primary overflow-hidden rounded-full font-medium tracking-[0.2em] uppercase transition-all duration-500 shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:shadow-[0_0_80px_rgba(244,63,94,0.6)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-4 text-white text-sm lg:text-base">
                Reserve Your Stay
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </MagneticButton>
          
          <div className="flex items-center gap-4 text-white/80 text-sm lg:text-base font-light mt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary animate-pulse shadow-[0_0_10px_rgba(251,113,133,0.8)]" />
            <span>Only 2 Royal Suites Available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
