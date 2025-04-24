import { ChevronDown } from 'lucide-react';
import { useState } from "react";

export default function FAQ({ faqs }) {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return(
    <section className="py-12 section bg-[#E4EEFB] grid justify-center">
      <div className="section-inner-width lg:flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center mb-8 lg:mb-0 lg:text-start">Frequently Asked Questions</h2>
          <div className="hidden lg:flex flex-col gap-8">
            <p className="text-black w-2/3 text-lg">Find answers to your questions about careers and opportunities at NAESS SHIPPING PHILIPPINES, INC.</p>
            <button className="text-[#E4EEFB] text-lg w-40 font-bold bg-[#1A384F] px-4 py-2 rounded-md btn">
              Contact Us
            </button>
          </div>
        </div>
        <div className="space-y-4 lg:w-1/2">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg bg-white">
              <button
                className="flex justify-between items-center w-full p-5 text-left font-semibold focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    activeAccordion === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all max-h-0 ${
                  activeAccordion === index ? 'max-h-96' : ''
                }`}
              >
                <div className="p-5 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}