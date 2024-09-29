"use client";

import { useState, useEffect } from 'react';
import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import CompanyList from '../../components/Inclist';
import { createClient } from '@/libs/supabase/client';

export default function CompanyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const supabase = createClient();
      try {
        let { data, error } = await supabase
          .from('inc')
          .select('inc_name, inc_category, inc_founded_year, inc_age, inc_description');
        if (error) throw error;
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setError("Failed to fetch companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      <CompanyList companies={companies} searchQuery={searchQuery} />
    </>
  );
}