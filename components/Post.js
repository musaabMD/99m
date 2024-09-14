"use client";
import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import styles from "./Post.module.css";
import { createClient } from "../libs/supabase/client";
import { Suspense } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(`
            id,
            post_text,
            post_image,
            post_inc,
            categories (id, category_image, category_name),
            founders (founder_name)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error("Error fetching posts:", error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
        <Suspense>

  
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.categoryIconContainer}>
                <span className={styles.categoryIcon}>{post.categories?.category_image}</span>
              </div>
              <span className={styles.insightText}>#{post.categories?.category_name.toUpperCase()} INSIGHT</span>
            </div>
            <h1 className={styles.title}>Negativity Bias</h1> {/* You can update this title dynamically if needed */}
            {post.post_image && (
              <div className={styles.imageContainer}>
                <img src={post.post_image} alt="Post image" className={styles.postImage} />
              </div>
            )}
            <p className={styles.description}>{post.post_text}</p>
            <div className={styles.tagsContainer}>
              {/* First tag for category_name */}
              <span className={styles.tagContent}>{post.categories?.category_name}</span>
              {/* Second tag for founder_name */}
              <span className={styles.tagSEO}>{post.founders?.founder_name}</span>
            </div>
            <div className={styles.bookmarkButton}>
              <Bookmark className={styles.bookmarkIcon} />
            </div>
          </div>
        </div>
      ))}
    </div>
    </Suspense>

</>
  );
};

export default Post;
