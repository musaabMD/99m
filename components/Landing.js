'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/libs/supabase/client';
import Image from 'next/image';

export default function Landing() {
  const [logoUrl, setLogoUrl] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [supabase, setSupabase] = useState(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);

  // Initialize Supabase client
  useEffect(() => {
    const supabaseClient = createClient();
    setSupabase(supabaseClient);
  }, []);

  // Fetch companies from Supabase
  useEffect(() => {
    if (supabase) {
      fetchCompanies();
    }
  }, [supabase]);

  const fetchCompanies = async () => {
    try {
      const { data, error } = await supabase
        .from('inc')
        .select('id, inc_name, inc_api_name');
      if (error) throw error;
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error.message);
    }
  };

  const getLogoUrl = (apiName) => {
    return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
  };

  // Set a random logo every second
  useEffect(() => {
    if (companies.length > 0) {
      const interval = setInterval(() => {
        const randomCompany = companies[Math.floor(Math.random() * companies.length)];
        setLogoUrl(getLogoUrl(randomCompany.inc_api_name));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [companies]);

  // Set animation duration for scrolling logos
  useEffect(() => {
    const scrollElements = [scrollRef1.current, scrollRef2.current, scrollRef3.current];
    scrollElements.forEach(scrollElement => {
      if (scrollElement) {
        const scrollWidth = scrollElement.scrollWidth;
        const animationDuration = scrollWidth / 30; // Adjust speed: slightly faster
        scrollElement.style.animationDuration = `${animationDuration}s`;
      }
    });
  }, [companies]);

  const renderScrollingRow = (rowRef, rowCompanies) => (
    <div
      ref={rowRef}
      className="flex animate-scroll items-center"
      style={{
        width: 'fit-content',
        animation: 'scroll 90s linear infinite', // Adjusting for faster scrolling
      }}
    >
      {[...rowCompanies, ...rowCompanies].map((company, index) => (
        <div key={index} className="flex items-center mx-8">
          <div 
            className="w-28 h-28 rounded-lg mr-6 flex items-center justify-center bg-white border border-gray-200 shadow-md"
          >
            <Image
              src={getLogoUrl(company.inc_api_name)}
              alt={`${company.inc_name} logo`}
              width={112}  // 2x size
              height={112}
              className="rounded-lg"
            />
          </div>
          <span className="text-2xl font-semibold text-gray-800">{company.inc_name}</span>
        </div>
      ))}
    </div>
  );

  const thirdLength = Math.ceil(companies.length / 3);
  const row1Companies = companies.slice(0, thirdLength);
  const row2Companies = companies.slice(thirdLength, 2 * thirdLength);
  const row3Companies = companies.slice(2 * thirdLength, companies.length);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
            M
          </div>
          <span className="font-bold text-xl">99Maker</span>
        </div>
        <nav className="space-x-4">
          <Link href="/pricing" className="hover:underline hidden sm:inline">Pricing</Link>
          <Link href="/login" className="hover:underline">Log in</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        {logoUrl ? (
          <div className="w-24 h-24 mb-8 rounded-full border border-gray-300 flex items-center justify-center">
            <Image 
              src={logoUrl} 
              alt="Company logo" 
              width={96} 
              height={96} 
              className="rounded-full" // Smaller and rounded logo above hero text
            />
          </div>
        ) : (
          <div className="w-24 h-24 mb-8 rounded-full bg-gray-200 animate-pulse"></div>
        )}
        <h1 className="text-6xl sm:text-7xl font-bold mb-4 max-w-4xl">
          Discover real-world design inspiration.
        </h1>
        <p className="text-2xl sm:text-3xl mb-8 max-w-2xl">
          Featuring over 300,000 screens and 1,000 iOS, Android & Web apps — New content weekly.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            href="/join" 
            className="block sm:inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Join for free
          </Link>
          <Link 
            href="/plans" 
            className="block sm:inline-block bg-white text-black px-6 py-3 rounded-full font-semibold border border-black hover:bg-gray-100 transition-colors"
          >
            See our plans →
          </Link>
        </div>
      </main>

      {/* Scrolling Logos Section - 3 Rows */}
      <div className="overflow-hidden w-full py-8 bg-white">
        <div className="space-y-8">
          {renderScrollingRow(scrollRef1, row1Companies)}
          {renderScrollingRow(scrollRef2, row2Companies)}
          {renderScrollingRow(scrollRef3, row3Companies)}
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-990%);
            }
          }
          .animate-scroll {
            animation: scroll linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
