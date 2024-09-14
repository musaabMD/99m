"use client";
import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { createClient } from '@/libs/supabase/client';
import { Suspense } from 'react';

const Post2 = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [postData, setPostData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .limit(1);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setPostData(data[0]);
      }
    };
    fetchPost();
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div style={styles.postContainer}>
        <div style={styles.content}>
          <h2 style={styles.title}>{postData?.post_text || 'Loading...'}</h2>
          <p style={styles.description}>
            {postData?.post_text || 'Here\'s a placeholder description.'}
          </p>
          {postData?.post_img && (
            <img src={postData.post_img} alt="Post image" style={styles.image} />
          )}
        </div>
        <div style={styles.footer}>
          <div style={styles.tagsContainer}>
            {postData?.post_category && (
              <div style={styles.categoryTag}>
                {postData.post_category}
              </div>
            )}
            {/* You can add more tags here if needed */}
          </div>
          <button
            style={styles.bookmarkButton}
            onClick={toggleBookmark}
          >
            <Bookmark
              size={24}
              fill={isBookmarked ? 'currentColor' : 'none'}
              color={isBookmarked ? 'white' : 'currentColor'}
            />
          </button>
        </div>
      </div>
    </Suspense>
  );
};

const styles = {
  postContainer: {
    borderRadius: '10px',
    border: '1px solid #e1e1e1',
    padding: '40px',
    backgroundColor: '#fff',
    width: '1000px',
    margin: '40px auto',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  content: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '44px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '32px',
    color: '#555',
    lineHeight: '2',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '20px',
    borderRadius: '10px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
  },
  tagsContainer: {
    display: 'flex',
    gap: '10px',
  },
  categoryTag: {
    backgroundColor: '#f28c82',
    color: '#333',
    borderRadius: '5px',
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '18px',
    border: '1px solid #f2bcbc',
  },
  bookmarkButton: {
    backgroundColor: '#e1e1e1',
    border: 'none',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Post2;