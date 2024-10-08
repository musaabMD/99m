import React from 'react';
import Logos from './Homelogos';
import { Suspense } from 'react';

const HomeHero = () => {
  return (
    <>
      <Suspense>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <a
              href="#"
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-red-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span className="text-xs bg-primary-600 rounded-full font-bold text-blue-800 px-4 py-1.5 mr-3"></span>
              <span className="text-2xl font-medium ">Get lifetime access now </span>
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-red-500 md:text-5xl lg:text-6xl dark:text-white">
              Learn from the Legends Who Built It!
            </h1>
            <p className="mb-8 font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-700">
              Get the inside scoop from the people who built successful startups. We have distilled thousands of interviews into bite-sized, practical tips you can use right now. No fluff, just real strategies from founders who have been in your shoes—and made it work.
            </p>

            {/* Email Signup Form */}
            <form className="flex flex-col items-center mb-8 w-full max-w-3xl mx-auto">
              <div className="flex flex-col w-full sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full flex-auto rounded-lg border-0 px-5 py-4 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-none rounded-lg bg-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe
                </button>
              </div>

              {/* Ensure the text appears below the form */}
              <div className="mt-4 text-center">
                <p className="text-2xl leading-6 text-gray-900">
                  We care about your data.
                </p>
                
                
              </div>
            </form>

            <Logos />
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default HomeHero;
