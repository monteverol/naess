"use client";

import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import DropdownList from "./DropdownList";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ logoWhite, logoBlack }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(null);
  const pathname = usePathname(); // Get current page path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", to: "/" },
    {
      name: "About Us",
      dropdown: [
        { name: "Company Profile", to: "#" },
        { name: "Mission and Vision", to: "#" },
        { name: "History", to: "#" },
        { name: "Leadership / BOD", to: "#" },
        { name: "Partnerships", to: "#" },
      ],
    },
    {
      name: "Services",
      dropdown: [
        { name: "Recruitment", to: "#" },
        { name: "Production", to: "#" },
        { name: "Installation", to: "#" },
        { name: "On-Board Procedures", to: "#" },
        { name: "Post-Contract Activities", to: "#" },
        { name: "SMAS Crewing System", to: "#" },
      ],
    },
    { name: "Clients", to: "#" },
    { name: "News", to: "#" },
    { name: "Careers", to: "#" },
    { name: "Contact Us", to: "/contact-us" },
  ];

  const isLandingPage = pathname === "/"; 
  const backgroundClass = isLandingPage
    ? scrolled || openMenu
      ? "bg-white shadow-md"
      : "bg-transparent"
    : "bg-white shadow-md";

  return (
    <nav className={`${scrolled || openMenu ? "bg-white shadow-md" : "bg-transparent"} ${backgroundClass} flex flex-col px-4 lg:px-20 xl:px-40 w-full fixed top-0 left-0 z-50 transition-all`}>
      <div className="w-full h-16 flex justify-between items-center">
        <img src={scrolled || openMenu ? logoBlack : logoWhite} alt="Company Logo" className="h-8" />
        <button
          className="p-2 rounded-lg drop-shadow-md cursor-pointer bg-white lg:hidden"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {openMenu ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>

        {/* 🔹 Desktop Menu */}
        <ul className="hidden lg:flex flex-row gap-8">
          {menuItems.map((item, index) =>
            item.dropdown ? (
              <DropdownList key={index} title={item.name} items={item.dropdown} textColor={scrolled || !isLandingPage ? "text-black" : "text-white"} />
            ) : (
              <li key={index}>
                <Link href={item.to} className={`text-[18px] anchor ${scrolled || !isLandingPage ? "text-black after:bg-black" : "text-white after:bg-white"}`}>
                  {item.name}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed top-16 left-0 w-full bg-white flex flex-col items-center transition-all duration-300 ${openMenu ? "h-auto p-8 rounded-b-3xl drop-shadow-lg" : "h-0 overflow-hidden p-0 invisible"}`}>
        {/* If a submenu is selected, show sub-links */}
        {mobileSubMenu ? (
          <>
            <button
              className="mb-4 px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg w-full text-center transition duration-200 active:scale-95"
              onClick={() => setMobileSubMenu(null)}
            >
              ← Back
            </button>
            <ul className="flex flex-wrap gap-4 justify-center">
              {mobileSubMenu.map((subItem, index) => (
                <li key={index} className="w-40 h-16 p-4 bg-[#1A384F] flex justify-center items-center rounded-lg shadow-lg transition duration-200 active:scale-95">
                  <Link href={subItem.to} className=" text-white font-semibold">
                    {subItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          // Show main menu if no submenu is selected
          <ul className="flex flex-wrap gap-4 justify-center">
            {menuItems.map((item, index) => (
              <li key={index} className="">
                {item.dropdown ? (
                  <button className="text-white font-semibold w-40 h-16 p-4 bg-[#1A384F] flex justify-center items-center rounded-lg shadow-lg transition duration-200 active:scale-95 cursor-pointer" onClick={() => setMobileSubMenu(item.dropdown)}>
                    {item.name}
                  </button>
                ) : (
                  <Link href={item.to} className="text-white font-semibold w-40 h-16 p-4 bg-[#1A384F] flex justify-center items-center rounded-lg shadow-lg transition duration-200 active:scale-95">
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
