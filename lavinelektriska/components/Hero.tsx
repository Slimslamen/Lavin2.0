'use client'

import { Phone, CheckCircle, ArrowRight, ListChecks } from "lucide-react";
import Image from "next/image";
// import { MoneySend, TruckFast } from "iconsax-astro";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden" aria-label="Startsida hero">
      {/* Responsive background image without LQIP */}
      <div className="absolute inset-0 w-full h-full max-w-full" aria-hidden="true">
        <picture>
          {/* Mobile (portrait / tighter crop). You can swap to another asset if desired. */}
          <source media="(max-width: 640px)" type="image/webp" srcSet="/Images/mobileHeader.webp" />
          {/* Desktop / larger screens */}
          <source media="(min-width: 641px)" type="image/webp" srcSet="/Images/HeroImg.webp" />
          {/* Fallback img element */}
          <Image
            fill
            preload={true}
            src="/Images/plejdHero.webp"
            alt="Bakgrundsbild elinstallation"
            className="object-cover object-center"
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
          />
        </picture>
        <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-black/30" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-t from-[#66BEF0]/20 to-transparent" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="animate-fade-in text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Lavin Elektriska AB
              </span>
              <br />
              <span className="text-[#66BEF0] drop-shadow-lg text-[25px] opacity-70">Din pålitliga elpartner</span>
            </h1>
            <div className="space-y-6 mb-8 text-lg">
              <p className="text-gray-200 leading-relaxed">
                Sedan starten har vi jobbat på att bygga erfarenhet och kunskap inom el-branschen för att kunna erbjuda
                våra kunder bästa möjliga service och kvalitet.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Vi gör mer än att dra kablar. Vi förverkligar dina idéer och skapar lösningar som får ditt hem eller
                projekt att fungera precis som du vill. Hos oss får du en elpartner som ser helheten, bryr sig om
                detaljerna och alltid arbetar för en lösning som passar just dina behov.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#CTA"
                id="Offert"
                className="border-2 text-center bg-[#66BEF0] border-[#66BEF0] text-white backdrop-blur-sm px-8 py-3 rounded-xl text-lg font-semibold hover:text-white transform hover:scale-95 transition-all duration-300 hover:shadow-lg"
                aria-label="Få gratis offert"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("CTA");
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
              >
                Gratis offert
              </a>
            </div>
            <div className="smallerbox grid grid-cols-1 sm:grid-cols-3 gap-4 smallerBox" aria-label="Företagsfördelar">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Elinstallationer</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Renoveringar</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">Nyproduktioner</span>
              </div>
            </div>
          </div>
          <div className="animate-fade-in lg:block">
            <div
              className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/20 shadow-2xl"
              aria-label="Varför välja oss?"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Varför välja oss?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    {/* <TruckFast size={27} color="#ffff" /> */}
                      <img
                      src="/svg/truck-speed-svgrepo-com.svg"
                      alt="truck speed icon"
                      className="w-8 h-8"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Snabb respons</p>
                    <p className="text-gray-300 text-sm">Svarar inom 24 timmar</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    <img
                      src="/svg/money-send-svgrepo-com.svg"
                      alt="Money send icon"
                      className="w-8 h-8"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Transparent prissättning</p>
                    <p className="text-gray-300 text-sm">Inga dolda kostnader</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    <img
                      src="/svg/list-checks-svgrepo-com.svg"
                      alt="list checks icon"
                      className="w-8 h-8"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Kvalitetsgaranti</p>
                    <p className="text-gray-300 text-sm">Garanti på allt arbete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
