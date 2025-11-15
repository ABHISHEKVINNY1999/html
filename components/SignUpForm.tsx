
import React, { useState } from 'react';
import type { Course } from '../types';

interface SignUpFormProps {
  courses: Course[];
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
interface FormErrors {
  name?: string;
  email?: string;
  course?: string;
}

/**
 * A form for users to sign up for a course.
 * Includes client-side validation.
 * @param courses - An array of available courses to populate the dropdown.
 */
export const SignUpForm: React.FC<SignUpFormProps> = ({ courses }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  /**
   * Validates the form inputs and returns an error object.
   */
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!selectedCourseId) newErrors.course = 'Please select a course.';
    return newErrors;
  };

  /**
   * Handles form submission, including validation and status updates.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setStatus('submitting');
      // Simulate an API call
      setTimeout(() => {
        setStatus('success');
        // Reset form after a delay
        setTimeout(() => {
            setStatus('idle');
            setName('');
            setEmail('');
            setSelectedCourseId('');
        }, 3000);
      }, 1500);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-slate-900 mb-1">Register for a Course</h3>
      <p className="text-slate-600 mb-6">Secure your spot today!</p>
      
      {status === 'success' ? (
        <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
            <h4 className="font-bold">Registration Successful!</h4>
            <p>Thank you for signing up. We've sent a confirmation to your email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-slate-700">Select Course</label>
              <select
                id="course"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className={`mt-1 block w-full rounded-md shadow-sm ${errors.course ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 focus:ring-sky-500 focus:border-sky-500'}`}
              >
                <option value="" disabled>Choose a course...</option>
                {courses.map(course => (
                  <option key={course.courseId} value={course.courseId}>
                    {course.title}
                  </option>
                ))}
              </select>
              {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
            </div>
          </div>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-6 w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors disabled:bg-slate-400 disabled:cursor-wait flex items-center justify-center"
          >
            {status === 'submitting' && <SpinnerIcon />}
            {status === 'submitting' ? 'Submitting...' : 'Sign Up Now'}
          </button>
        </form>
      )}
    </div>
  );
};


const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
