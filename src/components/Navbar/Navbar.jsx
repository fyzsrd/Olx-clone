import React, { useEffect } from 'react'
import olx_logo_2025 from '../../assets/olx_logo_2025.svg'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchWt from '../../assets/search.svg'
import { useLocation } from 'react-router-dom'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../utils/Firebase'
import addBtn from '../../assets/addButton.png'
import Flyout from '../Flyout'
import Catogries from '../Catogries'
import { onAuthStateChanged } from 'firebase/auth'




function Navbar({ toggleModal, toggleModalSell }) {
  const [user] = useAuthState(auth)
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const publicRoutes = ['/', '/details']; // Add public routes here
    const isOnPublicRoute = publicRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!user && !isOnPublicRoute) {
      navigate('/');
    }
  });

  return () => unsubscribe();
}, [location.pathname, navigate]);

  return (
    <div>
      <nav className=' z-50 w-full p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white'>
        <Link to={'/'} > <img className='w-12' src={olx_logo_2025} alt="logo" /></Link>


        <div className='relative location-search  ml-5'>
          <img src={search} alt="" className='absolute top-4 left-2 w-5' />
          <input placeholder='Search city, area, or locality...' className='w-[50px] sm:w-[150px] md:w-[250] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'
            type="text" />
          <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer' />
        </div>

        <div className='ml-5 mr-2 relative w-full main-search' >
          <input className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300' placeholder='find cars,Mobile phone, and more' type="text" />
          <div style={{ backgroundColor: '#002f34' }} className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12">
            <img className="w-5 filter invert" src={searchWt} alt="Search Icon" />
          </div>
        </div>

        <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
          <p className="font-bold mr-3" >English</p>
          <img src={arrow} alt="" className='w-5 cursor-pointer' />
        </div>
        {/* {!user ? (
          <p className='font-bold underline ml-5 cursor-pointer' style={{ color: '#002f34' }}>Login</p>
        ) : (
          <div className='relative'>
            <p style={{ color: '#002f34' }} className='font-bold ml-5 cursor-pointer'>{user.displayName?.split(' ')[0]}</p>

          </div>
        )} */}

        {
          !user ? (
            <p onClick={toggleModal} className='font-bold underline ml-5 cursor-pointer' style={{ color: '#002f34' }}>Login</p>

          ) : (
            <Flyout />
          )
        }



        <img src={addBtn}
          onClick={user ? toggleModalSell : toggleModal}
          className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer'
          alt="sell+" />






      </nav>
      {/* <Flyout /> */}
      <Catogries  />





    </div>
  )
}

export default Navbar