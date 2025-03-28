"use client";

import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { use, useEffect, useState } from "react";
import NewsArticle from "../components/ui/NewsArticle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const NewsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { newsId } = unwrappedParams;

  const [newsItem, setNewsItem] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
          src={newsItem.image}
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
      <section className="p-8 md:px-20 lg:px-40 w-full overflow-hidden">
        <h3 className="font-bold text-4xl mb-4">Latest News</h3>
        <div className="flex gap-4 w-full overflow-x-auto">
          {
            otherNews.map(item => (
              <div className="max-w-[calc(100%/3-1rem)] flex-shrink-0" key={item.id}>
                <NewsArticle item={item} />
              </div>
            ))
          }
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NewsPage;