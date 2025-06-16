import React from 'react';
import { Link } from 'react-router-dom';
import Favorite from '../assets/favorite.svg';
import noResults from '../assets/noResults.webp'

function Card({ items }) {
    console.log('from card components', items);

    return (
        <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen'>
            <h1 style={{ color: '#002f34' }} className="text-2xl">Recommendations</h1>

            {items && items.length > 0 ? (
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5'>
                    {items.map((item) => (
                        <Link
                            to={'/details'}
                            key={item.id}
                            state={{ item }}
                            style={{ borderWidth: '1px', borderColor: 'lightgrey' }}
                        >
                            <div
                                className='relative w-full h-72 rounded-md border border-gray-300 bg-gray-50 overflow-hidden cursor-pointer'
                            >
                                {/* Image */}
                                <div className='w-full flex justify-center p-2 overflow-hidden'>
                                    <img
                                        className='h-36 object-contain'
                                        src={item.imageUrl || 'https://placehold.co/300x200'}
                                        alt={item.title}
                                    />
                                </div>

                                {/* Details */}
                                <div className='details p-1 pl-4 pr-4'>
                                    <h1 style={{ color: '#002f34' }} className="font-bold text-xl">₹ {item.price}</h1>
                                    <p className="text-sm pt-2">{item.category}</p>
                                    <p className="pt-2">{item.title}</p>

                                    {/* Fav Icon */}
                                    <div className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer'>
                                        <img className='w-5' src={Favorite} alt="Favorite" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center mt-10 min-h-[300px] px-4 sm:px-6 lg:px-8">
                    <p className="text-base sm:text-lg text-gray-600 max-w-md sm:max-w-xl mb-6">
                        Oops... we didn't find anything that matches this search. <br className="hidden sm:block" />
                        Try searching for something more general, change the filters, or check for spelling mistakes.
                    </p>

                    <img
                        src={noResults}
                        alt="No results"
                        className="w-40 sm:w-56 md:w-64 h-auto object-contain"
                    />
                </div>
            )}
        </div>
    );
}

export default Card;
