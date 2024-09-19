import React, { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

export default function CompanyList({ searchQuery }) {
  const [companies, setCompanies] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [supabase, setSupabase] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSupabase(createClient());
  }, []);

  useEffect(() => {
    if (supabase) {
      fetchCompanies();
    }
  }, [supabase]);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('inc')
        .select('id, inc_name, inc_api_name, inc_category, inc_arr, founded, employees, founders');
      if (error) throw error;
      setCompanies(data);
    } catch (error) {
      setError('Error fetching companies: ' + error.message);
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

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedCompanies.map(company => (
          <div key={company.id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 sm:p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={getLogoUrl(company.inc_api_name)}
                    alt={`${company.inc_name || 'Company'} logo`}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <Link href={`/company/${company.inc_api_name}`}>
                    <h2 className="text-2xl font-bold text-gray-800">{company.inc_name || 'Unnamed Company'}</h2>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {company.inc_category ? `${company.inc_category} SaaS` : 'Category not specified'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {company.inc_category?.toUpperCase() || 'CATEGORY NOT SPECIFIED'}
                </span>
              </div>
            </div>
            <div className="bg-gray-500 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-xl font-semibold text-white">${company.inc_arr || 'N/A'}M</div>
                  <div className="text-sm text-blue-200">ARR</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-white">{company.founded ? new Date().getFullYear() - new Date(company.founded).getFullYear() : 'N/A'}</div>
                  <div className="text-sm text-blue-200">AGE</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-white">{company.employees || 'N/A'}</div>
                  <div className="text-sm text-blue-200">EMPLOYEES</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-white">{company.founders || 'N/A'}</div>
                  <div className="text-sm text-blue-200">FOUNDERS</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}