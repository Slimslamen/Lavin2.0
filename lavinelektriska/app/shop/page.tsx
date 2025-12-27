"use client";

import { useState } from "react";
import Reveal from "../../components/Reveal";
import ShopBundleConfigurator from "../../components/ShopFolder/ShopBundleConfigurator";
import SecondHeader from "../../components/SeconHeader";
import ShopCards from "../../components/ShopFolder/ShopCards";
import Footer from "../../components/Footer";
import ShopConfirmationModal from "../../components/ShopFolder/ShopConfirmationModal";


const BUNDLES = [
  {
    id: "elinstallationer",
    name: "Elinstallationer",
    icon: "/svg/box-svgrepo-com.svg",
    blurb: "Startpaket för ett rum eller mindre uppgraderingar.",
    basePrice: 1495,
    maxItems: 10,
    items: [
      { id: "backup-power", name: "Reservkraftsmodul (litet)", price: 2490, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean aliquet, lacus sed pulvinar euismod, quam quam elementum lectus, sit amet maximus risus arcu at ante. Fusce eget mi quis felis ultricies mollis. Aliquam eget aliquet ex. Etiam venenatis sed dolor in feugiat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi massa leo, aliquam quis dictum ac, commodo nec nisi. Aliquam porta libero vel nulla fringilla finibus. Maecenas in urna finibus, vehicula arcu quis, pretium dolor. Phasellus sed nibh vitae enim tristique molestie. Nulla non elit sollicitudin dui sagittis commodo nec eu lorem. Sed eget enim arcu. Aenean dignissim ligula ligula, ut auctor arcu imperdiet quis. Phasellus laoreet auctor metus, quis accumsan mauris dictum sit amet. Nam interdum, erat a bibendum placerat, velit magna molestie elit, vitae tristique dolor ex quis arcu.", image: "/Images/plejd.png" },
      { id: "security-pack", name: "Säkerhetspaket (sensorer)", price: 1690, description: "test2", image: "/Images/plejd.png" },
      { id: "smart-hub", name: "Smart hub", price: 1290, description: "test3", image: "/Images/plejd.png" },
      { id: "pro-dimmer", name: "Pro dimmer (2‑zon)", price: 690, description: "test4", image: "/Images/plejd.png" },
      { id: "stair-led", name: "LED-trappbelysning", price: 1290, description: "test5", image: "/Images/plejd.png" },
      { id: "garage-kit", name: "Garage el-kit", price: 1890, description: "test6", image: "/Images/plejd.png" },
      { id: "bath-fan", name: "Badrumsfläkt tyst", price: 1490, description: "test7", image: "/Images/plejd.png" },
    ],
  },
  // {
  //   id: "Elbesiktning",
  //   name: "Elbesiktning",
  //   icon: "/svg/shield-svgrepo-com.svg",
  //   blurb: "Besikta ditt hus eller anläggning",
  //   basePrice: 3495,
  //   maxItems: 0,
  //   items: [],
  // },
  {
    id: "Laddboxar",
    name: "Laddboxar",
    icon: "/svg/zap-svgrepo-com.svg",
    blurb: "För full uppgradering och toppmodern bekvämlighet.",
    basePrice: 7495,
    maxItems: 3,
    items: [
      { id: "led-pack", name: "LED-lampor (4-pack)", price: 249, description: "test8" },
      { id: "smart-outlet", name: "Smart vägguttag", price: 399, description: "test9" },
      { id: "dimmer", name: "Dimmer-brytare", price: 349, description: "test10" },
      { id: "smoke-detector", name: "Brandvarnare", price: 299, description: "test11" },
      { id: "surge", name: "Överspänningsskydd", price: 199, description: "test12" },
    ],
  },
];

export default function Shop() {
  const [activeBundle, setActiveBundle] = useState<(typeof BUNDLES)[number] | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div>
      <SecondHeader />
      <div className="static h-[90rem]  md:h-[60rem] pb-20 bg-lineaer-to-br from-gray-50 to-blue-50">
        <div className="Moviebg relative min-h-[20rem] md:min-h-[35rem] mb-12 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/Videos/Working.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          <Reveal className="relative z-10">
            <header className="text-center px-4 py-12 md:py-20">
              <h1 className="text-4xl font-bold text-gray-50 drop-shadow mb-3">Välj paket och anpassa</h1>
              <p className="text-gray-100/90 max-w-2xl mx-auto drop-shadow">
                Tre färdiga el‑paket som du kan skräddarsy med valfria produkter. Perfekt för att planera en offert.
              </p>
            </header>
          </Reveal>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[28rem] max-w-7xl w-full px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {BUNDLES.map((b) => (
              <Reveal key={b.id}>
                <ShopCards bundle={b} onSelect={() => setActiveBundle(b)} />
              </Reveal>
            ))}
          </div>
        </div>

        {activeBundle && (
          <ShopBundleConfigurator
            bundle={activeBundle}
            onClose={() => setActiveBundle(null)}
            onRequestQuote={() => {
              setShowConfirmation(true);
            }}
          />
        )}
      </div>
      {showConfirmation && <ShopConfirmationModal onClose={() => setShowConfirmation(false)} />}
      <Footer />
    </div>
  );
}
