"use client";

import React, { Suspense, useState } from 'react';
import { createClient } from '@/libs/supabase/client'; // Adjust the path to your Supabase client setup
const getLogoUrl = (apiName) => {
  return `https://img.logo.dev/${apiName}?token=pk_f8BWa9CoSCOyj527NcZ2LA`;
};

// Manually defined companies
const manualCompanies = [
    { inc_api_name: 'stripe.com' },
    { inc_api_name: 'airbnb.com' },
    { inc_api_name: 'instacart.com' },
    { inc_api_name: 'doordash.com' },
    { inc_api_name: 'twitch.com' },
    { inc_api_name: 'coinbase.com' },
    { inc_api_name: 'pagerduty.com' },
    { inc_api_name: 'mailchimp.com' },
    { inc_api_name: 'salesforce.com' },
    { inc_api_name: 'figma.com' },
    { inc_api_name: 'Zoom.us' },
    { inc_api_name: 'reddit.com' },
    { inc_api_name: 'gusto.com' },
    { inc_api_name: 'Asana.com' },
    { inc_api_name: 'dropbox.com' },
    { inc_api_name: 'Monday.com' },
    { inc_api_name: 'notion.com' },
    { inc_api_name: 'github.com' },
    { inc_api_name: 'Canva.com' },
    { inc_api_name: 'zapier.com' },
    { inc_api_name: 'Slack.com' },
    { inc_api_name: 'uber.com' },
    { inc_api_name: 'webflow.com' },
    { inc_api_name: 'Intercom.com' },
    { inc_api_name: 'HubSpot.com' },
    { inc_api_name: 'Loom.com' },
    { inc_api_name: 'Airtable.com' },
    { inc_api_name: 'Calendly.com' },
    { inc_api_name: 'spotify.com' },
    { inc_api_name: 'shopify.com' },

  // Add more companies as needed
];

export default function Logos() {
  const [companies] = useState(manualCompanies); // Keep only manual companies

  return (
    <>

    <Suspense>
        
    <div className="py-24 lg:py-16 bg-transparent dark:bg-transparent"> {/* Use transparent background */}
      <div className="mx-auto max-w-2xl px-6 lg:px-4">
        <div className="-mx-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 overflow-hidden sm:mx-0 sm:rounded-3xl">
          {companies.map((company, index) => (
            <div key={index} className="p-2"> {/* Removed bg-white for transparency */}
              <img
                alt={company.inc_api_name}
                src={getLogoUrl(company.inc_api_name)}
                width={600}  // Increase the width to make it larger
                height={300} // Increase the height accordingly
                className="max-h-24 w-full object-contain" // Adjust max height for better visibility
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </Suspense>
</>
  );
}
