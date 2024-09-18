"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { Suspense } from 'react';
import PageHero from '../../../components/PageHero'; // Adjust the path according to where you place PageHero
import Header from '@/components/Header';
import Post from '@/components/Post';
const CategoryPage = () => {
  const params = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      const supabase = createClient();
      const slug = decodeURIComponent(params.slug);
      console.log("Decoded slug:", slug);

      if (!slug) {
        setError("No slug provided");
        setLoading(false);
        return;
      }

      try {
        console.log("Attempting to fetch category with slug:", slug);
        const { data, error } = await supabase
          .from('category')
          .select('*')
          .or(`slug.ilike.%${slug.replace(/ /g, '%')}%,category_name.ilike.%${slug.replace(/ /g, '%')}%`)
          .maybeSingle();
        
        console.log("Query result:", { data, error });

        if (error) throw error;
        if (!data) throw new Error(`Category not found: ${slug}`);

        console.log("Fetched category data:", data);
        setCategoryDetails(data);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError(error.message || "Failed to fetch category details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [params.slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categoryDetails) return <p>No category found.</p>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header/>
      <PageHero
        title={categoryDetails.category_name}
        description={`Explore the ${categoryDetails.category_name} category and find related content.`}
        searchPlaceholder="Search within category..."
        backgroundColor="bg-blue-100" // You can adjust this color as needed
      />
     
   <br />
   <br />
   <br />

    </Suspense>
  );
};

export default CategoryPage;
