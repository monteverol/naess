import React from 'react';
import Link from 'next/link';

const AlbumCard = ({ album }) => {
  return (
    <Link href={`/gallery/${album.id}`}>
      <div className="group cursor-pointer p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <div className="overflow-hidden rounded-lg">
          <img 
            src={album.Images[0]} 
            alt={album.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{album.title}</h2>
          <p className="text-gray-500 text-sm">{album.date}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {album.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
