"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Henrik",
      location: "Rävlanda",
      rating: 5,
      text: "Fantastisk service! Lavin Elektriska installerade laddstolpe för vår Volvo och jobbet var perfekt utfört. Professionellt och punktligt.",
    },
    {
      name: "Ted",
      location: "Mölndal",
      rating: 5,
      text: "Mycket nöjd med elinstallationen i vårt nya kök. Snabb respons på jouren och rimliga priser. Rekommenderar starkt!",
    },
    {
      name: "Ivan",
      location: "Åkered",
      rating: 5,
      text: "Lavin Elektriska hjälpte oss med elinstallationerna i vårt hus. Arbetet utfördes professionellt och enligt tidplan. Vi ger dem toppbetyg!",
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Vad våra kunder säger</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vi är stolta över vårt arbete och våra nöjda kunder är vårt bästa bevis på kvalitet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Image
                    key={i}
                    src="/svg/star-svgrepo-com.svg"
                    alt="check circle icon"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-6 h-6"
                  />
                ))}
              </div>

              <div className="relative">
               <Image
                    src="/svg/quote-svgrepo-com.svg"
                    alt="check circle icon"
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-8 h-8"
                  />
                <p className="text-gray-700 leading-relaxed pl-6">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
