"use client";

export default function Gallery() {
  const albums = [
    {
      "id": 1,
      "title": "Nature",
      "description": "Beautiful landscapes and nature shots.",
      "Images": ["/images/album1/1.jpg", "/images/album1/2.jpg"],
      "date": "2025-04-15",
      "tags": ["Aesthetic", "Nature"]
    },
    {
      "id": 2,
      "title": "Nature",
      "description": "Beautiful landscapes and nature shots.",
      "Images": ["/images/album1/1.jpg", "/images/album1/2.jpg"],
      "date": "2025-04-15",
      "tags": ["Aesthetic", "Nature"]
    },
    {
      "id": 3,
      "title": "Nature",
      "description": "Beautiful landscapes and nature shots.",
      "Images": ["/images/album1/1.jpg", "/images/album1/2.jpg"],
      "date": "2025-04-15",
      "tags": ["Aesthetic", "Nature"]
    },
    {
      "id": 4,
      "title": "Nature",
      "description": "Beautiful landscapes and nature shots.",
      "Images": ["/images/album1/1.jpg", "/images/album1/2.jpg"],
      "date": "2025-04-15",
      "tags": ["Aesthetic", "Nature"]
    },
  ];

  return(
    <main className="pt-28 p-8 grid grid-cols-4 gap-8 bg-blue-200 h-screen">
      {
        albums.map(item => (
          <article key={item.id} className="h-96 bg-white drop-shadow-lg rounded-2xl">
          
          </article>
        ))
      }
    </main>
  );
}