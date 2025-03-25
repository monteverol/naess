"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from './components/sections/HeaderSection';
import NewsLetter from './components/sections/NewsletterSection';
import TabAndSearch from './components/sections/TabandSearchSection';
import NewsArticle from './components/ui/NewsArticle';

export default function News() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [newsArticles, setNewsArticles] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch news articles from the API
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`${API_URL}/news/api`);
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNewsArticles(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, []);

  // Get all unique tags
  const getAllTags = () => {
    const tagSet = new Set();
    newsArticles.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  };

  const allTags = getAllTags();

  // Filter articles based on activeTab, activeFilters, and searchTerm
  const filteredArticles = newsArticles.filter(item => {
    // Filter by tab
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    
    // Filter by tags
    if (activeFilters.length > 0 && !activeFilters.some(filter => item.tags.includes(filter))) return false;
    
    // Filter by search term
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.summary.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // Toggle filter selection
  const toggleFilter = (tag) => {
    if (activeFilters.includes(tag)) {
      setActiveFilters(activeFilters.filter(t => t !== tag));
    } else {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm('');
  };

  // Load more items
  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 4, filteredArticles.length));
  };

  // Reset visible items when filters change
  useEffect(() => {
    setVisibleItems(4);
  }, [activeTab, activeFilters, searchTerm]);

  return (
    <div className="font-sans min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full lg:px-20 xl:px-40 mx-auto px-4 py-8 bg-white">
        {/* Tabs and Search */}
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
          visibleItems={visibleItems}
        />

        {/* News and Events Grid */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(0, visibleItems).map(item => (
                <NewsArticle 
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
            
            {visibleItems < filteredArticles.length && (
              <div className="mt-8 text-center">
                <button 
                  className="px-6 py-2 bg-[#1A384F] text-white rounded-md hover:bg-[#0d141a] transition-colors btn"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            )}
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

      {/* Newsletter Section */}
      <NewsLetter />

      {/* Footer */}
      <Footer />
    </div>
  );
}