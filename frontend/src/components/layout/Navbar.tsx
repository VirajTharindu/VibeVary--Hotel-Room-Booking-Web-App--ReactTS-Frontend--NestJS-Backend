import * as React from 'react';
import { Layout, Bell } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

interface NavbarProps {
  notificationsCount: number;
  onConciergeClick: () => void;
  onNotificationsClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ notificationsCount, onConciergeClick, onNotificationsClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[--color-background]/60 border-b border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-rose-500 flex items-center justify-center">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-xl tracking-wide text-white">VibeVary</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {['Suites', 'Experiences', 'Dining', 'Wellness'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] font-light tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300 cursor-pointer">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div onClick={onNotificationsClick}>
            <MagneticButton className="relative group cursor-pointer p-2 rounded-full hover:bg-white/5 transition-colors">
              <Bell className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
              {notificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-brand-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[--color-background] shadow-[0_0_10px_rgba(244,63,94,0.4)]">
                  {notificationsCount}
                </span>
              )}
            </MagneticButton>
          </div>
          <MagneticButton>
            <button
              onClick={onConciergeClick}
              className="px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[12px] font-medium tracking-[0.1em] uppercase text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              Concierge
            </button>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};
