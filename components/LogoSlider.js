import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const TwoRowLogoScroll = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('inc')
      .select('id, inc_name, inc_api_name')
      .order('inc_name')
      .limit(28); // Fetch 28 companies (14 for each row)

    if (error) {
      console.error('Error fetching companies:', error);
    } else {
      setCompanies(data);
    }
  };

  const getLogoUrl = (apiName) => {
    return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
  };

  return (
    <div className="logo-slider">
      <div className="slider">
        <div className="slide-track">
          {companies.slice(0, 14).map((company) => (
            <div key={company.id} className="slide">
              <Image
                src={getLogoUrl(company.inc_api_name)}
                alt={`${company.inc_name} logo`}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          ))}
          {companies.slice(0, 14).map((company) => (
            <div key={`${company.id}-duplicate`} className="slide">
              <Image
                src={getLogoUrl(company.inc_api_name)}
                alt={`${company.inc_name} logo`}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="slider" style={{ animationDirection: 'reverse' }}>
        <div className="slide-track">
          {companies.slice(14).map((company) => (
            <div key={company.id} className="slide">
              <Image
                src={getLogoUrl(company.inc_api_name)}
                width={100}
                height={100}
                alt={`${company.inc_name} logo`}
                className="rounded-full"
              />
            </div>
          ))}
          {companies.slice(14).map((company) => (
            <div key={`${company.id}-duplicate`} className="slide">
              <Image
                src={getLogoUrl(company.inc_api_name)}
                width={100}
                height={100}
                alt={`${company.inc_name} logo`}
                className="rounded-full"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .logo-slider {
          overflow: hidden;
        }
        .slider {
          height: 120px;
          margin: auto;
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .slide-track {
          animation: scroll 40s linear infinite;
          display: flex;
          width: calc(200px * 28);
        }
        .slide {
          height: 100px;
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-200px * 14))}
        }
      `}</style>
    </div>
  );
};

export default TwoRowLogoScroll;