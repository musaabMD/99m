"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    console.log("Initializing Supabase client");
    const client = createClient();
    setSupabase(client);
    console.log("Supabase client initialized:", client);
  }, []);

  useEffect(() => {
    if (supabase) {
      console.log("Supabase client available, fetching posts");
      fetchPosts();
    }
  }, [supabase]);

  const fetchPosts = async () => {
    console.log("Starting fetchPosts function");
    setIsLoading(true);
    setError(null);
    try {
      console.log("Executing Supabase query");
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          post_inc_id,
          post_cate_id,
          post_text,
          post_img,
          inc:post_inc_id(inc_name, inc_api_name),
          category:post_cate_id(category_name, category_emoji)
        `);
      console.log("Query executed. Data:", data, "Error:", error);
      if (error) throw error;
      if (data && data.length > 0) {
        console.log("Posts fetched successfully:", data);
        setPosts(data);
      } else {
        console.log("No posts found");
        setPosts([]);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setIsLoading(false);
      console.log("fetchPosts function completed");
    }
  };

  const getLogoUrl = (apiName) => {
    return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
  };

  console.log("Render state:", { isLoading, error, postsCount: posts.length });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>No posts found</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-0 sm:p-4">
      <div className="w-full max-w-5xl">
        {posts.map(post => {
          console.log("Rendering post:", post);
          return (
            <div key={post.id} className="border-b border-gray-200 p-4 bg-white">
              <div className="mb-2">
                <div className="flex items-center mb-2">
                  <Image
                    alt="logo"
                    height={48}
                    width={48}
                    src={getLogoUrl(post.inc?.inc_api_name)}
                    className="rounded-full"
                  />
                  <div className="ml-2">
                    <p className="text-2xl text-blue-900 font-semibold">{post.inc?.inc_name || 'Unknown Company'}</p>
                    <p className="text-2xl text-gray-500">Retool started as Venmo for the U.K.</p>
                  </div>
                </div>
                <p className="mb-2 text-3xl" dangerouslySetInnerHTML={{ __html: post.post_text }} />
                {post.post_img && (
                  <div className="relative w-full">
                    <Image
                      alt={`Thumbnail for ${post.inc?.inc_name || 'post'}`}
                      src={post.post_img}
                      layout="responsive"
                      width={800}
                      height={450}
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
              {post.category && (
                <span className="inline-flex items-center rounded-md bg-red-400 px-2 py-1 text-2xl font-medium text-white">
                  {post.category.category_emoji} {post.category.category_name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
