import { Calendar, Clock, MapPin, Share2, Tag } from 'lucide-react';
import Link from 'next/link';

const NewsArticle = ({ item }) => {
  return(
    <Link
      href={`/news/${item.id}`}
      passHref
    >
      <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
        <img 
          src={item.image[0]} 
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
            {item.summary}
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
            <button className="p-2 text-gray-500 hover:text-[#1A384F] rounded-full hover:bg-gray-100">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default NewsArticle;