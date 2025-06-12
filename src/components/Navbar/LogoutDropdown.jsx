import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/Firebase';
import { useNavigate } from 'react-router-dom';

const LogoutDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className='absolute right-0 top-8 z-50 w-32 bg-white border border-gray-200 rounded-md shadow-lg p-2'>
      <p
        className='text-sm cursor-pointer hover:text-red-600 transition'
        onClick={handleLogout}
      >
        Logout
      </p>
      
    </div>
  );
};

export default LogoutDropdown;


        // {!user ? (
        //   <p
        //     onClick={toggleModal}
        //     className='font-bold underline ml-5 cursor-pointer'
        //     style={{ color: '#002f34' }}
        //   >
        //     Login
        //   </p>
        // ) : (
        //   <div className='relative ml-5 group'>
        //     {/* Display name */}
        //     <p className='font-bold cursor-pointer text-[#002f34]'>
        //       Hi, {user.displayName?.split(' ')[0]}
        //     </p>

        //     {/* Reusable Dropdown */}
        //     <div className='hidden group-hover:block'>
        //       <LogoutDropdown />
        //     </div>
        //   </div>
        // )}
