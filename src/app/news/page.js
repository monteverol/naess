"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronRight, Clock, Filter, MapPin, Menu, Search, Share2, Tag, X } from 'lucide-react';
import Footer from '@/components/Footer';

export default function News() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [expandedNewsId, setExpandedNewsId] = useState(null);
  const [visibleItems, setVisibleItems] = useState(4);

  // Sample data for news articles
  const newsArticles = [
    {
      id: 1,
      type: 'news',
      title: 'TREE PLANTING 2025',
      summary: 'NAESS Shipping Philippines Inc. successfully planted 1000 Nara seedlings...',
      content: 'NAESS Shipping Philippines Inc. successfully planted 1000 Nara seedlings in collaboration with DENR-CENRO Guiguinto, Bulacan, as part of our commitment to environmental stewardship under PPA Administrative Order No. 14-2020. This initiative took place at  Ipo Dam, Mt. Balagbag, Montalban, Rizal on 15 March 2025. Together, we\'re working to restore and protect nature for generations to come.',
      image: '/images/news/tree-planting.webp',
      date: '2025-03-17',
      author: 'Marketing Team',
      tags: ['Product Launch', 'Innovation']
    },
    {
      id: 2,
      type: 'news',
      title: 'PMMA ALUMNI HOMECOMING 2025',
      summary: 'NAESS Shipping Philippines Inc. at the PMMA Alumni Homecoming 2025 – attended by Operations Manager, Robinson Mandalones...',
      content: 'NAESS Shipping Philippines Inc. at the PMMA Alumni Homecoming 2025 – attended by Operations Manager, Robinson Mandalones. Business Development Associate, Catrin Nombres and Recruitment Processor, Candie Salazar.',
      image: '/images/news/PMMA-ALUMNI.jpg',
      date: '2025-01-25',
      author: 'Finance Department',
      tags: ['Financial', 'Reports']
    },
    {
      id: 3,
      type: 'news',
      title: 'FLU VACCINE ACTIVITY',
      summary: 'NAESS crew and its employees actively participated in the Joint Flu Vaccination Activity at...',
      content: 'NAESS crew and its employees actively participated in the Joint Flu Vaccination Activity at the Dr. Mario S. Oca Memorial Hall, AMOSUP Seamen’s Hospital-Manila. A unified effort to promote wellness and protect the workforce—ensuring a healthier and safer future for all!',
      image: '/images/news/FLU-VAC.jpg',
      date: '2025-01-23',
      author: 'IT Department',
      tags: ['Conference', 'Technology']
    },
    {
      id: 4,
      type: 'news',
      title: 'CASE HANDLING POLICY AND PROCEDURE ORIENTATION',
      summary: 'NAESS Shipping Philippines Inc. alongside its Managers kicks off an insightful Orientation/Overview session...',
      content: 'NAESS Shipping Philippines Inc. alongside its Managers kicks off an insightful Orientation/Overview session, led by PANDIPHIL to provide key industry insights on matters relating to P&I case handling, policy and procedure.',
      image: '/images/news/Orientation.jpg',
      date: '2025-01-16',
      author: 'IT Department',
      tags: ['Workshop', 'Customer Experience']
    },
    {
      id: 5,
      type: 'news',
      title: 'Company Achieves Carbon Neutrality',
      summary: 'We\'re proud to announce that we\'ve achieved carbon neutrality across all our operations globally.',
      content: 'We\'re proud to announce that we\'ve achieved carbon neutrality across all our operations globally. This milestone represents years of dedicated effort to reduce our environmental footprint through energy efficiency measures, renewable energy adoption, and strategic carbon offset investments. Moving forward, we\'re committed to maintaining this status and working towards more ambitious sustainability goals, including zero waste operations by 2030 and helping our customers reduce their own environmental impact through our products and services.',
      image: '/api/placeholder/400/250',
      date: '2025-02-20',
      author: 'Sustainability Team',
      tags: ['Sustainability', 'Corporate Responsibility']
    },
    {
      id: 6,
      type: 'event',
      title: 'Product Training Webinar',
      summary: 'Join our product specialists for a comprehensive training session on our latest software release.',
      content: 'Join our product specialists for a comprehensive training session on our latest software release. This webinar will cover new features, best practices, and tips for maximizing value from our platform. We\'ll demonstrate several real-world use cases and provide participants with access to additional resources to support their ongoing learning. There will also be a live Q&A session where you can get answers to your specific questions from our product experts.',
      image: '/api/placeholder/400/250',
      date: '2025-03-28',
      location: 'Virtual',
      time: '11:00 AM - 12:30 PM',
      tags: ['Webinar', 'Training']
    },
    {
      id: 7,
      type: 'news',
      title: 'New Partnership Announced',
      summary: 'We\'re excited to announce a strategic partnership with InnovateTech to expand our market reach.',
      content: 'We\'re excited to announce a strategic partnership with InnovateTech to expand our market reach. This collaboration will combine our industry-leading solutions with InnovateTech\'s advanced technology platform, creating a more comprehensive offering for our joint customers. The partnership includes co-development of new features, integrated product roadmaps, and joint go-to-market strategies. Early pilots with select customers have shown promising results, with simplified workflows and enhanced capabilities.',
      image: '/api/placeholder/400/250',
      date: '2025-02-15',
      author: 'Business Development Team',
      tags: ['Partnership', 'Business']
    },
    {
      id: 8,
      type: 'event',
      title: 'Industry Networking Mixer',
      summary: 'An evening of networking with industry peers, featuring refreshments and a panel discussion.',
      content: 'An evening of networking with industry peers, featuring refreshments and a panel discussion. This relaxed event provides a perfect opportunity to connect with other professionals in your field, share experiences, and discover potential collaboration opportunities. The panel discussion will explore current industry trends and future predictions, with plenty of time for audience questions and discussion. Attendance is limited to ensure quality interactions, so early registration is recommended.',
      image: '/api/placeholder/400/250',
      date: '2025-04-15',
      location: 'New York, NY',
      time: '6:00 PM - 9:00 PM',
      tags: ['Networking', 'Industry']
    }
  ];

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

  // Toggle news article expansion
  const toggleNewsExpansion = (id) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
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
      <header className="sticky top-16 -z-10 bg-[#1A384F] text-white">
        <div className="relative px-4 py-6 mt-16 lg:px-20 xl:px-40">
          <div className="mt-12 mb-16 text-center lg:text-start">
            <h1 className="text-4xl font-bold mb-4">News & Events</h1>
            <p className="text-xl max-w-lg mx-auto lg:mx-0">
              Stay up-to-date with our latest company news, product updates, and upcoming events.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full lg:px-20 xl:px-40 mx-auto px-4 py-8 bg-white">
        {/* Tabs and Search */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center mb-4">
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 md:mb-0">
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === 'news' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('news')}
              >
                News
              </button>
              <button 
                className={`px-4 py-2 rounded-md ${activeTab === 'event' ? 'bg-[#1A384F] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('event')}
              >
                Events
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-2 w-full md:w-auto">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200"
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
              >
                <Filter size={18} />
                <span className="hidden md:inline">Filter</span>
                {activeFilters.length > 0 && (
                  <span className="bg-[#1A384F] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {activeFilters.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Menu */}
          {filterMenuOpen && (
            <div className="bg-white p-4 rounded-md shadow-lg mb-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Filter by Tags</h3>
                {activeFilters.length > 0 && (
                  <button 
                    className="text-sm text-[#1A384F] hover:text-indigo-800"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilters.includes(tag)
                        ? 'bg-[#1A384F] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results info */}
          <div className="text-sm text-gray-500">
            Showing {Math.min(visibleItems, filteredArticles.length)} of {filteredArticles.length} results
            {activeFilters.length > 0 && (
              <span> with {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        {/* News and Events Grid */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.slice(0, visibleItems).map(item => (
                <article key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.type === 'news' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type === 'news' ? 'News' : 'Event'}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-2">
                      {item.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {expandedNewsId === item.id ? item.content : item.summary}
                    </p>
                    
                    {item.type === 'event' && (
                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin size={16} className="mr-2" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-2" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'news' && item.author && (
                      <div className="text-sm text-gray-500 mb-4">
                        By {item.author}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                        >
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <button 
                        className="text-[#1A384F] hover:text-indigo-800 text-sm font-medium"
                        onClick={() => toggleNewsExpansion(item.id)}
                      >
                        {expandedNewsId === item.id ? 'Read Less' : 'Read More'}
                      </button>
                      
                      <button className="p-2 text-gray-500 hover:text-[#1A384F] rounded-full hover:bg-gray-100">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {visibleItems < filteredArticles.length && (
              <div className="mt-8 text-center">
                <button 
                  className="px-6 py-2 bg-[#1A384F] text-white rounded-md hover:bg-indigo-700 transition-colors"
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
      <section className="bg-[#E9F2FC] py-12 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter to receive the latest news and event updates directly in your inbox.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="bg-[#1A384F] text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}