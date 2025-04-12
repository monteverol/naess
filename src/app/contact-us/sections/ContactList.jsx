import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function ContactList() {
  return (
    <section className="bg-gradient-to-br from-white via-white to-blue-50 py-16 px-8 md:px-20 lg:px-60">
      <div className="container w-full">
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:justify-between">
          {/* EMAIL */}
          <li className="group card p-8 rounded-2xl bg-white flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50">
            <MdOutlineEmail size={40} className="text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
            <article className="flex flex-col gap-2">
              <h2 className="text-[22px] font-extrabold text-gray-800">Email</h2>
              <p className="text-[15px] text-gray-600">We'd love to hear from you! Reach out anytime!</p>
            </article>
            <a 
              href="mailto:mail@naess.com.ph" 
              className="text-[18px] font-bold text-blue-500 underline transition-colors duration-300 hover:text-blue-600"
            >
              mail@naess.com.ph
            </a>
          </li>

          {/* PHONE */}
          <li className="group card p-8 rounded-2xl bg-white flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50">
            <MdOutlinePhone size={40} className="text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
            <article className="flex flex-col gap-2">
              <h2 className="text-[22px] font-extrabold text-gray-800">Phone</h2>
              <p className="text-[15px] text-gray-600">Chat with our team for immediate assistance.</p>
            </article>
            <a 
              href="tel:+630285213361" 
              className="text-[18px] font-bold text-blue-500 underline transition-colors duration-300 hover:text-blue-600"
            >
              +63 (02) 8521-3361
            </a>
          </li>

          {/* ADDRESS */}
          <li className="group card p-8 rounded-2xl bg-white flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50">
            <FaLocationDot size={40} className="text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
            <article className="flex flex-col gap-2">
              <h2 className="text-[22px] font-extrabold text-gray-800">Address</h2>
              <p className="text-[15px] text-gray-600">We accept walk-ins to assist you thoroughly.</p>
            </article>
            <a 
              href="https://goo.gl/maps/your-location" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[18px] font-bold text-blue-500 underline transition-colors duration-300 hover:text-blue-600"
            >
              2215 Leon Guinto St, Malate, Manila, 1004 Metro Manila
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
