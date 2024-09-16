"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Suspense } from 'react';

const IncomoSearch = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    if (supabase) {
      fetchCompanies();
    }
  }, [supabase]);

  useEffect(() => {
    filterCompanies();
  }, [searchTerm, companies]);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('inc')
      .select('id, inc_name, inc_api_name, inc_category, inc_arr, founded');
    if (error) {
      console.error('Error fetching companies:', error);
    } else {
      setCompanies(data);
      setFilteredCompanies(data);
    }
  };

  const filterCompanies = () => {
    const filtered = companies.filter(company =>
      company.inc_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const getLogoUrl = (apiName) => {
    return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
  };

  const calculateAge = (foundedDate) => {
    const founded = new Date(foundedDate);
    const now = new Date();
    return now.getFullYear() - founded.getFullYear();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="incomo-search bg-base-100 min-h-screen p-4 md:p-8">
        <div className="search-container mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="companies-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <Link key={company.id} href={`/company/${company.inc_api_name}`} passHref>
                <div className="company-card bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 border border-gray-200">
                  <div className="relative h-64 flex flex-col items-center justify-center">
                    <img
                      src={getLogoUrl(company.inc_api_name)}
                      alt={company.inc_name}
                      className="w-40 h-40 object-contain"
                    />
                    <h3 className="text-3xl font-semibold mt-4 text-center">{company.inc_name}</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{company.inc_category} SaaS</span>
                      <span className="text-3xl bg-green-100 text-green-800 px-3 py-1 rounded-full">${company.inc_arr}33M</span>
                    </div>
                    <div className="text-3xl text-gray-600">Age: {calculateAge(company.founded)} years</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-3xl">No companies found.</p>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default IncomoSearch;