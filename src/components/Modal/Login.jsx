import { Carousel, Modal, ModalBody } from 'flowbite-react'
import React from 'react'

import google from '../../assets/google.png'
import mobile from '../../assets/mobile.svg'
import guitar from '../../assets/guita.png'
import love from '../../assets/love.png'
import avatar from '../../assets/avatar.png'
import close from '../../assets/close.svg'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
// import { GoogleAuthProvider } from 'firebase/auth'

function Login({ toggleModal, status }) {
  // const provider = new GoogleAuthProvider();
  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toggleModal();
      console.log('user',result.user)

    } catch (error) {

      console.log(error)
    }
  }
  return (
    <div>
      <Modal theme={{
        "content": {
          "base": "relative w-full p-4 md:h-auto",
          "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
        },
      }} onClick={toggleModal}
        className="bg-black/55 rounded-none" position={'center'} show={status} size="md" popup={true}>

        <div onClick={(event) => event.stopPropagation()} className="p-6 pl-2 pr-2 bg-white">
          <img onClick={toggleModal} className="w-6 absolute z-10 top-4 right-4 cursor-pointer" src={close} alt="" />

          <Carousel
            onSlideChange={(index) => console.log("onSlideChange()", index)}
            slide={true}
            theme={{
              indicators: {
                active: {
                  off: "bg-gray-300",
                  on: "bg-teal-300"
                },
                base: "h-2 w-2 rounded-full",
                wrapper: "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
              },
              scrollContainer: {
                base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                snap: "snap-x"
              },
              control: {
                base: "inline-flex items-center justify-center bg-transparent",
                icon: "w-8 text-black dark:text-black"
              },
            }}
            onClick={(event) => event.stopPropagation()}
            className="w-full h-56 sm:h-64 pb-5 rounded-none"
          >
            <div className="flex flex-col items-center justify-center flex-shrink-0 w-full snap-start">
              <img className="w-24 pb-5" src={guitar} alt="Slide 1" />
              <p className="w-60 sm:w-72 text-center pb-5 font-semibold text-[#002f34]">
                Help us become one of the safest place to buy and sell.
              </p>
            </div>
            {/* <div className="flex flex-col items-center justify-center flex-shrink-0 w-full snap-start">
              <img className="w-24 pb-5" src={love} alt="Slide 2" />
              <p className="w-60 sm:w-72 text-center pb-5 font-semibold text-[#002f34]">
                Close deals from the comfort of your home.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center flex-shrink-0 w-full snap-start">
              <img className="w-24 pb-5" src={avatar} alt="Slide 3" />
              <p className="w-60 sm:w-72 text-center pb-5 font-semibold text-[#002f34]">
                Keep all your favorites in one place.
              </p>
            </div> */}
          </Carousel>

        </div>

        <ModalBody className="bg-white h-96 p-0 rounded-none" onClick={(event) => { event.stopPropagation() }} >

          <div className="p-6 pt-0">
            <div className="flex items-center justify-start rounded-md border-2 border-solid border-black p-5 pl-4 relative h-8 mb-4">
              <img className="w-6 mr-2" src={mobile} alt="" />
              <p className="text-sm font-bold">Continue with phone</p>
            </div>
            <div className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100"  onClick={handleClick}  >
              <img className="w-7 absolute left-2" src={google} alt="" />
              <p className="text-sm text-gray-500" >Continue with Google</p>
            </div>
            <div className="pt-5 flex flex-col items-center justify-center">
              <p className="font-semibold text-sm">OR</p>
              <p className="font-bold text-sm pt-3 underline underline-offset-4">Login with Email</p>
            </div>
            <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
              <p className="text-xs">All your personal details are safe with us.</p>
              <p className="text-xs pt-5 text-center">If you continue, you are accepting <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span></p>
            </div>
          </div>

        </ModalBody>
      </Modal>
    </div>
  )
}

export default Login