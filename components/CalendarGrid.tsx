import React from 'react';
import { CalendarDay } from '../types';
import DayCard from './DayCard';

interface CalendarGridProps {
  days: CalendarDay[];
  completedIds: number[];
  onDayClick: (day: CalendarDay) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, completedIds, onDayClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {days.map((day) => (
          <DayCard 
            key={day.id} 
            day={day} 
            isCompleted={completedIds.includes(day.id)}
            onClick={onDayClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;