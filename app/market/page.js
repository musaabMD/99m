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
   
      </Suspense>

</>
  );
};

export default MarketPage;