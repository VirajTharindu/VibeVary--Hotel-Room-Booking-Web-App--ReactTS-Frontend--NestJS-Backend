import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import type { Room } from '../../types';
import { MagneticButton } from '../ui/MagneticButton';

interface BookingModalProps {
  selectedRoom: Room | null;
  onClose: () => void;
  onConfirm: (guestName: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ selectedRoom, onClose, onConfirm }) => {
  const [guestName, setGuestName] = useState('');
  
  if (!selectedRoom) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-lg bg-[#1a060e] border border-white/[0.06] rounded-3xl p-12 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-rose-500 to-brand-primary" />
          <h2 className="font-serif text-3xl mb-3 tracking-tight">Confirm Booking</h2>
          <p className="text-white/30 font-light mb-10 leading-relaxed text-lg">You are moments away from a world-class stay in Suite {selectedRoom.number}.</p>

          <div className="space-y-6 mb-12">
            <div>
              <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/[0.04]">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Suite Type</span>
              <span className="font-serif text-xl">{selectedRoom.type}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/[0.04]">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Nightly Rate</span>
              <span className="font-serif text-xl">${selectedRoom.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton className="flex-1">
              <button
                onClick={() => onConfirm(guestName || 'Esteemed Guest')}
                className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl text-[11px] font-medium tracking-[0.2em] uppercase transition-colors shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Confirm Reservation
              </button>
            </MagneticButton>
            <MagneticButton>
              <button
                onClick={onClose}
                className="p-4 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-2xl transition-colors shrink-0 border border-white/[0.04]"
              >
                <X className="w-5 h-5" />
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
