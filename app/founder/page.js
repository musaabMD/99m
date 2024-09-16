import Founders from '@/components/Founder';
import PageHero from '../../components/PageHero';
import Header from '@/components/Header';
import { Suspense } from 'react';

const FounderPage = () => {
  return (
        <>

        <Suspense>
            
                <Header/>

      <PageHero
        title="Founder Spotlight"
        description="Learn about visionary entrepreneurs shaping the business world."
        searchPlaceholder="Search founders..."
        backgroundColor="bg-green-100"
      />
      {/* Rest of the founder page content */}
    </Suspense>
<Founders/>
    </>

  );
};

export default FounderPage;