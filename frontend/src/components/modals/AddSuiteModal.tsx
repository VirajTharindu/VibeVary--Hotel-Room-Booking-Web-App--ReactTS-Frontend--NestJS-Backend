import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import type { Room } from '../../types';
import { MagneticButton } from '../ui/MagneticButton';

interface AddSuiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roomData: Partial<Room>) => Promise<boolean>;
}

export const AddSuiteModal: React.FC<AddSuiteModalProps> = ({ isOpen, onClose, onSave }) => {
  const [newRoom, setNewRoom] = useState({ number: '', type: 'Deluxe Suite', price: 0, description: '' });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#1a060e] to-[#080406] border border-white/[0.08] rounded-[2rem] p-10 shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-rose-500 to-brand-primary opacity-80" />
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-serif text-3xl mb-2">Add New Suite</h2>
              <p className="text-white/40 font-light text-sm">Expand the VibeVary collection.</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-white/50" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Suite Number</label>
                <input
                  type="text"
                  value={newRoom.number}
                  onChange={e => setNewRoom(prev => ({ ...prev, number: e.target.value }))}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                  placeholder="e.g. 401"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Base Price (USD)</label>
                <input
                  type="number"
                  value={newRoom.price || ''}
                  onChange={e => setNewRoom(prev => ({ ...prev, price: Number(e.target.value) }))}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Suite Category</label>
              <select
                value={newRoom.type}
                onChange={e => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors appearance-none"
              >
                <option value="Deluxe Suite">Deluxe Suite</option>
                <option value="Presidential">Presidential</option>
                <option value="Royal Suite">Royal Suite</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-3">Description</label>
              <textarea
                value={newRoom.description}
                onChange={e => setNewRoom(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors h-24 resize-none"
                placeholder="Describe the luxury amenities..."
              />
            </div>

            <MagneticButton className="w-full mt-8">
              <button
                onClick={async () => {
                  if (!newRoom.number || !newRoom.price) return;
                  const success = await onSave(newRoom);
                  if (success) onClose();
                }}
                className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl text-[11px] font-medium tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Suite to Collection
              </button>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
