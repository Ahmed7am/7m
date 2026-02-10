export type ContentFormat = 'Reel' | 'Carousel' | 'Static Post';

export interface CalendarDay {
  id: number;
  date: string; // e.g., "10 Feb"
  dayName: string; // e.g., "Mon"
  format: ContentFormat;
  title: string;
  hook: string;
  visualDirection: string;
  category: 'Value' | 'Portfolio' | 'Sales' | 'Engagement' | 'Viral';
  vibe?: string; // New field for music/mood
}