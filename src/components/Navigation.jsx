import { useState, useEffect } from "react";
import DropdownList from "./DropdownList";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <nav
      className={`h-[120px] w-full px-20 flex flex-row justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <img
        src={scrolled ? "/images/naess-logo-black.png" : "/images/naess-logo-white.png"}
        alt="Naess Logo"
      />
      <ul className="flex flex-row gap-8">
        <li>
          <a
            href="#"
            className={`text-[18px] anchor ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            HOME
          </a>
        </li>
        <DropdownList
          title="ABOUT US"
          items={[
            { name: "Company Profile", to: "#" },
            { name: "Mission and Vission", to: "#" },
            { name: "History", to: "#" },
            { name: "Leadership / BOD", to: "#" },
            { name: "Partnerships", to: "#" },
          ]}
          textColor={scrolled ? "text-black" : "text-white"}
        />
        <DropdownList
          title="SERVICES"
          items={[
            { name: "Recruitment", to: "#" },
            { name: "Production", to: "#" },
            { name: "Installation", to: "#" },
            { name: "On-Board Procedures", to: "#" },
            { name: "Post-Contract Activities", to: "#" },
            { name: "SMAS Crewing System", to: "#" },
          ]}
          textColor={scrolled ? "text-black" : "text-white"}
        />
        <li>
          <a
            href="#"
            className={`text-[18px] anchor ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            CLIENTS
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`text-[18px] anchor ${
              scrolled ? "text-black" : "text-white"}
            `}
          >
            NEWS
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`text-[18px] anchor ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            CAREERS
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`text-[18px] anchor ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            CONTACT US
          </a>
        </li>
      </ul>
    </nav>
  );
}