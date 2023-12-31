"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { HiBars3, HiXMark, HiUserCircle } from "react-icons/hi2";
import clsx from "clsx";
import Image from "next/image";
import logoImg from "public/logo-neuralclocks.svg";

// Modified from https://tailwindui.com/components/application-ui/navigation/navbars
const Navbar = () => {
  const navigation = [
    { name: "Pomodoro", href: "/pomodoro", current: false },
    { name: "Schedule", href: "#", current: false },
  ];
  const pathname = usePathname();
  navigation.map((item) => {
    item.current = pathname === item.href;
  });

  return (
    <Disclosure as="nav" className="relative z-10 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto h-16 max-w-7xl border-b-2 border-b-slate-100 px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiXMark className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center transition-colors hover:rounded-lg hover:bg-primary-50">
                  <Link href="/">
                    <Image
                      className="mt-1 h-7 w-auto"
                      src={logoImg}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                {/* Desktop items */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            "rounded-md px-3 py-2 text-sm font-medium",
                            "underline decoration-2 underline-offset-8",
                            "transition-[text-decoration-color]",
                            item.current
                              ? "font-bold decoration-primary"
                              : "decoration-transparent hover:decoration-primary",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* Profile menu */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  {/* Profile picture */}
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <HiUserCircle className="h-8 w-8 fill-slate-600" />
                    </Menu.Button>
                  </div>
                  {/* Profile dropdown */}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={clsx(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={clsx(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile items */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 bg-gray-100 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "font-bold underline decoration-primary decoration-2 underline-offset-4"
                      : "hover:underline hover:decoration-primary hover:decoration-2 hover:underline-offset-8",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
