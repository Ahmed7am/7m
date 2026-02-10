import React, { useEffect, useState } from 'react';
import { CalendarDay } from '../types';

interface ModalProps {
  day: CalendarDay | null;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ day, isCompleted, onToggleComplete, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (day) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }
  }, [day]);

  if (!day) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`
        relative w-full max-w-lg bg-[#0a0a0a] border border-gray-800 
        rounded-2xl shadow-2xl overflow-hidden
        transform transition-all duration-300 ease-out
        ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        {/* Decorative Top Border */}
        <div className={`h-1 w-full bg-gradient-to-r ${isCompleted ? 'from-green-500 to-emerald-700' : 'from-brand-neon to-purple-600'}`}></div>

        <div className="p-6 md:p-8 relative">
            <button 
                onClick={onClose}
                className="absolute top-4 left-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                    {day.date}
                </div>
                <div className="h-6 w-[1px] bg-gray-700"></div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${day.format === 'Reel' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 
                      day.format === 'Carousel' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 
                      'bg-teal-500/20 text-teal-300 border border-teal-500/30'}
                `}>
                    {day.format}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1 block">الفكرة</label>
                    <h2 className={`text-2xl md:text-3xl font-bold text-white leading-tight ${isCompleted ? 'line-through decoration-green-500 decoration-2 opacity-70' : ''}`}>
                        {day.title}
                    </h2>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden group">
                     <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCompleted ? 'bg-green-500' : 'bg-brand-neon'} group-hover:shadow-[0_0_15px_rgba(0,243,255,0.6)] transition-all`}></div>
                    <label className={`text-xs uppercase tracking-widest mb-2 block flex items-center gap-2 ${isCompleted ? 'text-green-500' : 'text-brand-neon'}`}>
                        <span>🔥</span> The Hook
                    </label>
                    <p className="text-lg md:text-xl font-medium text-gray-100 leading-relaxed">
                        "{day.hook}"
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block">Visual Direction</label>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base border-r-2 border-gray-700 pr-4">
                          {day.visualDirection}
                      </p>
                  </div>
                  
                  {day.vibe && (
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2 block flex items-center gap-2">
                           <span>🎵</span> Vibe & Music
                        </label>
                        <p className={`leading-relaxed text-sm md:text-base font-medium ${isCompleted ? 'text-green-300' : 'text-brand-neon'}`}>
                            {day.vibe}
                        </p>
                    </div>
                  )}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center gap-4">
                <button 
                  onClick={() => onToggleComplete(day.id)}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${isCompleted 
                      ? 'bg-green-900/30 text-green-400 border border-green-500/50 hover:bg-green-900/50' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-gray-600'}
                  `}
                >
                  {isCompleted ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      تم التنفيذ (Done)
                    </>
                  ) : (
                    <>
                      <span className="w-5 h-5 rounded border border-gray-400"></span>
                      Mark as Done
                    </>
                  )}
                </button>
                
                <button 
                    onClick={onClose}
                    className="bg-white text-black hover:bg-brand-neon transition-colors px-6 py-2 rounded-lg font-bold text-sm"
                >
                    إغلاق
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;