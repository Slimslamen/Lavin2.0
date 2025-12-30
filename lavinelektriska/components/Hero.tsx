"use client";

import Image from "next/image";
import { useSupabase } from "@/Context/supabaseContext";
// import { MoneySend, TruckFast } from "iconsax-astro";

const Hero = () => {
  const { textsMap } = useSupabase();
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
                  {textsMap?.hero_title_line1 ?? 'Lavin Elektriska AB'}
              </span>
              <br />
                <span className="text-[#66BEF0] drop-shadow-lg text-[25px] opacity-70">{textsMap?.hero_title_line2 ?? 'Din pålitliga elpartner'}</span>
            </h1>
            <div className="space-y-6 mb-8 text-lg">
                <p className="text-gray-200 leading-relaxed">{textsMap?.hero_p1 ?? 'Text laddar...'}</p>
                <p className="text-gray-300 leading-relaxed">{textsMap?.hero_p2 ?? 'Text laddar...'}</p>
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
                {textsMap?.hero_cta ?? 'Gratis offert'}
              </a>
            </div>
            <div className="smallerbox grid grid-cols-1 sm:grid-cols-3 gap-4 smallerBox" aria-label="Företagsfördelar">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <Image
                  src="/svg/checkCircle.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="eager"
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">{textsMap?.hero_feature1_title ?? 'Elinstallationer'}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <Image
                  src="/svg/checkCircle.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="eager"
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">{textsMap?.hero_feature2_title ?? 'Renoveringar'}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <Image
                  src="/svg/checkCircle.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="eager"
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">{textsMap?.hero_feature3_title ?? 'Nyproduktioner'}</span>
              </div>
            </div>
          </div>
          <div className="animate-fade-in lg:block">
            <div
              className="bg-white/10 backdrop-blur-2xl p-8 rounded-2xl border border-white/20 shadow-2xl"
              aria-label="Varför välja oss?"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{textsMap?.hero_right_title ?? 'Varför välja oss?'}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    {/* <TruckFast size={27} color="#ffff" /> */}
                    <Image
                      src="/svg/truck-speed-svgrepo-com.svg"
                      alt="truck speed icon"
                      width={32}
                      height={32}
                      className="w-10 h-10"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{textsMap?.hero_right_item1_title ?? 'Snabb respons'}</p>
                    <p className="text-gray-300 text-sm">{textsMap?.hero_right_item1_sub ?? 'Svarar inom 24 timmar'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    <Image
                      src="/svg/money-send-svgrepo-com.svg"
                      alt="Money send icon"
                      width={32}
                      height={32}
                      className="w-10 h-10"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{textsMap?.hero_right_item2_title ?? 'Transparent prissättning'}</p>
                    <p className="text-gray-300 text-sm">{textsMap?.hero_right_item2_sub ?? 'Inga dolda kostnader'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                    <Image
                      src="/svg/list-checks-svgrepo-com.svg"
                      alt="list checks icon"
                      width={32}
                      height={32}
                      className="w-10 h-10"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{textsMap?.hero_right_item3_title ?? 'Kvalitetsgaranti'}</p>
                    <p className="text-gray-300 text-sm">{textsMap?.hero_right_item3_sub ?? 'Garanti på allt arbete'}</p>
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
