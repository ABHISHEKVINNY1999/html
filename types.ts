
/**
 * Represents a single online course.
 */
export interface Course {
  courseId: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  category: string;
  price: string;
  enrolled: string;
}

/**
 * Defines the possible keys to sort courses by.
 */
export type SortKey = 'rating' | 'price' | 'title';

/**
 * Defines the sorting order.
 */
export type SortOrder = 'asc' | 'desc';
