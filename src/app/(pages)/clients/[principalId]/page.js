"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const PrincipalPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { principalId } = unwrappedParams;

  const [principalData, setPrincipalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/clients');
        const principal = await response.json();
        
        const foundPrincipal = principal.find((item) => item.id.toString() === principalId);

        if (foundPrincipal) {
          setPrincipalData(foundPrincipal);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [principalId]);

  if (loading) return <p>Loading...</p>;
  if (!principalData) return <p>No news item found</p>;

  return(
    <>
      <section className={`bg-white mt-20 px-8 md:px-20 lg:px-40 py-8 flex flex-col gap-8 lg:flex-row ${principalData.vessels ? "justify-between items-start" : "justify-center items-center"}`}>
        <article className="w-full lg:w-[600px] flex flex-col items-center lg:items-start">
          <h2 className="text-6xl font-bold mb-4">{principalData.name}</h2>
          <Breadcrumbs />
          <Image
            src={principalData.logo}
            width={400}
            height={250}
            alt={`${principalData.name} logo image`}
          />
          <p className="mt-4 text-lg text-justify w-full">
            {principalData.description}  
          </p>
        </article>
        {principalData.vessels && (
          <section className="w-1/2 grid grid-cols-2 xl:grid-cols-3 gap-4">
            {
              principalData.vessels.map((vessel, index) => (
                <section
                  key={index} 
                  onClick={() => setSelectedImage(vessel)}
                  className="rounded-md cursor-pointer overflow-hidden relative w-full h-40 drop-shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: `
                      linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('${vessel}')
                      no-repeat center/cover
                    `
                  }}
                >
                  <h3 className="text-white font-bold absolute bottom-4 left-1/2 -translate-x-1/2">${'{'}ship_name{'}'}</h3>
                </section>
              ))
            }
          </section>
        )}
      </section>
      <Footer />

      {/* MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.8)]"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative bg-white p-4 rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={selectedImage}
              alt="Full-size vessel image"
              width={800}
              height={500}
              className="rounded drop-shadow-md"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default PrincipalPage