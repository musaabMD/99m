"use client"
import React, { useEffect, useState } from 'react'; // <-- Add this line to import useState and useEffect
import Link from 'next/link';
import { createClient } from '@/libs/supabase/client';
import styles from './Founder.module.css';
import { Suspense } from 'react';

const Founders = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFounders = async () => {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('founders')
          .select('*');
        if (error) throw error;
        console.log('Data fetched from Supabase:', data);
        setFounders(data);
      } catch (error) {
        console.error('Error fetching founders:', error);
        setError("Failed to fetch founders");
      } finally {
        setLoading(false);
      }
    };
    fetchFounders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!founders || founders.length === 0) return <p>No founders found.</p>;

  return (
    <>
    <Suspense>

    
  
    <div className={styles.container}>
      {founders.map((founder) => (
        <Link href={`/founder/${encodeURIComponent(founder.founder_slug)}`} key={founder.id}>
          <div className={styles.tile}>
            <div className={styles.imageContainer}>
              <img
                src={founder.founder_image}
                alt={founder.founder_name}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <h2 className={styles.name}>{founder.founder_name}</h2>
                <p className={styles.age}>
                  Age: {new Date().getFullYear() - founder.founder_birth_year}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
     </Suspense>

    
     </>
  );
};

export default Founders;
