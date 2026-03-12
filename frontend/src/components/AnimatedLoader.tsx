import * as React from 'react';
import { motion } from 'framer-motion';

const AnimatedLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[999] bg-[--color-background] flex items-center justify-center flex-col gap-6"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-primary to-rose-500 shadow-2xl shadow-brand-primary/40 flex items-center justify-center relative z-10"
        >
          <div className="w-8 h-8 rounded-md border-2 border-white/80" />
        </motion.div>
        <div className="absolute inset-0 bg-brand-primary/30 blur-xl rounded-full scale-150 animate-pulse" />
      </div>
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="font-serif text-white tracking-[0.2em] uppercase text-sm"
      >
        VibeVary
      </motion.p>
    </motion.div>
  );
};

export default AnimatedLoader;
