import React from 'react';

const GroupImagePanel = () => {
  const images = [
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/Sub_banners-01.jpg?v=1726246660&width=2048',
    'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/Sub_banners-02.jpg?v=1726246659&width=2048',
  ];

  return (
    <div className="grid grid-cols-1 h-[60vh]  md:grid-cols-2 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="flex justify-center rounded-xl overflow-hidden">
          <img src={image} alt={`Group Image ${index + 1}`} className="w-full h-auto object-cover" />
        </div>
      ))}
    </div>
  );
}

export default GroupImagePanel;
