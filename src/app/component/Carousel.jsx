// components/Carousel.js
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/*
  example of items parameter:
    const carouselItems = [
      { type: 'image', src: '/images/home/home-ship-image.jpg' },
      { type: 'image', src: '/images/omegagas-ship.png' },
      { type: 'image', src: '/images/home/gif-ship.png' }
      { type: 'video', src: '/path/to/video1.mp4' },
    ];
*/

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setProgress(0);
  };

  useEffect(() => {
    const startProgress = () => {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const newProgress = (elapsedTime / 3000) * 100;

        if (newProgress >= 100) {
          console.log("Condition met");
          nextSlide();
          setProgress(0);
        } else {
          setProgress(newProgress);
        }
      }, 30);
    };

    startProgress();

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image or Video Container */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${items.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / items.length}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{
              width: `${100 / items.length}%`,
            }}
          >
            {item.type === 'image' ? (
              <div className="relative h-full w-full">
                {/* Image */}
                <img
                  src={item.src}
                  alt={`Slide ${index}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent"></div>
              </div>
            ) : (
              <video src={item.src} controls className="h-full w-full object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-8 bg-[rgba(0,0,0,0.3)] text-white p-4 rounded-full cursor-pointer transition-all duration-200 active:scale-95 hover:bg-[rgba(0,0,0,0.5)]"
      >
        <FaChevronLeft size={40} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 bg-[rgba(0,0,0,0.3)] text-white p-4 rounded-full cursor-pointer transition-all duration-200 active:scale-95 hover:bg-[rgba(0,0,0,0.5)]"
      >
        <FaChevronRight size={40} />
      </button>

      {/* Indicators with Progress Bar */}
      <div className="absolute bottom-20 flex space-x-2 transition-all duration-200">
        {items.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setProgress(0);
            }}
            className={`relative p-1 h-4 overflow-hidden cursor-pointer transition-all duration-500 active:scale-95 rounded-full ${
              index === currentIndex ? 'w-12 bg-gray-500' : 'w-4 bg-gray-300'
            }`}
          >
            {/* Progress Bar */}
            {index === currentIndex && (
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;