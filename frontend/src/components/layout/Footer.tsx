import * as React from 'react';export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/[0.04] bg-[#0c0508] relative z-10">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-light tracking-[0.2em] uppercase text-white/30">
          <div className="flex items-center gap-8">
            <span className="font-serif text-xl text-white tracking-widest opacity-80">VibeVary</span>
            <span className="hidden md:block w-px h-4 bg-white/10" />
            <p className="hidden md:block">© {new Date().getFullYear()} — Crafted for Excellence</p>
          </div>
          
          <div className="flex items-center gap-10">
            {['Instagram', 'Twitter', 'LinkedIn'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="hover:text-brand-primary transition-all duration-300 hover:scale-105"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
