
import React from 'react';
import type { SortKey, SortOrder } from '../types';

interface FilterSortControlsProps {
  categories: string[];
  filterCategory: string;
  onFilterChange: (category: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (key: SortKey) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
}

/**
 * A component containing dropdowns for filtering courses by category and sorting them.
 * @param props - Includes current values and change handlers for filters and sorting.
 */
export const FilterSortControls: React.FC<FilterSortControlsProps> = ({
  categories,
  filterCategory,
  onFilterChange,
  sortKey,
  onSortKeyChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Category Filter */}
      <div className="flex-1">
        <label htmlFor="category-filter" className="block text-sm font-medium text-slate-700 mb-1">
          Filter by Category
        </label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Controls */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label htmlFor="sort-key" className="block text-sm font-medium text-slate-700 mb-1">
            Sort by
          </label>
          <select
            id="sort-key"
            value={sortKey}
            onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
          >
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </div>
        <button
          onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 rounded-md border border-slate-300 bg-white hover:bg-slate-100 transition-colors"
          aria-label={`Sort in ${sortOrder === 'asc' ? 'descending' : 'ascending'} order`}
        >
          {sortOrder === 'asc' ? <SortAscendingIcon /> : <SortDescendingIcon />}
        </button>
      </div>
    </div>
  );
};

const SortAscendingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h9m-9 4h9m5-4v8m0 0l-4-4m4 4l4-4" />
    </svg>
);

const SortDescendingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h9m-9 4h9m5 4v-8m0 0l-4 4m4-4l4 4" />
    </svg>
);
