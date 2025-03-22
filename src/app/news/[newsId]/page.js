"use client";
import { use, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const NewsPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { newsId } = unwrappedParams;

  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/news/api`);
        const news = await response.json();

        const foundNewsItem = news.find((item) => item.id === newsId);

        if (foundNewsItem) {
          setNewsItem(foundNewsItem);
        } else {
          setError("News item not found");
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!newsItem) return <p>No news item found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-16">
      <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
      <p className="text-gray-500 text-sm">
        {newsItem.date} | By {newsItem.author}
      </p>
      <img
        src={newsItem.image}
        alt={newsItem.title}
        className="w-full h-64 object-cover my-4 rounded-md"
      />
      <p className="text-lg font-semibold">{newsItem.summary}</p>
      <p className="mt-4 text-gray-700">{newsItem.content}</p>
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
    </div>
  );
};

export default NewsPage;