"use client";

import { useState } from "react";
import Contact from "./Contact";
import { SlPhone } from "react-icons/sl";
import { FaRegMessage } from "react-icons/fa6";
import Image from "next/image";

const CTA = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <section
      id="CTA"
      className="py-20 bg-gradient-to-r from-[#66BEF0] to-[#4A90E2] relative overflow-hidden"
      aria-label="Call to Action"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Redo att lösa dina elproblem?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Kontakta oss idag för gratis konsultation och kostnadsförslag. Vi finns här för att hjälpa dig med alla dina
            elektriska behov.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 max-w-4xl ${showContact ? "my-[-40px]" : ""} mx-auto`}>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <Image
                src="/svg/message-square-svgrepo-com.svg"
                alt="message icon"
                width={24}
                height={24}
                loading="lazy"
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Skicka meddelande</h3>
            <p className="text-blue-100 mb-4">Vi svarar vanligtvis inom 24 timmar</p>
            <button
              id="sendMessage"
              onClick={() => setShowContact(!showContact)}
              className="bg-[#66BEF0] text-white px-6 py-3 rounded-lg font-semibold inline-block"
              aria-label="Skicka e-post"
            >
              Skicka e-post
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
            <div
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              <Image
                src="/svg/phone-svgrepo-com.svg"
                alt="phone icon"
                width={24}
                height={24}
                loading="lazy"
                className="w-10 h-10"
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ring</h3>
            <p className="text-blue-100 mb-4">Gratis konsultation</p>
            <a
              id="CallPhone"
              href="tel:+46729110256"
              className="bg-[#66BEF0] text-white px-6 py-3 rounded-lg font-semibold inline-block"
              aria-label="Ring +46729110256"
            >
              Ring +46729110256
            </a>
          </div>
        </div>
        <Contact showContent={showContact} />
      </div>
    </section>
  );
};

export default CTA;
