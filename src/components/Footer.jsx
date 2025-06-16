import React from 'react';
import cartrade_tech from '../assets/cartrade_tech.svg'
import cartrade from '../assets/cartrade.svg'
import carwale from '../assets/bikewale.svg'
import bikewale from '../assets/bikewale.svg'
import mobility from '../assets/mobility.svg'
import olx_2025 from '../assets/olx_2025.svg'

function Footer() {
    return (
        <div className='w-full'>
            {/* Top Section */}
            <div className="bg-gray-50 py-10 px-5 sm:px-10 md:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                  
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">Popular Locations</h2>
                        <ul className="pt-2">
                            {['Mumbai', 'Kolkata', 'Chennai', 'Pune'].map((city) => (
                                <li key={city} className="text-gray-500 hover:text-gray-700 cursor-pointer">{city}</li>
                            ))}
                        </ul>
                    </div>

                   
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">Trending Locations</h2>
                        <ul className="pt-2">
                            {['Bhubaneshwar', 'Hyderabad', 'Chandigarh', 'Nashik'].map((location) => (
                                <li key={location} className="text-gray-500 hover:text-gray-700 cursor-pointer">{location}</li>
                            ))}
                        </ul>
                    </div>

                    
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">About Us</h2>
                        <ul className="pt-2">
                            {['Tech@OLX', 'Careers'].map((item) => (
                                <li key={item} className="text-gray-500 hover:text-gray-700 cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>

                
                    <div>
                        <h2 className="font-bold text-lg text-gray-800">OLX</h2>
                        <ul className="pt-2">
                            {[
                                'Blog',
                                'Help',
                                'Sitemap',
                                'Legal & Privacy information',
                                'Vulnerability Disclosure Program'
                            ].map((item) => (
                                <li key={item} className="text-gray-500 hover:text-gray-700 cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            
            {/* Logos Section */}
            <div className="bg-blue-800 py-10 w-full">
                <div className="max-w-7xl mx-auto px-5 flex flex-wrap justify-center items-center gap-8 lg:gap-12">
                    <div className='pr-4 border-r border-white'>
                        <img className="w-28 md:w-32 lg:w-40 object-contain" src={cartrade_tech} alt="CarTrade Tech" />
                    </div>
                    <img className="w-10 md:w-16 lg:w-17 object-contain" src={olx_2025} alt="OLX 2025" />
                    <img className="w-20 md:w-24 lg:w-32 object-contain" src={carwale} alt="CarWale" />
                    <img className="w-20 md:w-24 lg:w-32 object-contain" src={bikewale} alt="BikeWale" />
                    <img className="w-20 md:w-24 lg:w-32 object-contain" src={cartrade} alt="CarTrade" />
                    <img className="w-20 md:w-24 lg:w-32 object-contain" src={mobility} alt="Mobility" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
