import PageHero from '@/components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';
import IncomoSearch from '@/components/Inclist';

export default function CompanyPage() {
  return (
    <>
      <Header />
      <PageHero
        title="Company Directory"
        description="Find information about companies across various industries."
        searchPlaceholder="Search companies..."
        backgroundColor="bg-blue-100"
      />
      <Suspense fallback={<div>Loading...</div>}>
        <IncomoSearch />
      </Suspense>
    </>
  );
}