import Header from '@/components/header';
import Hero from '@/components/hero';
import InsuranceTypes from '@/components/insurance-types';
import Faq from '@/components/faq';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <InsuranceTypes />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
