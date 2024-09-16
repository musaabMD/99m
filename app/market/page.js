import Header from '@/components/Header';
import PageHero from '../../components/PageHero';
import { Suspense } from 'react';

const MarketPage = () => {
  return (
  
        <>
       <Suspense>

        <Header/>
      <PageHero
        title="Market Insights"
        description="Explore market trends, analysis, and economic indicators."
        searchPlaceholder="Search market data..."
        backgroundColor="bg-purple-100"
      />
      {/* Rest of the market page content */}

      <h1 className='text-center text-5xl '> newseltter market , $13B, growth </h1>
      <h1 className='text-center text-3xl '> resend , kit , etc with rank tips </h1>

   
      </Suspense>

</>
  );
};

export default MarketPage;