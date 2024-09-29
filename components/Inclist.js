// import React, { useState, useEffect } from 'react';
// import { createClient } from '@/libs/supabase/client';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function CompanyList({ searchQuery }) {
//   const [companies, setCompanies] = useState([]);
//   const [sortBy, setSortBy] = useState('default');
//   const [supabase, setSupabase] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setSupabase(createClient());
//   }, []);

//   useEffect(() => {
//     if (supabase) {
//       fetchCompanies();
//     }
//   }, [supabase]);

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('inc')
//         .select('id, inc_name, inc_api_name, inc_category, inc_arr, inc_age, inc_founded_year');
//       if (error) throw error;
//       setCompanies(data);
//     } catch (error) {
//       setError('Error fetching companies: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredCompanies = companies.filter(company =>
//     (company.inc_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
//     (company.inc_category?.toLowerCase() || '').includes(searchQuery.toLowerCase())
//   );

//   const sortedCompanies = [...filteredCompanies].sort((a, b) => {
//     if (sortBy === 'name') return (a.inc_name || '').localeCompare(b.inc_name || '');
//     if (sortBy === 'arr') return (b.inc_arr || 0) - (a.inc_arr || 0);
//     if (sortBy === 'age') return (b.inc_age || 0) - (a.inc_age || 0);
//     return 0;
//   });

//   const getLogoUrl = (apiName) => {
//     return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
//   };

//   const calculateAge = (foundedYear) => {
//     if (!foundedYear) return 'N/A';
//     const currentYear = new Date().getFullYear();
//     return currentYear - foundedYear;
//   };

//   if (loading) {
//     return <div className="container mx-auto p-4">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Companies</h1>
//         <div className="flex items-center">
//           <span className="mr-2">Sort by</span>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border rounded p-2"
//           >
//             <option value="default">Default</option>
//             <option value="name">Name</option>
//             <option value="arr">ARR</option>
//             <option value="age">Age</option>
//           </select>
//         </div>
//       </div>
//       <p className="mb-4">Showing {sortedCompanies.length} of {companies.length} companies</p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {sortedCompanies.map(company => (
//           <div key={company.id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0">
//                   <Image
//                     src={getLogoUrl(company.inc_api_name)}
//                     alt={`${company.inc_name || 'Company'} logo`}
//                     width={64}
//                     height={64}
//                     className="rounded-full"
//                   />
//                 </div>
//                 <div>
//                   <Link href={`/company/${company.inc_api_name}`}>
//                     <h2 className="text-2xl font-bold text-gray-800">{company.inc_name || 'Unnamed Company'}</h2>
//                   </Link>
//                   <p className="text-sm text-gray-600">
//                     {company.inc_category ? `${company.inc_category} SaaS` : 'Category not specified'}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   {company.inc_category?.toUpperCase() || 'CATEGORY NOT SPECIFIED'}
//                 </span>
//               </div>
//             </div>
//             <div className="bg-gray-500 px-4 py-5 sm:px-6">
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//                 <div className="text-center">
//                   <div className="text-xl font-semibold text-white">${company.inc_arr || 'N/A'}M</div>
//                   <div className="text-sm text-blue-200">ARR</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl font-semibold text-white">
//                     {company.inc_age || calculateAge(company.inc_founded_year)}
//                   </div>
//                   <div className="text-sm text-blue-200">AGE</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl font-semibold text-white">N/A</div>
//                   <div className="text-sm text-blue-200">EMPLOYEES</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl font-semibold text-white">N/A</div>
//                   <div className="text-sm text-blue-200">FOUNDERS</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { createClient } from '@/libs/supabase/client';
import Image from 'next/image';

export default function CompanyList({ searchQuery }) {
  const [companies, setCompanies] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [selectedFlag, setSelectedFlag] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [supabase, setSupabase] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const { data, error } = await supabase
        .from('inc')
        .select('id, inc_name, inc_api_name, inc_category, inc_arr, inc_age, inc_founded_year, inc_flag');
      if (error) throw error;
      setCompanies(data);
    } catch (error) {
      setError('Error fetching companies: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearchQuery = (company.inc_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (company.inc_category?.toLowerCase() || '').includes(searchQuery.toLowerCase());

    const matchesFlag = selectedFlag === 'all' || company.inc_flag === selectedFlag;
    const matchesCategory = selectedCategory === 'all' || company.inc_category === selectedCategory;

    return matchesSearchQuery && matchesFlag && matchesCategory;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'name') return (a.inc_name || '').localeCompare(b.inc_name || '');
    if (sortBy === 'arr') return (b.inc_arr || 0) - (a.inc_arr || 0);
    if (sortBy === 'age') return (b.inc_age || 0) - (a.inc_age || 0);
    return 0;
  });

  const getLogoUrl = (apiName) => {
    return apiName ? `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA` : '/placeholder.svg?height=48&width=48';
  };

  const formatRevenue = (num) => {
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(1)}B`;  // Format billions
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(1)}M`;  // Format millions
    } else {
      return `${num}`;  // Show full number if less than a million
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

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

  // Get unique flags and categories for filter options
  const uniqueFlags = [...new Set(companies.map(company => company.inc_flag))].filter(Boolean);
  const uniqueCategories = [...new Set(companies.map(company => company.inc_category))].filter(Boolean);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Companies</h1>
        <div className="flex items-center">
          <span className="mr-2">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2 mr-4"
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="arr">ARR</option>
            <option value="age">Age</option>
          </select>

          {/* Filter by Flag */}
          <span className="mr-2">Filter by Flag</span>
          <select
            value={selectedFlag}
            onChange={(e) => setSelectedFlag(e.target.value)}
            className="border rounded p-2 mr-4"
          >
            <option value="all">All Flags</option>
            {uniqueFlags.map((flag) => (
              <option key={flag} value={flag}>
                {flag}
              </option>
            ))}
          </select>

          {/* Filter by Category */}
          <span className="mr-2">Filter by Category</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-4 text-4xl">Showing {sortedCompanies.length} of {companies.length} companies</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCompanies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-3 border border-gray-800 p-8"
          >
            <div className="flex items-center mb-6">
              <Image
                src={getLogoUrl(company.inc_api_name)}
                alt={`${company.inc_name || 'Company'} logo`}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-gray-800"
              />
              <div className="ml-6 flex-grow">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{company.inc_name || 'NA'}</h2>
                  <span className="text-6xl" title={company.inc_flag || 'NA'}>
                    {company.inc_flag || '🌍'}
                  </span>
                </div>
                <p className="text-lg text-gray-600">{company.inc_category || 'NA'}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6 text-lg">{company.description || 'NA'}</p>
            <div className="flex items-center justify-between text-lg text-gray-600 bg-base-300">
              <div className="flex items-center text-2xl">
                <span>Started {company.inc_age || 'NA'} yrs ago</span>
              </div>
              <div className="flex items-center text-black font-bold text-2xl">
                {company.inc_arr ? formatRevenue(company.inc_arr) : 'NA'} ARR
                <div className="text-lg text-gray-600 font-thin"><h2>est.</h2></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

