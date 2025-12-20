'use client'

import Carousel from "./Carousel";
import Reveal from "./Reveal";

const About = () => {

  return (
    <section id="about" className="py-20 bg-white" aria-label="Om Lavin Elektriska">
      <div className="container mx-auto px-4">
        <div className="md:grid lg:grid-cols-3  md:gap-12 lg:gap-24 items-center md:items-start">
          <Reveal direction="left" className="aboutText w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Om Lavin Elektriska</h2>
            <p className="text-lg text-gray-600 mb-6">
              Lavin Elektriska grundades i Småland och har idag sin bas i Västra Götaland. Med över lång erfarenhet i
              branschen har vi byggt upp ett starkt rykte för att leverera trygga, professionella elinstallationer,
              alltid med fokus på kvalitet och noggrannhet.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Bred kompetens har vuxit fram genom att arbeta nära både privatpersoner, företag och fastighetsägare. Vår
              erfarenhet gör att vi kan ta oss an både små och stora uppdrag med trygg hand, oavsett om det gäller
              servicejobb, nybyggnation eller tekniska lösningar.
            </p>

            <div className="flex flex-wrap gap-4" aria-label="Certifikat och medlemskap">
              <div className="bg-[#66BEF0] text-white px-4 py-2 rounded-full font-semibold">
                AL - Auktoriserad Elektriker
              </div>
              <div className="bg-[#66BEF0] text-white px-4 py-2 rounded-full font-semibold">
                SEK Svenska Elstandard - medlem
              </div>
              <div className="bg-[#66BEF0] text-white px-4 py-2 rounded-full font-semibold">ELSÄK-FS kraven följs</div>
            </div>
          </Reveal>

          <Reveal direction="right" className="CarouselContainer col-span-2 md:max-h-[50vh]">
            <div aria-label="Företagsbilder">
              <Carousel />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
