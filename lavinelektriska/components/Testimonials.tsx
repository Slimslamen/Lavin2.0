'use client'

import { Star, Quote } from 'lucide-react';

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
    }
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
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center mb-6">
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="w-8 h-8 text-[#66BEF0] opacity-20 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  {testimonial.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;