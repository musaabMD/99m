"use client"

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import logo from "@/app/icon.png";
import config from "@/config";
import { Building2, BarChart3, Users, CreditCard } from 'lucide-react';
import { Suspense } from 'react';

const links = [
  // {
  //   href: "/company",
  //   label: "Companies",
  //   icon: Building2,
  // },
  // {
  //   href: "/market",
  //   label: "Markets",
  //   icon: BarChart3,
  // },  
  // {
  //   href: "/founder",
  //   label: "Founders",
  //   icon: Users,
  // }, 
  {
    href: "/category",
    label: "Categories",
    icon: Users,
  },
  {
    href: "/upgrade",
    label: "Plus",
    icon: CreditCard,
  },
];

const cta = <ButtonSignin extraStyle="btn-primary" />;

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <Suspense>
        <header className="bg-black">
          <nav
            className="container flex items-center justify-between px-8 py-4 mx-auto"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link
                className="flex items-center gap-2 shrink-0"
                href="/"
                title={`${config.appName} homepage`}
              >
                <Image
                  src={logo}
                  alt={`${config.appName} logo`}
                  className="w-8"
                  placeholder="blur"
                  priority={true}
                  width={32}
                  height={32}
                />
                <span className="font-extrabold text-1xl text-white">{config.appName}</span>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Toggle main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl text-white hover:text-gray-300 transition-colors ${pathname === link.href ? 'font-bold' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
          </nav>

          {/* Mobile menu panel */}
          {isOpen && (
            <div className="lg:hidden">
              <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">{config.appName}</span>
                    <Image
                      src={logo}
                      alt={`${config.appName} logo`}
                      className="w-8"
                      placeholder="blur"
                      priority={true}
                      width={32}
                      height={32}
                    />
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      {links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                    <div className="py-6">
                      {cta}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Bottom Navigation for small screens */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <nav className="flex justify-around bg-black text-white p-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center ${pathname === link.href ? 'text-white font-bold' : 'text-gray-400'}`}
                >
                  <Icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </Suspense>
    </>
  );
};

export default Header;