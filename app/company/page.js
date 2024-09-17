"use client";

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';
import CompanyList from '../../components/Inclist'; // Using the updated CompanyList

export default function CompanyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header />
      <PageHero
        title="Company Directory"
        description="Find information about companies across various industries."
        searchPlaceholder="Search companies..."
        backgroundColor="bg-blue-100"
        onSearch={handleSearch}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyList searchQuery={searchQuery} /> {/* Passing the search query to CompanyList */}
      </Suspense>
    </>
  );
}
