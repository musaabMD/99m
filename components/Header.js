"use client"
import { useState, useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import logo from "@/app/icon.png";
import config from "@/config";
import { Building2, BarChart3, Users, CreditCard } from 'lucide-react';
import { Suspense } from 'react';

const links = [
  {
    href: "/company",
    label: "Companies",
    icon: Building2,
  },
  {
    href: "/market",
    label: "Markets",
    icon: BarChart3,
  },  
  {
    href: "/founder",
    label: "Founders",
    icon: Users,
  },
  {
    href: "/upgrade",
    label: "Upgrade",
    icon: CreditCard,
  },
];

const cta = <ButtonSignin extraStyle="btn-primary" />;

const Header = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

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
              className="flex items-center gap-2 shrink-0 "
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
              <span className="font-extrabold text-3xl text-white">{config.appName}</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-base-content"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center text-3xl text-white">
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="link link-hover"
                title={link.label}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
        </nav>

        <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
          <div
            className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
          >
            <div className="flex items-center justify-between">
              <Link
                className="flex items-center gap-2 shrink-0 "
                title={`${config.appName} homepage`}
                href="/"
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
                <span className="font-extrabold text-lg">{config.appName}</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
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

            <div className="flow-root mt-6">
              <div className="py-4">
                <div className="flex flex-col gap-y-4 items-start">
                  {links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.href}
                      className="link link-hover"
                      title={link.label}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <div className="flex flex-col">{cta}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation for small screens */}
      <div className="btm-nav lg:hidden">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              <Icon className="h-5 w-5" />
              <span className="btm-nav-label">{link.label}</span>
            </Link>
          );
        })}
      </div>
      </Suspense>

    </>
  );
};

export default Header;