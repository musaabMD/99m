// app/category/[slug]/page.js
import { createClient } from '@/libs/supabase/server';
import Post from '@/components/Post';
import PageHero from '@/components/PageHero';
import Header from '@/components/Header';

export default async function CategoryPage({ params }) {
  const supabase = createClient(); // No need to pass req/res; Supabase handles it server-side in the App Router
  const slug = params.slug;

  let categoryDetails = null;
  let categoryEmoji = '';
  let posts = [];

  try {
    // Fetch category details based on the slug
    const { data: categoryData, error: categoryError } = await supabase
      .from('category')
      .select('*')
      .or(`slug.ilike.${slug}, category_name.ilike.${slug.replace(/-/g, ' ')}`);

    if (categoryError) {
      console.error('Error fetching category details:', categoryError);
      return <div>Error fetching category details.</div>;
    }

    if (!categoryData || !categoryData.length) {
      return <div>No category found.</div>;
    }

    categoryDetails = categoryData[0];

    // Fetch the emoji for the category from the category_emoji table
    try {
      const { data: emojiData, error: emojiError } = await supabase
        .from('category_emoji')
        .select('emoji')
        .eq('category_id', categoryDetails.id)
        .single(); // Assuming there is one emoji per category

      if (emojiError) {
        console.error('Error fetching emoji:', emojiError.message, emojiError.code);
      } else {
        categoryEmoji = emojiData?.emoji || ''; // Set emoji or fallback to empty string
      }
    } catch (emojiError) {
      console.error('Unexpected error fetching emoji:', emojiError);
    }

    // Fetch posts related to the category
    try {
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .ilike('post_category', `%${categoryDetails.category_name}%`);

      if (postError) {
        console.error('Error fetching posts:', postError.message, postError.code);
      } else {
        posts = postData || [];
      }
    } catch (postError) {
      console.error('Unexpected error fetching posts:', postError);
    }

  } catch (error) {
    console.error('Unexpected error fetching category or posts:', error);
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <>
      <Header />
      <PageHero
        title={`${categoryEmoji ? categoryEmoji + ' ' : ''}${categoryDetails.category_name}`}
        description={`Explore the ${categoryDetails.category_name} category and find related content.`}
      />

      <div>
        {posts.length ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </>
  );
}
