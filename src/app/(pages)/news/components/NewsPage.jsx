'use client';

import React, { useState, useEffect } from 'react';
import Footer from '@/components/ui/Footer';
import Header from './sections/HeaderSection';
import NewsLetter from './sections/NewsletterSection';
import TabAndSearch from './sections/TabandSearchSection';
import NewsArticle from './ui/NewsArticle';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useRouter } from 'next/navigation';
import AnnouncementSection from './ui/Announcement';
import toast from 'react-hot-toast';

export default function NewsPage({ pageNumber }) {
  const itemsPerPage = 6;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [publicUpdates, setPublicUpdates] = useState([]);

  useEffect(() => {
    const fetchPublicUpdates = () => {
      toast.promise(
        fetch('/api/publicUpdates')
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch announcements");
            return res.json();
          })
          .then((data) => setPublicUpdates(data)),
        {
          loading: "Loading Announcements...",
          success: 'Announcements ready!',
          error: 'Failed to load announcements',
        }
      );
    }

    const fetchNews = () => {
      toast.promise(
        fetch('/api/news')
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch news");
            return res.json();
          })
          .then((data) => setNewsArticles(data)),
        {
          loading: 'Loading news...',
          success: 'News loaded!',
          error: 'Failed to load news',
        }
      );
    }
    
    fetchNews();
    fetchPublicUpdates();
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
  };3

  return (
    <div className="font-sans min-h-screen">
      <Header />

      <section className="section bg-white py-4">
        <Breadcrumbs />
      </section>

      <main className="w-full section bg-white">
        {publicUpdates.length > 0 && <AnnouncementSection publicUpdates={publicUpdates} />}

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
