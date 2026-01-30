import { MainBanner } from './MainBanner';
import { SideBanner } from './SideBanner';

export default function HeroSection() {
  return (
    <section className='w-full px-4 py-6 md:px-8 lg:px-12'>
      <div className='grid gap-4 lg:grid-cols-3'>
        
        <MainBanner />

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
          <SideBanner
            title='Bamboo Buds'
            label='New Arrival'
            gradient='from-purple-600 to-pink-500'
            image='/earbuds.png'
          />
          <SideBanner
            title='HomePod Pro'
            label='New Arrival'
            gradient='from-gray-900 to-gray-700'
            image='/speaker.png'
          />
        </div>
      </div>
    </section>
  );
}
