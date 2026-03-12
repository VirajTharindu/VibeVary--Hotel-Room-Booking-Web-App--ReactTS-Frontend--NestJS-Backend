import * as React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#e11d48]/20 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#fb7185]/15 blur-[180px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-[#f43f5e]/10 blur-[150px] rounded-full" />
    </div>
  );
};
