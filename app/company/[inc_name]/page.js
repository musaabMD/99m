"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/libs/supabase/client';

const CompanyApp = () => {
  const params = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h1>{companyDetails.inc_name}</h1>
      <p>API Name: {companyDetails.inc_api_name}</p>
      {/* Add more company details here */}
    </div>
  );
};

export default CompanyApp;