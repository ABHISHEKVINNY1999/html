
import { useState, useEffect, useMemo } from 'react';
import type { Course, SortKey, SortOrder } from '../types';

/**
 * A custom hook to manage all course-related data and logic.
 * @param itemsPerPage - The number of courses to display on each page.
 * @returns An object containing the state and handler functions for courses.
 */
export const useCourses = (itemsPerPage: number) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('rating');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  /**
   * Fetches course data from the JSON file on component mount.
   */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('/courses.json');
        if (!response.ok) {
          throw new Error('Failed to fetch course data.');
        }
        const data: Course[] = await response.json();
        setAllCourses(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /**
   * Memoized derivation of unique categories from the course list.
   */
  const categories = useMemo(() => {
    const allCategories = allCourses.map((course) => course.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [allCourses]);

  /**
   * Memoized derivation of filtered and sorted courses.
   * This re-runs only when dependencies change, optimizing performance.
   */
  const filteredAndSortedCourses = useMemo(() => {
    let processedCourses = [...allCourses];

    // Apply filtering
    if (filterCategory !== 'all') {
      processedCourses = processedCourses.filter(
        (course) => course.category === filterCategory
      );
    }

    // Apply sorting
    processedCourses.sort((a, b) => {
      let valA, valB;

      switch (sortKey) {
        case 'price':
          valA = parseFloat(a.price);
          valB = parseFloat(b.price);
          break;
        case 'rating':
          valA = a.rating;
          valB = b.rating;
          break;
        case 'title':
          valA = a.title.toLowerCase();
          valB = b.title.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return processedCourses;
  }, [allCourses, filterCategory, sortKey, sortOrder]);

  /**
   * Memoized derivation of the courses to display for the current page.
   */
  const displayedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedCourses, currentPage, itemsPerPage]);

  /**
   * Total number of pages based on filtered results.
   */
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedCourses.length / itemsPerPage);
  }, [filteredAndSortedCourses, itemsPerPage]);

  /**
   * Reset to page 1 whenever filters or sorting changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, sortKey, sortOrder]);

  return {
    allCourses,
    displayedCourses,
    categories,
    filterCategory,
    setFilterCategory,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error,
  };
};
