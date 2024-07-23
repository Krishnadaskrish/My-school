import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      title: 'Slide 1',
      content: 'Educational content for Slide 1',
      image: 'https://via.placeholder.com/800x400?text=Slide+1',
    },
    {
      title: 'Slide 2',
      content: 'Educational content for Slide 2',
      image: 'https://via.placeholder.com/800x400?text=Slide+2',
    },
    {
      title: 'Slide 3',
      content: 'Educational content for Slide 3',
      image: 'https://via.placeholder.com/800x400?text=Slide+3',
    },
  ];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-[200px] lg:h-80">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
              <p>{slide.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
        onClick={goToPrevSlide}
      >
        &#9664;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none"
        onClick={goToNextSlide}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
