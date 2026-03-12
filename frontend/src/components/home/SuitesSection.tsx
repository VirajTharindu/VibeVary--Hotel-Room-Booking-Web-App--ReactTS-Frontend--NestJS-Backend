import * as React from 'react';
import { motion } from 'framer-motion';
import type { Room } from '../../types';
import { cn } from '../../utils/cn';
import { Users, BedDouble, Plus } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface SuitesSectionProps {
  rooms: Room[];
  isAdmin: boolean;
  onAddSuiteClick: () => void;
  onRoomSelect: (room: Room) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({ rooms, isAdmin, onAddSuiteClick, onRoomSelect }) => {
  const [isPaused, setIsPaused] = React.useState(false);
  
  // Duplicate rooms to create the infinite "belt" effect
  const duplicatedRooms = [...rooms, ...rooms, ...rooms];

  return (
    <section 
      id="suites" 
      className="py-32 border-t border-white/[0.04] bg-[#080406]/30 relative z-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col mb-20">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-brand-primary text-xs lg:text-sm font-medium tracking-[0.4em] uppercase mb-4">Our Collection</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight">Exclusive Suites</h2>
          </div>
          {isAdmin && (
            <MagneticButton>
              <button
                onClick={onAddSuiteClick}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(244,63,94,0.2)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] group"
              >
                <Plus className="w-5 h-5 transition-colors" />
                <span className="text-xs font-medium tracking-[0.1em] uppercase">Add Suite</span>
              </button>
            </MagneticButton>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 relative">
        {/* Edge Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0c0508] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0c0508] to-transparent z-20 pointer-events-none" />

        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-6 lg:gap-8 w-max py-4"
            animate={{ x: isPaused ? undefined : ["0%", "-33.333%"] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {duplicatedRooms.map((room, index) => (
              <div
                key={`${room._id}-${index}`}
                className="w-[85vw] sm:w-[450px] lg:w-[460px] shrink-0 group bg-[#080406] border border-white/[0.04] rounded-[2rem] overflow-hidden hover:bg-white/[0.02] shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-2"
              >
                <div className="relative h-72 overflow-hidden shrink-0">
                  <img
                    src={
                    room.number === 'PH-1' ? 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80' : // Royal
                    room.number === 'PH-2' ? 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80' : // Royal
                    room.number === 'PH-3' ? 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80' : // Royal Special
                    room.number === '201' ? 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80' : // Presidential
                    room.number === '202' ? 'https://images.unsplash.com/photo-1578683319918-6c84b1225579?auto=format&fit=crop&q=80' : // Presidential 2
                    room.number === 'PH-4' ? 'https://images.unsplash.com/photo-1571508601891-ca587a71ac5d?auto=format&fit=crop&q=80' : // Presidential PH
                    room.number === '101' ? 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80' : // Deluxe
                    room.number === '102' ? 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80' : // Deluxe 2
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80' // Default
                  }
                    alt={room.type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/suite.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080406] to-transparent opacity-90" />
                  {!room.isAvailable && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-rose-600/10 border border-rose-500/20 backdrop-blur-md">
                      <span className="text-[10px] font-medium tracking-widest uppercase text-rose-400">Occupied</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-8 lg:p-10 border-t border-white/[0.02]">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-serif text-2xl tracking-wide mb-1 opacity-90">{room.type && room.type !== 'room' ? room.type : 'Luxury Suite'}</h3>
                      <p className="text-brand-primary text-[11px] font-medium tracking-widest uppercase">Suite {room.number}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-2xl">${room.price}</div>
                      <div className="text-[9px] font-medium tracking-widest uppercase text-white/30">Per Night</div>
                    </div>
                  </div>

                  <p className="text-white/40 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                    {room.description || 'A masterfully designed sanctuary featuring bespoke furniture and panoramic views.'}
                  </p>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-white/[0.03] rounded-full px-4 py-2 border border-white/[0.02]">
                      <Users className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">{room.type === 'Royal Suite' ? '4 Guests' : '2 Guests'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/[0.03] rounded-full px-4 py-2 border border-white/[0.02]">
                      <BedDouble className="w-3.5 h-3.5 text-white/30" />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-white/40">{room.type === 'Royal Suite' ? '2 Kings' : '1 King'}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <MagneticButton className="w-full">
                      <button
                        onClick={() => room.isAvailable && onRoomSelect(room)}
                        disabled={!room.isAvailable}
                        className={cn(
                          "w-full py-4 text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-2xl flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(225,29,72,0.15)]",
                          room.isAvailable
                            ? "bg-brand-primary text-white hover:bg-brand-secondary hover:shadow-[0_4px_25px_rgba(225,29,72,0.3)]"
                            : "bg-transparent border border-white/[0.02] text-white/20 cursor-not-allowed"
                        )}
                      >
                        <span>{room.isAvailable ? 'Reserve Suite' : 'Fully Booked'}</span>
                        <motion.span
                          animate={{ x: room.isAvailable ? [0, 4, 0] : 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ›
                        </motion.span>
                      </button>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
