import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useNews() {
  const [newsArticles, setNewsArticles] = useState([]);
  
  useEffect(() => {
    const fetchNews = () => 
      toast.promise(
        fetch('/api/news')
          .then((res) => res.json())
          .then((data) => setNewsArticles(data)),
        {
          loading: "Fetching News Articles",
          success: "Successfully Fetched News Articles.",
          error: "Failed to Fetch News Articles."
        }
      );

    fetchNews();
  }, []);

  return {
    newsArticles,
    setNewsArticles
  }
}