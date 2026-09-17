import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LunchMenu from "@/components/LunchMenu";
import Contact from "@/components/Contact";
import CtaBanner from "@/components/CtaBanner";
import GiftVoucher from "@/components/GiftVoucher";
import Menu from "@/components/Menu";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import SpecialOfferPopup from "@/components/SpecialOfferPopup";

export default function Home() {
  return (
    <>
      <SpecialOfferPopup />
      <Navbar />
      <main>
        <Hero />
        <About />
        <LunchMenu />
        <CtaBanner />
        <GiftVoucher />
        <Menu />
        <Events />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
