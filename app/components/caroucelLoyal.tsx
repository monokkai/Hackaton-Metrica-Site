import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-300 transition"
        onClick={prevSlide}
      >
        &#10094; {/* Стрелка влево */}
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-4 shadow-lg hover:bg-gray-300 transition"
        onClick={nextSlide}
      >
        &#10095; {/* Стрелка вправо */}
      </button>
    </div>
  );
};

export default Carousel;
