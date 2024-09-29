'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';

export default function Post({ post }) {
  const [supabase, setSupabase] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [incDetails, setIncDetails] = useState(null);

  // Initialize Supabase client
  useEffect(() => {
    if (!supabase) {
      const client = createClient();
      setSupabase(client);
    }
  }, [supabase]);

  // Fetch post details including company (inc) details
  useEffect(() => {
    if (!post) {
      setIsLoading(false);
      return;
    }

    if (supabase && post.post_inc_id) {
      fetchIncDetails(post.post_inc_id);
    } else if (supabase) {
      setIsLoading(false);
    }
  }, [supabase, post]);

  // Fetch Inc details by Inc ID from the post
  const fetchIncDetails = async (incId) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from('inc').select('*').eq('id', incId).single();
      if (error) throw error;
      setIncDetails(data);
    } catch (err) {
      setError('Failed to fetch inc details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate the URL for the logo image
  const getLogoUrl = (apiName) => {
    return apiName ? `https://img.logo.dev/${encodeURIComponent(apiName)}?token=pk_f8BWa9CoSCOyj527NcZ2LA` : '/default-logo.png';
  };

  if (isLoading) return <div>Loading post details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post data available</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-8 border-t border-b border-gray-200 relative">
      {/* Add vertical lines on the left and right */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gray-200"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1 bg-gray-200"></div>

      <div className="mb-2">
        <div className="flex items-center mb-2">
          {incDetails?.inc_api_name && (
            <Image
              alt={`${incDetails.inc_name || 'Company'} logo`}
              height={48}
              width={48}
              src={getLogoUrl(incDetails.inc_api_name)}
              className="rounded-full"
              unoptimized
            />
          )}
          <div className="ml-2">
            <p className="text-2xl text-blue-900 font-semibold">{incDetails?.inc_name || 'Unknown Company'}</p>
            {incDetails && <p className="text-2xl text-gray-500">{incDetails?.inc_name || 'Unknown Company'} {incDetails.inc_description}</p>}
          </div>
        </div>
        <p className="mb-2 text-3xl" dangerouslySetInnerHTML={{ __html: post.post_text }} />
        {post.post_img && (
          <div className="relative w-full">
            <Image
              alt={`Thumbnail for ${incDetails?.inc_name || 'post'}`}
              src={post.post_img}
              width={800}
              height={450}
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>
        )}
      </div>
      {/* {post.post_category && (
        <span className="inline-flex items-center rounded-md bg-red-400 px-2 py-1 text-2xl font-medium text-white">
          {post.post_category}
        </span>
      )} */}
    </div>
  );
}
