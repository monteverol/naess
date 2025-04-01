import { IoLogoFacebook } from "react-icons/io";
import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";

export default function InquireSection() {
  return (
    <section 
      className="lg:px-20 xl:px-40 lg:items-center p-8 w-full h-screen flex justify-center drop-shadow-[0_-4px_8px_rgba(0,0,0,0.25)] lg:drop-shadow-md bg-blue-100"
      aria-labelledby="inquire-heading"
    >
      <div className="lg:flex lg:flex-col lg:justify-between hidden h-[686px] w-full">
        <article className="flex flex-col gap-4">
          <h2 className="text-[20px] text-black font-bold">Connect</h2>
          <h1 className="text-[48px] text-black font-bold">Inquire</h1>
          <p className="text-[20px] text-black">We're here to assist you with any inquiries.</p>
        </article>
        <section className="flex flex-col gap-4">
          <h3 className="text-[24px] font-bold">Stay in the loop, connect with us!</h3>
          <ul className="flex flex-row gap-4">
            <li>
              <IoLogoFacebook size={32} color="#1A384F" />
            </li>
            <li>
              <FaSquareInstagram size={32} color="#1A384F" />
            </li>
            <li>
              <FaLinkedin size={32} color="#1A384F" />
            </li>
            <li>
              <AiFillTikTok size={32} color="#1A384F" />
            </li>
          </ul>
        </section>
      </div>
      <div 
        className="w-full h-fit max-w-lg bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        role="form"
        aria-label="Inquiry Form"
      >
        <h2 id="inquire-heading" className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us 📩
        </h2>
        <p className="text-center text-gray-600 mb-4">
          We're here to assist you with any inquiries.
        </p>
        
        <form className="flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="name" 
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A384F]"
              required 
              aria-required="true"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A384F]"
              required 
              aria-required="true"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label htmlFor="contact_number" className="block text-gray-700 font-semibold mb-1">
              Contact Number
            </label>
            <input 
              type="tel" 
              id="contact_number" 
              name="contact_number"
              placeholder="Enter your phone number (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A384F]"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea 
              id="message" 
              name="message"
              rows="4"
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A384F] resize-none"
              required
              aria-required="true"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-3 text-lg font-bold text-white bg-[#1A384F] rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
            aria-label="Send inquiry message"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}