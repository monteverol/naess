"use client";

import Footer from '@/components/ui/Footer';
import Head from 'next/head';
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function PartnershipPage() {
  return (
    <>
      <Head>
        <title>Strategic Partnerships | Maritime Shipping & Manning Agency</title>
        <meta name="description" content="Explore partnership opportunities with our leading maritime shipping and manning agency. Grow your business with our global network and expertise." />
        <meta name="keywords" content="maritime partnerships, shipping agency collaboration, manning agency alliance, maritime business opportunities" />
        <meta property="og:title" content="Strategic Maritime Partnerships" />
        <meta property="og:description" content="Join forces with our maritime shipping and manning agency for mutual growth and success." />
        <link rel="canonical" href="https://yourdomain.com/contact-us/partnership" />
      </Head>

      <div className="min-h-screen bg-gray-50 mt-20">
        {/* Hero Section */}
        <div className="bg-[#1A384F] text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Strategic Maritime Partnerships</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join forces with a leading maritime shipping and manning agency to expand your reach and enhance your service offerings.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1A384F] mb-4">Why Partner With Us?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer mutually beneficial partnerships that drive growth and create value for both parties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Global Network",
                description: "Access our extensive network of maritime professionals and shipping connections worldwide.",
                icon: "🌐"
              },
              {
                title: "Industry Expertise",
                description: "Leverage our decades of experience in maritime shipping and crew management.",
                icon: "⚓"
              },
              {
                title: "Shared Success",
                description: "Revenue-sharing models designed for long-term mutual growth and profitability.",
                icon: "📈"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#1A384F] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="bg-gray-50 py-16 px-8 md:px-20 lg:px-60">
          <header className="text-center mb-8 space-y-4">
            <h1 className="font-bold text-4xl">Get In Touch</h1>
            <p className="font-medium text-lg">Your next opportunity could be one message away—email, call, or visit us anytime.</p>
          </header>
          <div className="container w-full">
            <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:justify-between">
              {/* EMAIL */}
              <li className="bg-white group card flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:shadow-xl">
                <MdOutlineEmail size={40} className="text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
                <article className="flex flex-col gap-2">
                  <h2 className="text-[22px] font-extrabold text-gray-800">Email</h2>
                  <p className="text-[15px] text-gray-600">We'd love to hear from you! Reach out anytime!</p>
                </article>
                <a 
                  href="mailto:mail@naess.com.ph" 
                  className="text-[18px] font-bold text-blue-500 underline transition-colors duration-300 hover:text-blue-600"
                >
                  business@naess.com.ph
                </a>
              </li>
    
              {/* PHONE */}
              <li className="bg-white group card flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:shadow-xl">
                <MdOutlinePhone size={40} className="text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
                <article className="flex flex-col gap-2">
                  <h2 className="text-[22px] font-extrabold text-gray-800">Phone</h2>
                  <p className="text-[15px] text-gray-600">Chat with our team for immediate assistance.</p>
                </article>
                <a 
                  href="tel:+630285213361" 
                  className="text-[18px] font-bold text-blue-500 underline transition-colors duration-300 hover:text-blue-600"
                >
                  +63 9998433037
                </a>
              </li>
    
              {/* ADDRESS */}
              <li className="bg-white group card flex flex-col gap-6 justify-between items-start shadow-lg transition-all duration-300 hover:shadow-xl">
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

        {/* Partnership Form */}
        <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#1A384F] mb-2">Let's Work Together</h2>
                <p className="text-gray-600">Fill out the form below and our partnership team will contact you shortly.</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="required-field block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="required-field block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="required-field block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="required-field block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="partnership-type" className="required-field block text-sm font-medium text-gray-700">Type of Partnership</label>
                  <select
                    id="partnership-type"
                    name="partnership-type"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="crew-supply">Crew Supply</option>
                    <option value="vessel-management">Vessel Management</option>
                    <option value="training">Training Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="required-field block text-sm font-medium text-gray-700">How Can We Work Together?</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1A384F] focus:border-[#1A384F]"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1A384F] hover:bg-[#122738] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A384F] transition-colors"
                  >
                    Submit Partnership Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A384F] mb-4">Trusted By Industry Leaders</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our current partners about their experience working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "Our partnership has allowed us to expand our crew supply operations into three new markets with minimal risk.",
                name: "John Smith",
                title: "CEO, Oceanic Crew Solutions",
                company: "Oceanic Crew Solutions"
              },
              {
                quote: "The maritime expertise and professionalism of their team has made this one of our most valuable partnerships.",
                name: "Maria Rodriguez",
                title: "Director of Operations",
                company: "Global Shipping Partners"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-amber-500" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex flex-row gap-4">
                  <figure className="bg-gray-500 rounded-full min-w-12 max-w-12 min-h-12 max-h-12">

                  </figure>
                  <div>
                    <p className="font-medium text-[#1A384F]">{testimonial.name}</p>
                    <p className="text-gray-500">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}