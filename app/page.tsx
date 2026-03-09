import Navbar from "@/components/landing/Navbar";
import HeroMosaic from "@/components/landing/HeroMosaic";
import Rail from "@/components/landing/Rail";
import FeatureBands from "@/components/landing/FeatureBands";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import Pricing from "@/components/landing/Pricing";
import { landing } from "@/components/landing/styles";

export default function Page() {
  return (
    <main className={landing.page}>
      <Navbar />
      <HeroMosaic />
      <Rail title="Právě letí" />
      <FeatureBands />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
