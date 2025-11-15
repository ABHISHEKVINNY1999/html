
import React from 'react';
import { CourseCard } from './components/CourseCard';
import { FilterSortControls } from './components/FilterSortControls';
import { Pagination } from './components/Pagination';
import { SignUpForm } from './components/SignUpForm';
import { useCourses } from './hooks/useCourses';

/**
 * Main application component.
 * Renders the entire course platform UI, including the header, course list, and sign-up form.
 * It uses the `useCourses` custom hook to manage all data and state.
 */
export default function App(): React.ReactElement {
  const {
    displayedCourses,
    allCourses,
    categories,
    filterCategory,
    setFilterCategory,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
    error,
  } = useCourses(6); // Set 6 items per page

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Online Course Platform
          </h1>
          <p className="text-slate-600 mt-1">
            Explore, learn, and grow with our curated courses.
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          
          {/* Main Content: Filters and Course List */}
          <div className="w-full lg:w-2/3">
            <FilterSortControls
              categories={categories}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
              sortKey={sortKey}
              onSortKeyChange={setSortKey}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
            />
            
            {loading && <p className="text-center text-lg text-slate-500 py-10">Loading courses...</p>}
            {error && <p className="text-center text-lg text-red-500 py-10">{error}</p>}
            
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {displayedCourses.length > 0 ? (
                    displayedCourses.map((course) => (
                      <CourseCard key={course.courseId} course={course} />
                    ))
                  ) : (
                    <p className="md:col-span-2 text-center text-slate-500 py-10">No courses found that match your criteria.</p>
                  )}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </div>
          
          {/* Sidebar: Sign-Up Form */}
          <aside className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <SignUpForm courses={allCourses} />
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
}
