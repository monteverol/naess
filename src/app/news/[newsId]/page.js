"use client";

import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { use, useEffect, useState } from "react";
import NewsArticle from "../components/ui/NewsArticle";

const NewsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { newsId } = unwrappedParams;

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

        const foundNewsItem = news.find((item) => item.id.toString() === newsId.toString());
        console.log(foundNewsItem);
        const otherNews = news.filter((item) => item.id.toString() !== newsId.toString());

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
  }, [newsId]);

  if (loading) return <p>Loading...</p>;
  if (!newsItem) return <p>No news item found</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <Breadcrumbs />
        <h1 className="text-8xl font-bold mb-4">{newsItem.title}</h1>
        <p className="text-gray-500 text-lg italic">
          {new Date(newsItem.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          | By {newsItem.author}
        </p>
        <img
          src={newsItem.image[0]}
          alt={newsItem.title}
          className="w-full h-80 object-cover my-4 rounded-md"
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
        <p className="mt-4 text-gray-700 text-xl">{newsItem.content}</p>
      </div>
      
      {/* GALLERY OF MULTIPLE PICTURES */}
      {newsItem.image.length > 1 && (
        <section className="max-w-6xl mx-auto p-6">
          <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsItem.image.map((img, index) => (
              <div
                key={index}
                className="w-full h-64 overflow-hidden rounded-md shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
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

      
      {/* LATEST NEWS CAROUSEL */}
      <section className="p-8 md:px-20 lg:px-40 w-full overflow-hidden">
        <h3 className="font-bold text-4xl mb-4">Latest News</h3>
        <div className="flex gap-4 w-full overflow-x-auto">
          {
            otherNews.map(item => (
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
            {photoIndex > 0 && (
              <button
                onClick={() => setPhotoIndex((prev) => prev - 1)}
                className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] cursor-pointer w-16 h-16 rounded-full"
              >
                &#10094;
              </button>
            )}

            {/* Next button */}
            {photoIndex < newsItem.image.length - 1 && (
              <button
                onClick={() => setPhotoIndex((prev) => prev + 1)}
                className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold bg-[rgba(0,0,0,0.6)] hover:bg-[rgba(0,0,0,0.8)] cursor-pointer w-16 h-16 rounded-full"
              >
                &#10095;
              </button>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default NewsPage;