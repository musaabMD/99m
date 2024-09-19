"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';
import Header from '@/components/Header';
import { Search } from 'lucide-react';

const CompanyApp = () => {
  const params = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const supabase = createClient();
      const inc_api_name = params.inc_name;
      if (!inc_api_name) {
        setError("No company name provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('inc')
          .select('*')
          .eq('inc_api_name', inc_api_name)
          .single();
        if (error) throw error;
        setCompanyDetails(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setError("Failed to fetch company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [params.inc_name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!companyDetails) return <p>No company found.</p>;

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
           
          </div>
          
         
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <img src={`https://img.logo.dev/${companyDetails.inc_api_name}?token=pk_f8BWa9CoSCOyj527NcZ2LA`} alt={companyDetails.inc_name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-2xl font-bold">{companyDetails.inc_name} <span className="text-gray-500 font-normal text-sm">{companyDetails.inc_location || 'Location not available'}</span></h2>
                <p className="text-gray-700">{companyDetails.inc_description || 'No description available.'}</p>
                <div className="mt-2">
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Y {companyDetails.inc_year || 'N/A'}</span>
                  {companyDetails.inc_category && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{companyDetails.inc_category}</span>
                  )}
                  {companyDetails.inc_subcategory && (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{companyDetails.inc_subcategory}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyApp;