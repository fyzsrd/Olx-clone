import React from 'react'
import arrow from '../assets/arrow-down.svg'
import { useNavigate } from 'react-router-dom'

function Catogries() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/', { state: { selectedCategory: category } });
  };

  return (
    <div className='w-full relative z-0 flex shadow-md p-2 pt-2 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists'>
      <ul className='list-none flex items-center justify-between w-full'>
        <div
          className='flex flex-shrink-0 cursor-pointer'
          onClick={() => handleCategoryClick('All')}
        >
          <p className='font-semibold uppercase all-cats'> All categories</p>
          <img className='w-4 ml-2' src={arrow} alt="" />
        </div>

        <li className='cursor-pointer' onClick={() => handleCategoryClick('Cars')}>Cars</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('Motorcycles')}>Motorcycles</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('Mobile Phones')}>Mobile Phones</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('For sale : Houses & Apartments')}>For sale : Houses & Apartments</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('Scooter')}>Scooter</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('Commercial & Other Vehicles')}>Commercial & Other Vehicles</li>
        <li className='cursor-pointer' onClick={() => handleCategoryClick('For rent : Houses & Apartments')}>For rent : Houses & Apartments</li>
      </ul>
    </div>
  );
}

export default Catogries;
