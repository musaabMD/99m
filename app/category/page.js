// import Categories from '@/components/Categories';
// import PageHero from '../../components/PageHero';
// import Header from '@/components/Header';
// import { Suspense } from 'react'; 
// const CategoryPage = () => {
//     return (
     
//         <>
      
//         <Suspense> <Header/>

//         <PageHero
//           title="Explore Categories"
//           description="Discover a wide range of product categories to suit your needs."
//           searchPlaceholder="Search categories..."
//           backgroundColor="bg-gray-100"
//         />
//         {/* Rest of the category page content */}
//      <Categories/>
//       </Suspense>
//       </>
//     );
//   };
  
//   export default CategoryPage;
"use client";

import { useState } from 'react';
import Categories from '@/components/Categories';
import PageHero from '../../components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';

const CategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <PageHero
          title="Explore Categories"
          description="Discover a wide range of product categories to suit your needs."
          searchPlaceholder="Search categories..."
          backgroundColor="bg-gray-100"
          onSearch={handleSearch}
        />
        <Categories searchQuery={searchQuery} />
      </Suspense>
    </>
  );
};

export default CategoryPage;