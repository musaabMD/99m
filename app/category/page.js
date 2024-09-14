import PageHero from '../../components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';
const CategoryPage = () => {
    return (
     
        <>
      
        <Suspense> <Header/>

        <PageHero
          title="Explore Categories"
          description="Discover a wide range of product categories to suit your needs."
          searchPlaceholder="Search categories..."
          backgroundColor="bg-gray-100"
        />
        {/* Rest of the category page content */}
     
      </Suspense>
      </>
    );
  };
  
  export default CategoryPage;