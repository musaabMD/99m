// "use client";
// import Link from 'next/link';
// import React, { useEffect, useState } from "react";
// import { createClient } from "@/libs/supabase/client";
// import "./categories.css";
// import { Suspense } from 'react';

// const categoryColors = [
//   "#026C56",
// ];

// const Categories = ({ searchQuery }) => {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const supabase = createClient();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const { data, error } = await supabase
//           .from("category")
//           .select("id, category_name, category_emoji, slug");
//         if (error) throw error;
//         console.log("Fetched categories:", data);
//         setCategories(data || []);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const filteredCategories = categories.filter(category =>
//     category.category_name.toLowerCase().includes((searchQuery || "").toLowerCase())
//   );

//   if (isLoading) return <div>Loading categories...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (categories.length === 0) return <div>No categories found.</div>;

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <div className="categories-container">
//         {filteredCategories.map((category, index) => {
//           const href = `/category/${encodeURIComponent(category.slug || category.category_name)}`;
//           console.log("Generated href:", href);
//           return (
//             <Link href={href} key={category.id}>
//               <div
//                 className="category-tile "
//                 style={{
//                   backgroundColor: categoryColors[index % categoryColors.length],
//                 }}
//               >
//                 <div className="category-name text-5xl ">
//                   {category.category_emoji || '🔹'} 
//                   <br />
//                   <br />
//                   {category.category_name}
//                   <br />
//                 </div>
//                 <br />

//                 <h1>                  33 Tips
//                 </h1>
              
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </Suspense>
//   );
// };

// export default Categories;

"use client";

import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { createClient } from "@/libs/supabase/client";
import "./categories.css";
import { Suspense } from 'react';

const categoryColors = [
  "#026C56",
  // Add more colors as needed
];

const Categories = ({ searchQuery }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("category")
          .select("id, category_name, category_emoji, slug");
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;
  if (filteredCategories.length === 0) return <div>No categories found.</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="categories-container">
        {filteredCategories.map((category, index) => {
          const href = `/category/${encodeURIComponent(category.slug || category.category_name)}`;
          return (
            <Link href={href} key={category.id}>
              <div
                className="category-tile"
                style={{
                  backgroundColor: categoryColors[index % categoryColors.length],
                }}
              >
                <div className="category-name text-5xl">
                  {category.category_emoji || '🔹'}
                  <br />
                  <br />
                  {category.category_name}
                </div>
                <br />
                <h1>33 Tips</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </Suspense>
  );
};

export default Categories;