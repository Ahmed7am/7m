import React from 'react';
import { CalendarDay, ContentFormat } from '../types';

interface DayCardProps {
  day: CalendarDay;
  isCompleted: boolean;
  onClick: (day: CalendarDay) => void;
}

const getFormatColor = (format: ContentFormat) => {
  switch (format) {
    case 'Reel': return 'border-purple-500/50 bg-purple-900/10 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] text-purple-200';
    case 'Carousel': return 'border-orange-500/50 bg-orange-900/10 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)] text-orange-200';
    case 'Static Post': return 'border-teal-500/50 bg-teal-900/10 hover:border-teal-400 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] text-teal-200';
    default: return 'border-gray-700 bg-gray-900/50 text-gray-300';
  }
};

const getCategoryBadge = (category: string) => {
    switch(category) {
        case 'Value': return 'bg-blue-600/30 text-blue-300';
        case 'Portfolio': return 'bg-amber-600/30 text-amber-300';
        case 'Sales': return 'bg-green-600/30 text-green-300';
        case 'Engagement': return 'bg-pink-600/30 text-pink-300';
        case 'Viral': return 'bg-red-600/30 text-red-300';
        default: return 'bg-gray-600/30 text-gray-300';
    }
}

const DayCard: React.FC<DayCardProps> = ({ day, isCompleted, onClick }) => {
  const formatClasses = getFormatColor(day.format);
  
  // Override styles if completed
  const cardClasses = isCompleted
    ? 'border-green-500/50 bg-green-900/20 text-gray-400 hover:border-green-400'
    : formatClasses;

  return (
    <div 
      onClick={() => onClick(day)}
      className={`
        relative group cursor-pointer 
        flex flex-col justify-between
        p-4 rounded-xl border-2 
        transition-all duration-300 ease-out 
        hover:-translate-y-1 h-36 md:h-44
        backdrop-blur-sm
        ${cardClasses}
      `}
    >
      {/* Checkmark Icon for Completed Items */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 shadow-[0_0_10px_rgba(34,197,94,0.6)] z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-black font-bold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col">
            <span className={`text-xl md:text-2xl font-bold font-sans ${isCompleted ? 'text-green-100' : ''}`}>{day.date.split(' ')[0]}</span>
            <span className="text-xs opacity-70 uppercase tracking-wider">{day.date.split(' ')[1]}</span>
        </div>
        <span className="text-xs opacity-50 font-medium">{day.dayName}</span>
      </div>

      <div className="mt-2">
        <div className={`inline-block px-2 py-0.5 rounded text-[10px] mb-2 ${isCompleted ? 'bg-green-800/40 text-green-300' : getCategoryBadge(day.category)}`}>
            {day.category}
        </div>
        <h3 className={`text-sm md:text-base font-bold leading-tight line-clamp-2 ${isCompleted ? 'opacity-70 line-through' : 'opacity-90 group-hover:opacity-100'}`}>
            {day.title}
        </h3>
      </div>
      
      <div className="absolute bottom-3 left-4 text-[10px] md:text-xs opacity-60 font-mono tracking-widest uppercase">
          {day.format}
      </div>
    </div>
  );
};

export default DayCard;