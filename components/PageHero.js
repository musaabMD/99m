"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { Suspense } from 'react';

const PageHero = ({ title, description, searchPlaceholder, backgroundColor, onSearch }) => {
  const pathname = usePathname();
  const isUpgradePage = pathname === '/upgrade';

  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`flex flex-col items-center justify-center min-h-[30vh] ${backgroundColor} text-center px-4 py-8`}>
        {/* Render the title with the emoji included (already handled by the parent component) */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">{description}</p>
        {!isUpgradePage && (
          <div className="relative w-full max-w-md mb-8">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleSearchChange}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default PageHero;
