import React from 'react';

interface HeaderProps {
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ progress }) => {
  return (
    <header className="py-8 px-4 md:px-8 flex flex-col items-center justify-center relative overflow-hidden mb-6">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-brand-neon/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Progress Bar Container */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
        <div 
          className="h-full bg-gradient-to-r from-brand-neonBlue to-brand-neon shadow-[0_0_10px_rgba(0,243,255,0.7)] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="relative z-10 text-center mt-4">
        <div className="flex items-center justify-center gap-2 mb-2">
           <h2 className="text-brand-neon tracking-widest text-sm md:text-base font-bold uppercase">
             Agency Calendar
           </h2>
           <span className="bg-gray-800 text-xs px-2 py-0.5 rounded border border-gray-700 text-gray-300">
             {progress}% Done
           </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-lg">
          7M <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-brand-neonBlue">MEDIA</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-md mx-auto leading-relaxed">
          خطة المحتوى الشهرية | فبراير - مارس
        </p>
      </div>

      <div className="mt-8 flex gap-4 text-xs md:text-sm font-semibold text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
          <span>Reel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
          <span>Carousel</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(20,184,166,0.5)]"></span>
          <span>Static</span>
        </div>
      </div>
    </header>
  );
};

export default Header;