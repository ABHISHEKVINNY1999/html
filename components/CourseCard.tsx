
import React from 'react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

/**
 * A component to display a single course in a card format.
 * @param course - The course object to display.
 */
export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <div className="p-6 flex-grow">
        <span className="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
          {course.category}
        </span>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{course.title}</h3>
        <p className="text-slate-600 text-sm mb-4">By {course.instructor}</p>
        
        <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center space-x-1">
            <ClockIcon />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <UsersIcon />
            <span>{course.enrolled} Enrolled</span>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200">
        <div className="flex items-center">
          <StarIcon />
          <span className="text-lg font-semibold text-slate-700 ml-1">{course.rating}</span>
          <span className="text-sm text-slate-500">/5</span>
        </div>
        <div className="text-2xl font-bold text-sky-600">
          ${course.price}
        </div>
      </div>
    </div>
  );
};

// SVG Icon components defined within the file for simplicity.
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

