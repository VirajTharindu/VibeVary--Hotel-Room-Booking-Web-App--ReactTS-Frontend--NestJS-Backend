import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Inbox } from 'lucide-react';

interface NotificationsProps {
  notifications: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] cursor-pointer"
          />

          {/* Lateral Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#0c0508]/95 backdrop-blur-2xl border-l border-white/[0.05] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-[100] flex flex-col pt-24 pb-12 px-8"
          >
            {/* Ambient Background Glow in Panel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none select-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-brand-primary text-[10px] font-medium tracking-[0.4em] uppercase">VibeVary</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl tracking-tight">Notification Center</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pr-2">
              <AnimatePresence mode="popLayout">
                {notifications.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {notifications.map((msg, i) => (
                      <motion.div
                        key={`${msg}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-brand-primary/30 transition-all group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary/0 group-hover:bg-brand-primary/50 transition-all" />
                        
                        <div className="flex items-start gap-5">
                          <div className="mt-1 w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                          <div className="flex flex-col gap-2">
                            <span className="text-sm font-light leading-relaxed text-white/80 group-hover:text-white transition-colors">{msg}</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/20 font-medium">Just now</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center px-12 opacity-30"
                  >
                    <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-6">
                      <Inbox className="w-8 h-8 font-thin" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] font-medium">The sanctuary is silent</span>
                    <p className="mt-4 text-xs italic font-light">Your journey awaits its next movement.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Tip */}
            <div className="mt-auto pt-8 border-t border-white/[0.03] flex items-center gap-3 relative z-10">
              <Sparkles className="w-4 h-4 text-brand-primary opacity-50" />
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/20">Synced with your circadian flow</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
