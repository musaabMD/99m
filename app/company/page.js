import PageHero from '../../components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';

export default function CompanyPage() {
  return (
    <>
    <Suspense>

    
                <Header/>

      <PageHero
        title="Company Directory"
        description="Find information about companies across various industries."
        searchPlaceholder="Search companies..."
        backgroundColor="bg-blue-100"
      />
      {/* Rest of the company page content */}
      </Suspense>

      </>

  );
}