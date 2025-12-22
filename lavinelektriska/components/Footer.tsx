"use client";

import { FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SlSocialLinkedin } from "react-icons/sl";
import { TfiFacebook } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo" aria-label="Sidfot">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <span className="flex items-center gap-2 mb-4" aria-label="Startsida">
              <div className="w-10 h-10 bg-[#66BEF0] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl text-center" aria-hidden="true">
                  LE
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Lavin Elektriska</h3>
                <p className="text-sm text-gray-400">Auktoriserad & försäkrad</p>
              </div>
            </span>
            <p className="text-gray-400 leading-relaxed">
              Professionella elektriska tjänster för bostäder och kommersiella fastigheter. Din pålitliga partner för
              säkra, tillförlitliga elektriska lösningar.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontaktinfo</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/svg/phone-svgrepo-com.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
                <span className="text-gray-400">+46729110256</span>
              </div>
              <div className="flex items-center gap-3">
                 <Image
                  src="/svg/mail-svgrepo-com.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
                <span className="text-gray-400">Le@lavinelektriska.se</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Följ oss</h4>
            <div className="flex gap-4 mb-6">
              <Link
                href="https://www.instagram.com/lavinelektriska/?igsh=Yjk4YzhqYWx5ZXoz#"
                className="w-10 h-10 bg-[#66BEF0] rounded-lg flex items-center justify-center hover:bg-[#5aa8d4] transition-colors"
                aria-label="Instagram"
                rel="noopener noreferrer"
                target="_blank"
              >
               <Image
                  src="/svg/instagram-svgrepo-com.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                href="https://www.facebook.com/people/Lavin-Elektriska/61555416595421/"
                className="w-10 h-10 bg-[#66BEF0] rounded-lg flex items-center justify-center hover:bg-[#5aa8d4] transition-colors"
                aria-label="Facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
               <Image
                  src="/svg/facebook-176-svgrepo-com.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/lavin-elektriska/about/"
                className="w-10 h-10 bg-[#66BEF0] rounded-lg flex items-center justify-center hover:bg-[#5aa8d4] transition-colors"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  src="/svg/linkedin-svgrepo-com.svg"
                  alt="check circle icon"
                  width={24}
                  height={24}
                  loading="lazy"
                  className="w-6 h-6"
                />
              </Link>
            </div>

            <div className="text-center flex flex-row items-center justify-center md:ml-[-10px]">
              <Image
                width={100}
                height={100}
                src="/Images/Elsäkerhetsverket.png"
                loading="lazy"
                alt="Elsäkerhetsverket logotyp"
                className="w-10 h-10"
              />
              <div className="bg-orange-500 text-white py-1 rounded-full text-sm font-semibold inline-block">
                Godkända av: ELSÄKERHETSVERKET
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row md:justify-between justify-center text-center items-center">
          <p className="text-gray-400 text-center md:text-left">©2026 Lavin Elektriska AB.</p>
          <div className="mt-4 md:mt-0">
            <Link
              href="/policy"
              className="text-gray-400 hover:text-[#66BEF0] transition-colors"
              aria-label="Sekretesspolicy"
            >
              Sekretesspolicy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
