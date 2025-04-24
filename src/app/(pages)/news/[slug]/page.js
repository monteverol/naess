"use client";

import Footer from "@/components/ui/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { use, useEffect, useState } from "react";
import NewsArticle from "../components/ui/NewsArticle";
import DOMPurify from 'dompurify';

const NewsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;

  const [newsItem, setNewsItem] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [photoIndex, setPhotoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const news = await response.json();
        console.log(news);

        const foundNewsItem = news.find((item) => item.slug.toString() === slug.toString());
        console.log(foundNewsItem);
        const otherNews = news.filter((item) => item.slug.toString() !== slug.toString());

        if (foundNewsItem) {
          setNewsItem(foundNewsItem);
          setOtherNews(otherNews);
          console.log(otherNews)
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>No news item found</p>;

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <Breadcrumbs />
        <h1 className="text-6xl lg:text-8xl font-bold mb-4 capitalize">{newsItem.title}</h1>
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-gray-500 text-lg italic">
            {new Date(newsItem.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            | By {newsItem.author}
          </p>
          <ul className="flex flex-row items-center gap-4">
            <li className="text-gray-600">Share:</li>
            <li>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </li>
            <li>
              <a 
                href={`https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}`} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Instagram"
                className="text-pink-600 hover:text-pink-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </li>
            <li>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <img
          src={newsItem.feature_image}
          alt={newsItem.title}
          className="w-full h-80 object-cover my-4 rounded-md object-[50%_20%]"
        />
        <div className="mt-4">
          <h3 className="text-md font-semibold">Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {newsItem.tags.map((tag, index) => (
              <span
              key={index}
              className="bg-blue-200 text-blue-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* <p className="text-lg font-semibold">{newsItem.summary}</p> */}
        <div 
          className="mt-4 text-gray-700 text-xl innerHTML"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsItem.content.replace(/\n\n/g, '<br/>').replace(/\n/g, ' ')) }}
        ></div>
      </div>
      
      {/* GALLERY OF MULTIPLE PICTURES */}
      {newsItem.image.length > 1 && (
        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {newsItem.image.map((img, index) => (
              <div
                key={index}
                className="w-full h-64 overflow-hidden rounded-md shadow-lg cursor-pointer hover:drop-shadow-xl active:scale-95 transition-all duration-300"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {/* GALLERY OF MULTIPLE PICTURES
      {newsItem.image.length > 1 && (
        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <div className="relative h-80">
            {newsItem.image.slice(0, 3).map((img, index) => (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 hover:h-80 overflow-hidden rounded-md shadow-lg cursor-pointer hover:drop-shadow-xl active:scale-95 transition-all duration-300 p-4 bg-white`}
                style={{ transform: `rotate(${index * 3 - 6}deg)` }}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )} */}

      <div className="px-8 md:px-20 lg:px-40 mt-8">
        <div className="w-full h-1 bg-gray-400"></div>
      </div>
      {/* LATEST NEWS CAROUSEL */}
      <section className="p-8 md:px-20 lg:px-40 w-full">
        <h3 className="font-bold text-4xl mb-4">Latest News</h3>
        <div className="flex gap-4 w-full flex-col md:flex-row">
          {
            otherNews.slice(0, 3).map(item => (
              <div className="max-w-full md:max-w-[calc(100%/2-1rem)] lg:max-w-[calc(100%/3-1rem)] flex-shrink-0" key={item.id}>
                <NewsArticle item={item} />
              </div>
            ))
          }
        </div>
      </section>
      <Footer />

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.8)] flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsModalOpen(false);
          }}
          tabIndex={0}
        >
          <div className="relative max-w-7xl w-full mx-4 bg-white p-2 rounded-xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={newsItem.image[photoIndex]}
              alt={`Gallery image ${photoIndex + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Prev button */}
            <button
              onClick={() => setPhotoIndex((prev) => (prev === 0 ? newsItem.image.length - 1 : prev - 1))}
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] cursor-pointer w-16 h-16 rounded-full"
            >
              &#10094;
            </button>

            {/* Next button */}
            <button
              onClick={() => setPhotoIndex((prev) => (prev === newsItem.image.length - 1 ? 0 : prev + 1))}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] cursor-pointer w-16 h-16 rounded-full"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsPage;