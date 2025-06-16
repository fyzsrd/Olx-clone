import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useItemContext } from './Context/Item';
import Navbar from './NavBar/Navbar';
import Login from './Modal/Login';
import Sell from './Modal/Sell';
import Favorite from '../assets/favorite.svg'
import Footer from './Footer';

function Details() {
  const location = useLocation();
  const { item } = location.state || {};
  console.log(item)

  const [openModal, setOpenModal] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false)

  const itemCntx = useItemContext();

  const toggleModalSell = () => {
    setOpenModalSell(!openModalSell)
  }

  const toggleModal = () => {
    setOpenModal(!openModal)
  }


  return (
    <>
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login toggleModal={toggleModal} status={openModal} />

      <div className="mb-20 grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
        <div className=" mt-30 border-2 border-gray-300 w-full rounded-lg flex justify-center overflow-hidden h-96">

          <img className="object-cover" src={item?.imageUrl} alt={item?.title} />

        </div>




        <div className=" mt-30 flex flex-col relative w-full">

          <div className=' rounded-md border-solid border-gray-400 border-1 pt-1 pb-1 p-1'>
            <div className='flex justify-between'>
              <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>

              <div className='flex justify-between align-middle gap-2'>
                <img className='w-5 cursor-pointer' src={Favorite} alt="" />
                <svg className='mt-1.5 cursor-pointer' width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-w4DG7" d="M768 853.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM256 597.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333zM768 170.667c47.104 0 85.333 38.229 85.333 85.333s-38.229 85.333-85.333 85.333c-47.104 0-85.333-38.229-85.333-85.333s38.229-85.333 85.333-85.333zM768 597.333c-52.437 0-98.688 24.107-130.005 61.312l-213.675-123.392c1.067-7.637 2.347-15.275 2.347-23.253 0-4.779-1.024-9.259-1.408-13.909l218.283-126.037c31.104 33.408 75.179 54.613 124.459 54.613 94.251 0 170.667-76.416 170.667-170.667s-76.416-170.667-170.667-170.667c-94.251 0-170.667 76.416-170.667 170.667 0 14.208 2.261 27.819 5.504 41.003l-205.867 118.912c-30.763-45.013-82.389-74.581-140.971-74.581-94.251 0-170.667 76.416-170.667 170.667s76.416 170.667 170.667 170.667c55.467 0 104.235-26.88 135.424-67.84l209.195 120.747c-2.048 10.539-3.285 21.333-3.285 32.427 0 94.251 76.416 170.667 170.667 170.667s170.667-76.416 170.667-170.667c0-94.251-76.416-170.667-170.667-170.667z"></path></svg>
              </div>

            </div>

            <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
          </div>
          <div className=' p-1 rounded-md border-solid border-gray-400 border-1 mt-2'>
            <p className="p-1 pl-0 text-base">{item?.category}</p>

            <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
              {item?.description}
            </p>
            <div className="rounded-md border-solid border-gray-400 border-1 p-1  w-full relative sm:relative md:absolute bottom-0 flex-row justify-between">
              <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
              <p className="p-1 pl-0 text-sm">{item?.createdAt}</p>
              <button className='p-2 text-sky-800 font-semibold border-2 rounded-md cursor-pointer border-sky-700 w-full py-2'>Chat With Seller</button>
            </div>
          </div>
        </div>
      </div>

      <Sell setItems={(itemCntx).setItems} toggleModalSell={toggleModalSell} status={openModalSell} />
      <Footer />
    </>

  );
}

export default Details;
