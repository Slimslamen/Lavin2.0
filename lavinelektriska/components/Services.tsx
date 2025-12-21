'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Service {
  id: number;
  title: string;
  image: string;
  description: string;
}

const Services = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);
  
  const services: Service[] = [
    {
      id: 1,
      title: "Laddstolpar",
      image: "/Images/uteInstallation2.webp",
      description: "Noggrant utförda installationer av laddstolpar gör det enkelt att ladda elbilen snabbt, säkert och hållbart.",
    },
    {
      id: 2,
      title: "Byggström",
      image: "/Images/byggström.jpg",
      description: "Tillfälliga och säkra elinstallationer för byggarbetsplatser, anpassade efter projektets behov och gällande krav.",
    },
    {
      id: 3,
      title: "Elbesiktning",
      image: "/Images/ElMatning.webp",
      description: "Noggrann elbesiktning som säkerställer att installationer uppfyller gällande säkerhetskrav och fungerar som de ska.",
    },
    {
      id: 4,
      title: "Felsökningar",
      image: "/Images/felsokningReparationer.webp",
      description: "Professionell felsökning och reparation av ditt elsystem, inklusive åtgärd av kortslutningar, strömavbrott och andra elektriska fel.",
    },
    {
      id: 5,
      title: "Konsultation",
      image: "/Images/uteKablar.webp",
      description: "Rådgivning och planering för trygga, effektiva och hållbara el-lösningar anpassade efter dina behov.",
    },
       {
      id: 6,
      title: "Elinstallationer",
      image: "/Images/ElCentralArbete.webp",
      description: "Dina elinstallationer uppdateras med den senaste tekniken och moderna lösningar för bästa resultat, anpassat för just dina behov och din vardag.",
    },
  ];

  const handleCardClick = (id: number): void => {
    if (!isMobile) return; // Only allow toggle on mobile
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center pt-8 pb-40">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Våra tjänster</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Från enkla reparationer till komplexa installationer erbjuder vi omfattande 
            elektriska tjänster för bostäder och kommersiella fastigheter.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:gap-20 gap-8 justify-items-center content">
          {services.slice(0,65).map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service.id)}
              onKeyDown={(e) => {
                if (!isMobile) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(service.id);
                }
              }}
              data-expanded={isMobile && expandedCard === service.id}
              role={isMobile ? "button" : undefined}
              tabIndex={isMobile ? 0 : -1}
              aria-disabled={!isMobile}
              className={`group relative h-96 md:w-[65vh] 2xl:w-[50vh] rounded-2xl overflow-hidden cursor-pointer md:cursor-default shadow-lg transition-all duration-500 ease-out
                ${isMobile && expandedCard === service.id ? "h-[640px] z-50 md:h-96" : ""}
                md:hover:w-[120%] md:hover:z-50
                  `}
            >
              {/* Background Image */}
              <Image fill loading="lazy" src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />

              {/* Overlay with blur */}
              <div
                className={`absolute inset-0 transition-all duration-500
                ${isMobile && expandedCard === service.id ? "bg-black/20 backdrop-blur-none" : "bg-black/40 backdrop-blur-sm"}
                md:hover:backdrop-blur-none md:hover:bg-black/20
              `}
              />

              {/* Hover/Active Description */}
              <p
                className={`absolute left-6 right-6 bottom-20 text-white/95 text-lg md:text-base leading-snug transition-all duration-300 w-5/6
                ${isMobile && expandedCard === service.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                md:group-hover:opacity-100 md:group-hover:translate-y-0`}
              >
                {service.description}
              </p>

              {/* Title */}
              <div className="absolute bottom-6 left-6 text-white font-semibold text-2xl">{service.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
