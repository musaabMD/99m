"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

export default function CompanyList({ searchQuery }) { // Accept searchQuery as a prop
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
        <div key={company.id} className="mb-4 p-4 border rounded shadow bg-base-200 border-2 border-black">
          <div className="flex items-start">
            <Link href={`/company/${company.inc_api_name}`}>
              <Image
                src={getLogoUrl(company.inc_api_name)}
                alt={`${company.inc_name || 'Company'} logo`}
                width={80}
                height={80}
                className="rounded-full mr-4"
              />
            </Link>
            <div>
              <Link href={`/company/${company.inc_api_name}`}>
                <h2 className="text-2xl font-semibold text-blue-700">{company.inc_name || 'Unnamed Company'}</h2>
              </Link>
              <p className="text-1xl text-gray-500">{company.inc_category ? `${company.inc_category} SaaS` : 'Category not specified'}</p>
              <p className="my-2 text-1xl">ARR: ${company.inc_arr || 'N/A'}M</p>
              <p>Age: {calculateAge(company.founded)} years</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
