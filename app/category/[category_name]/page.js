"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { Suspense } from 'react';

const CategoryPage = () => {
  const params = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const supabase = createClient();
      const categoryName = params.category_name;
      
      if (!categoryName) {
        setError("No category name provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('category_name', categoryName)
          .single();

        if (error) throw error;

        setCategoryDetails(data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError("Failed to fetch category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [params.category_name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categoryDetails) return <p>No category found.</p>;

  return (
    <>
    <Suspense>


  
  

      <h1>{categoryDetails.category_name}</h1>
      <p>Description: {categoryDetails.category_description}</p>
      {/* Add more category details here */}
   
    </Suspense>
     </>
  );
};

export default CategoryPage;
