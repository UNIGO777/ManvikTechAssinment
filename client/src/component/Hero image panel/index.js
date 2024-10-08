import React, { useState, useEffect } from 'react';

const HeroImagePanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/Hero_Bannere-01.jpg?v=1726498165&width=2048',
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/imgpsh_fullsize_anim_2_5362cfd9-5ffe-437d-b745-d5fefa4bc374.jpg?v=1726559413&width=2048',
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/imgpsh_fullsize_anim_7_5eae5ad3-f132-4bde-b967-11586b737dad.jpg?v=1726559413&width=2048',
  ];

  const mobileImages = [
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/phone_banner-01-01.jpg?v=1726502132&width=820',
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/Artboard_7_copy_2x-100.jpg?v=1726660347&width=820',
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/Artboard_7_copy_2_2x-100.jpg?v=1726660347&width=820',
  ];

  const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  const currentImages = isMobile ? mobileImages : images;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentImages.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative h-[60vh]  overflow-hidden"
    >
      <div className="flex transition-transform h-full duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {currentImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full md:object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {currentImages.map((_, index) => (
          <div 
            key={index} 
            className={`h-[10px] w-[10px] rounded-full cursor-pointer ${currentIndex === index ? 'bg-black' : 'bg-[#0b0b0b4a]'}`} 
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default HeroImagePanel;
