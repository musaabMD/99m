"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import { Suspense } from 'react';

const FounderPage = () => {
  const params = useParams();
  const [founderDetails, setFounderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFounderDetails = async () => {
      const supabase = createClient();
      let founderSlug = params.founder_slug;
      
      console.log('Founder slug from URL:', founderSlug);

      if (!founderSlug) {
        setError("No founder slug provided");
        setLoading(false);
        return;
      }

      // Decode the URL-encoded slug
      founderSlug = decodeURIComponent(founderSlug);

      try {
        console.log('Initiating Supabase query with slug:', founderSlug);
        const { data, error } = await supabase
          .from('founders')
          .select('*')
          .eq('founder_slug', founderSlug)
          .single();

        console.log('Supabase query result:', { data, error });

        if (error) throw error;
        if (!data) throw new Error('No founder found with this slug');
        
        setFounderDetails(data);
      } catch (error) {
        console.error('Error fetching founder details:', error.message);
        setError(`Failed to fetch founder details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFounderDetails();
  }, [params.founder_slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!founderDetails) return <p>No founder found.</p>;

  return (
    <>

    <Suspense>


    

    <div>
      <h1>{founderDetails.founder_name}</h1>
      <h1> learn how {founderDetails.founder_name} built $54B company  </h1>
      <p>Description: {founderDetails.founder_dec}</p>
      <p>Year of Birth: {founderDetails.founder_birth_year}</p>
      <img src={founderDetails.founder_image} alt={`${founderDetails.founder_name}'s Image`} />
    </div>
    </Suspense>
    </>
  );
};

export default FounderPage;