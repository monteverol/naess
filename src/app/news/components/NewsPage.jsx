'use client';

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from './sections/HeaderSection';
import NewsLetter from './sections/NewsletterSection';
import TabAndSearch from './sections/TabandSearchSection';
import NewsArticle from './ui/NewsArticle';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useRouter } from 'next/navigation';

export default function NewsPage({ pageNumber }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const itemsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNewsArticles(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []);

  const getAllTags = () => {
    const tagSet = new Set();
    newsArticles.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const allTags = getAllTags();

  const filteredArticles = newsArticles.filter(item => {
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    if (activeFilters.length > 0 && !activeFilters.some(filter => item.tags.includes(filter))) return false;
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !item.summary.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );

  const goToPage = (page) => {
    router.push(`/news/page/${page}`);
  };

  const toggleFilter = (tag) => {
    setActiveFilters(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  return (
    <div className="font-sans min-h-screen">
      <Header />

      <section className="px-8 lg:px-20 xl:px-40 w-full bg-white py-4">
        <Breadcrumbs />
      </section>

      <main className="w-full lg:px-20 xl:px-40 mx-auto px-4 py-8 bg-white">
        <TabAndSearch
          filterMenuOpen={filterMenuOpen}
          activeFilters={activeFilters}
          filteredArticles={filteredArticles}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilterMenuOpen={setFilterMenuOpen}
          clearFilters={clearFilters}
          allTags={allTags}
          toggleFilter={toggleFilter}
          visibleItems={itemsPerPage}
        />

        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map(item => (
                <NewsArticle key={item.id} item={item} />
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-300 active:scale-95 ${
                    pageNumber === i + 1 ? 'bg-[#1A384F] text-white' : 'bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No results found for your search criteria.</p>
            <button 
              className="text-[#1A384F] hover:text-indigo-800 font-medium"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <NewsLetter />
      <Footer />
    </div>
  );
}