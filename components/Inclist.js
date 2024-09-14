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
      .select('id, inc_name, inc_api_name');

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

  return (
    <>
        <Suspense>


    <div className="incomo-search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">
          <Search className="search-icon" />
        </button>
      </div>

      <div className="companies-container">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map(company => (
            <Link key={company.id} href={`/company/${company.inc_api_name}`} passHref>
              <div className="company-card">
                <div 
                  className="bg-image"
                  style={{ backgroundImage: `url(${getLogoUrl(company.inc_api_name)})` }}
                ></div>
                <div className="overlay"></div>
                <div className="card-content">
                  <img 
                    src={getLogoUrl(company.inc_api_name)} 
                    alt={company.inc_name} 
                    className="small-logo"
                  />
                  <h3 className="company-name">{company.inc_name}</h3>
                  {/* <p className="company-strategy">Monetization Strategy</p> */}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No companies found.</p>
        )}
      </div>

      <style jsx>{`
        .incomo-search {
          background-color: black;
          padding: 20px;
          min-height: 100vh;
        }
        .search-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .search-input {
          width: 300px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px 0 0 4px;
          outline: none;
          font-size: 16px;
        }
        .search-button {
          background-color: #f4f4f4;
          border: 1px solid #ccc;
          border-left: none;
          border-radius: 0 4px 4px 0;
          padding: 10px 15px;
          cursor: pointer;
        }
        .search-icon {
          width: 20px;
          height: 20px;
          color: #333;
        }
        .companies-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 8fr));
          gap: 20px;
          padding: 100px;
        }
        .company-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          height: 200px;
          padding: 20px;
          background-color:base;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          overflow: hidden; /* Ensures the bg-image is contained within the card */
        }
        .bg-image {
        
        }
        .overlay {
         
        }
        .card-content {
          position: relative;
          z-index: 2; /* Ensure the content is above both the blur and overlay */
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .small-logo {
          width: 140px;
          height: 140px;
          object-fit: contain;
          margin-bottom: 10px;
          border-radius: 50%; /* Make the logo circular */
          z-index: 2; /* Ensure logo is on top */
          
        }
        .company-name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .company-strategy {
          font-size: 14px;
        }
      `}</style>
    </div>

    </Suspense>

</>
  
  );
};

export default IncomoSearch;
