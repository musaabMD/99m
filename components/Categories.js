"use client";

import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { createClient } from "../libs/supabase/client";
import "./categories.css";
import { Suspense } from 'react';

// List of colors to be used sequentially for categories
const categoryColors = [
  "#026C56",
  "#354E71",
  "#E20F00",
  "#5E7784",
  "#FF00C7",
  "#BA2DB7",
];

const Categories = ({ searchQuery }) => {
  const [categories, setCategories] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (

    <>
    <Suspense>
   
    <div className="categories-container">
      {filteredCategories.map((category, index) => (
        <Link href={`/category/${category.category_name}`} key={index}>
          <div
            className="category-tile"
            style={{
              backgroundColor: categoryColors[index % categoryColors.length], // Assign color from the list
            }}
          >
        

            {/* Display category image and name */}
            <div className="category-name text-3xl">
              
              
            {category.category_image}  {category.category_name}
            </div>
            <div className="category-description">
              {category.category_description || "No description available"}
            </div>
          </div>
        </Link>
      ))}
    </div>
    </Suspense>

    
</>
  );
};

export default Categories;
