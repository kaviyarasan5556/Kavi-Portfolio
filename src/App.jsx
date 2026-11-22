import { Providers } from '@/components/providers/Providers';
import { Hero } from '@/components/sections/Hero';
import { Inventory } from '@/components/sections/Inventory';
import { NewLead } from '@/components/sections/NewLead';
import { Orders } from '@/components/sections/Orders';
import { Overview } from '@/components/sections/Overview';
import { Pipeline } from '@/components/sections/Pipeline';
import { Records } from '@/components/sections/Records';
import { Footer } from '@/components/ui/Footer';
import { Preloader } from '@/components/ui/Preloader';
import { TopBar } from '@/components/ui/TopBar';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="backdrop-grid" aria-hidden="true" />
      <Preloader />

      <Providers>
        <TopBar />
        <main id="main" className="relative z-10">
          <Hero />
          <Overview />
          <Inventory />
          <Pipeline />
          <Orders />
          <Records />
          <NewLead />
        </main>
        <Footer />
      </Providers>

      <div className="backdrop-grain" aria-hidden="true" />
    </>
  );
}
