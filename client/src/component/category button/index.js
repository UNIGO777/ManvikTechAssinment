import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryList from '../categoryList';

const Categorybutton = ({ item, subSubCategories, subCategories }) => {
    const [isHovered, setIsHovered] = useState(false);
    const filteredSubCategories = subCategories.filter(subCategory => subCategory?.category?._id === item._id);

  return (
      <li 
          className='font-semibold px-2 relative z-10 categoryButton'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex cursor-pointer items-center ">
          {item.name}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </div>
        <div className={`absolute z-50 categoryList -bottom-0 translate-y-[100%] w-auto shadow-2xl transition-opacity duration-1000 ${isHovered ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
          <CategoryList filteredSubCategories={filteredSubCategories} subSubCategories={subSubCategories} />
        </div>
      </li>
  )
}

export default Categorybutton
