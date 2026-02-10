import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import Modal from './components/Modal';
import { CALENDAR_DATA } from './constants';
import { CalendarDay, ContentFormat } from './types';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  
  // State for Completed Days (persisted in localStorage)
  const [completedIds, setCompletedIds] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedDays');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // State for Filters
  const [filter, setFilter] = useState<'All' | ContentFormat>('All');

  // Save to localStorage whenever completedIds changes
  useEffect(() => {
    localStorage.setItem('completedDays', JSON.stringify(completedIds));
  }, [completedIds]);

  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const toggleCompletion = (id: number) => {
    setCompletedIds(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  // Filter Data Logic
  const filteredData = useMemo(() => {
    if (filter === 'All') return CALENDAR_DATA;
    return CALENDAR_DATA.filter(day => day.format === filter);
  }, [filter]);

  // Progress Logic
  const progress = Math.round((completedIds.length / CALENDAR_DATA.length) * 100);

  const FilterButton = ({ label, value, active }: { label: string, value: string, active: boolean }) => (
    <button
      onClick={() => setFilter(value as any)}
      className={`
        px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border
        ${active 
          ? 'bg-brand-neon text-black border-brand-neon shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
          : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white'}
      `}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-brand-black text-white font-sans selection:bg-brand-neon selection:text-black">
      <div className="relative z-10">
        <Header progress={progress} />
        
        <main>
            {/* Format Filters */}
            <div className="max-w-7xl mx-auto px-4 mb-8 flex flex-wrap justify-center gap-3">
              <FilterButton label="All" value="All" active={filter === 'All'} />
              <FilterButton label="🎥 Reels" value="Reel" active={filter === 'Reel'} />
              <FilterButton label="🎠 Carousels" value="Carousel" active={filter === 'Carousel'} />
              <FilterButton label="🖼️ Images" value="Static Post" active={filter === 'Static Post'} />
            </div>

            <CalendarGrid 
              days={filteredData} 
              completedIds={completedIds}
              onDayClick={handleDayClick} 
            />
        </main>
        
        <footer className="text-center py-8 text-gray-600 text-xs uppercase tracking-widest">
            &copy; 2024 7M Media Production. All rights reserved.
        </footer>
      </div>

      <Modal 
        day={selectedDay} 
        isCompleted={selectedDay ? completedIds.includes(selectedDay.id) : false}
        onToggleComplete={toggleCompletion}
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default App;