import Header from '@/components/Header';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQs';
import JoinAndContact from '@/components/JoinAndContact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className='top-20 relative'>
        <About />
        <Experience />
        <Services />
        <Work />
        <Testimonials />
        <FAQ />
        <JoinAndContact />
      </main>
      <Footer />
    </>
  );
}
