import { AiFillTikTok, AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaLocationDot, FaPhone, FaAt } from "react-icons/fa6";

export default function Footer() {
  return(
    <footer className="w-full h-[512px] bg-white p-[40px] flex flex-col ">
      <section className="px-[40px] flex-1 flex flex-row justify-between gap-40">
        {/* FIRST COLUMN */}
        <section className="flex-1 flex flex-col gap-8">
          <figure>
            <img src="/images/naess-logo-black.png" alt="Naess Shipping Philippines Logo" />
            <figcaption className="hidden">Naess Shipping Philippines Inc. Icon</figcaption>
          </figure>
          <header>
            <h2 className="italic text-[20px]">"Navigation through new direction"</h2>
          </header>
        </section>
        {/* SECOND COLUMN */}
        <section className="flex flex-col gap-20">
          <article className="flex flex-col gap-4">
            <h1 className="font-bold text-[16px] uppercase">Social Media</h1>
            <ul className="flex flex-row gap-4">
              <li>
                <AiFillTikTok size={32} className="cursor-pointer transition duration-200 active:scale-95" />
              </li>
              <li>
                <AiFillFacebook size={32} className="cursor-pointer transition duration-200 active:scale-95" />
              </li>
              <li>
                <AiFillInstagram size={32} className="cursor-pointer transition duration-200 active:scale-95" />
              </li>
              <li>
                <AiFillLinkedin size={32} className="cursor-pointer transition duration-200 active:scale-95" />
              </li>
            </ul>
          </article>
          <button type="button" role="button" className="uppercase w-[200px] h-[40px] bg-transparent border-2 border-black rounded-sm font-bold cursor-pointer transition duration-200 hover:bg-[#1A384F] hover:text-white hover:border-[#1A384F] active:scale-95">principals log-in</button>
        </section>
        {/* THIRD COLUMN */}
        <section className="flex flex-col gap-8">
          <h2 className="uppercase font-bold text-[16px]">Contacts</h2>
          <article className="relative">
            <h3 className="hidden">Address</h3>
            <FaLocationDot color="#1A384F" size={20} className="absolute -left-8 top-1" />
            <p className="text-[16px]">2215 Leon Guinto St,<br />Malate, Manila<br />1004 Metro Manila</p>
          </article>
          <article className="relative">
            <h3 className="hidden">Phone Numbers</h3>
            <FaPhone color="#1A384F" size={20} className="absolute -left-8 top-1" />
            <p className="text-[16px]">+63 961-876-3109</p>
            <p className="text-[16px]">(632) 8521-3361</p>
          </article>
          <article className="relative">
            <h3 className="hidden">Email Address</h3>
            <FaAt color="#1A384F" size={20} className="absolute -left-8 top-1" />
            <p className="text-[16px]">recruitment@naess.com.ph</p>
            <p className="text-[16px]">main@naess.com.ph</p>
          </article>
        </section>
        {/* FOURTH COLUMN */}
        <section className="flex flex-col gap-8">
          <h3 className="uppercase font-bold text-[16px]">Navigations</h3>
          <ul className="flex flex-col gap-4 items-start">
            <li>
              <a href="#" className="underline cursor-pointer">Home</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">Careers</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">About Us</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">Services</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">Our Clients</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">News</a>
            </li>
            <li>
              <a href="#" className="underline cursor-pointer">Contact Us</a>
            </li>
          </ul>
        </section>
      </section>
      {/* BOTTOM LINE */}
      <section className="h-[40px] w-full flex flex-row justify-between items-center border-t-2 border-black">
        <p className="text-[14px]">© 2025 NAESS SHIPPING PHILIPPINES, INC. All rights reserved.</p>
        <ul className="flex flex-row gap-4">
          <li>
            <a href="#" className="text-black text-[14px] underline">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="text-black text-[14px] underline">Terms of Service</a>
          </li>
          <li>
            <a href="#" className="text-black text-[14px] underline">Cookies Settings</a>
          </li>
        </ul>
      </section>
    </footer>
  );
}