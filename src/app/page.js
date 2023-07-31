import Image from 'next/image';

import HeroSection from '../views/landing/heroSection';
import OurServices from '../views/landing/ourServices';
import WhyChooseUs from '../views/landing/whyChooseUs';
import Testimonials from '../views/landing/testimonials';
import GetStarted from '../views/landing/getStarted';
import PublicLayout from '../components/publicLayout';

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      {/* <OurServices /> */}
      <WhyChooseUs />
      <Testimonials />
      <GetStarted />
    </PublicLayout>
  )
}
