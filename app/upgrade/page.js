import Header from '@/components/Header';
import PageHero from '../../components/PageHero';
import { Suspense } from 'react';
import Pricing from '@/components/Pricing';

const MarketPage = () => {
  return (
  
        <>
        <Suspense>


      
        <Header/>
      <PageHero
        title="Upgrade"
        description="Explore market trends, analysis, and economic indicators."
        backgroundColor="bg-white"
      />
      {/* Rest of the market page content */}
      <Pricing/>
      </Suspense>
        
        </>
  );
};

export default MarketPage;