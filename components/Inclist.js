import React, { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

export default function CompanyList({ searchQuery }) {
  const [companies, setCompanies] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    if (supabase) {
      fetchCompanies();
    }
  }, [supabase]);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('inc')
      .select('id, inc_name, inc_api_name, inc_category, inc_arr, founded');
    if (error) {
      console.error('Error fetching companies:', error);
    } else {
      setCompanies(data);
    }
  };

  const filteredCompanies = companies.filter(company =>
    (company.inc_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (company.inc_category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'name') return (a.inc_name || '').localeCompare(b.inc_name || '');
    if (sortBy === 'arr') return (b.inc_arr || 0) - (a.inc_arr || 0);
    return 0;
  });

  const getLogoUrl = (apiName) => {
    return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
  };

  const calculateAge = (foundedDate) => {
    if (!foundedDate) return 'N/A';
    const founded = new Date(foundedDate);
    const now = new Date();
    return now.getFullYear() - founded.getFullYear();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex items-center">
          <span className="mr-2">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2"
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="arr">ARR</option>
          </select>
        </div>
      </div>
      <p className="mb-4">Showing {sortedCompanies.length} of {companies.length} companies</p>
      {sortedCompanies.map(company => (
        <div key={company.id} className="flex max-w-full mx-auto border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
          <div className="p-2 sm:p-3 md:p-4 lg:p-6 flex-grow flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <Image
              src={getLogoUrl(company.inc_api_name)}
              alt={`${company.inc_name || 'Company'} logo`}
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-full"
            />
            <div className="min-w-0 flex-grow">
              <Link href={`/company/${company.inc_api_name}`}>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">{company.inc_name || 'Unnamed Company'}</h2>
              </Link>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 truncate">
                {company.inc_category ? `${company.inc_category} SaaS` : 'Category not specified'}
              </p>
              <span className="inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 truncate max-w-full mt-1 sm:mt-2">
                {company.inc_category?.toUpperCase() || 'CATEGORY NOT SPECIFIED'}
              </span>
            </div>
          </div>
          <div className="bg-gray-100 p-2 sm:p-3 md:p-4 lg:p-6 flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">$23M/M</p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">ARR</p>
            </div>
            <div className="text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold"> 23 Years</p> 
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600">AGE</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}