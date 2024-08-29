import React, { useEffect } from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import TypeSend from './TypeSend'
import useConversation from '../zustand/useConversation.js'
import { useAuth } from '../../src/context/Authprovider.jsx'
import { CiMenuFries } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import images from "../assets/svg.png"
import backgroundImage from '../assets/wallapaper.jpeg'

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null)
  }, [setSelectedConversation])
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className='w-full bg-no-repeat bg-cover'>
      <div>
        {!selectedConversation ? (<NoChatSelected />
        ) : (
          <>

            <ChatUser />
            <div className='scrollbar-hidden overflow-y-auto' style={{ maxHeight: "calc(92vh - 8vh)" }}>
              <Messages />
            </div>
            <TypeSend />
          </>
        )}
      </div>
    </div >
  )
}

export default Right

const NoChatSelected = () => {
  const [authUser] = useAuth()
  return (
    <>
      <div className='bg-slate-900 text-white w-full'>

        <div className='relative'>
          <label htmlFor="my-drawer-2" className='btn btn-ghost drawer-button lg:hidden absolute left-5'>
            <CiMenuFries className='text-white text-xl' />
          </label>
        </div>

        <div className='flex flex-col items-center justify-center min-h-screen pt-24'>
          {/* image ka div */}
          <div className="w-full max-w-md">
            <img src={images} className='w-full h-auto ' alt="ashish prabhakar" />
          </div>
          {/* content ka div */}
          <div className=' flex flex-1 h-screen items-center justify-center '>

            <h1 className='text-center text-lg text-yellow-500'>Welcome {" "} <span className='font-semibold text-xl '>{authUser.user.fullname}</span>
              <h1 className='text-2xl font-bold'>Download Messenger for Windows</h1>
              <br />
              <div className='flex'>
                <button className='mx-auto bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700'>Get from Play Store</button>

              </div>
              {/* No chat selected,please start converstation by selecting anyone to your contacts */}
              <div className='max-w-xl'>

                <p className='text-base sm:text-lg  md:text-xl lg:text-xl xl:text-xl leading-relaxed sm:leading-loose md:leading-loose lg:leading-loose xl:leading-loose text-white'> Make calls,share your screen and get a faster expreience when your downloaded the Window app.</p>
              </div>
              <div className='flex items-center justify-center mt-10 p-4'>
                <CiLock className='text-white text-xl ' />
                <h6 className='text-xs text-gray-600'>Your personal messages are end-to-end encrypted</h6>
              </div>
            </h1>
          </div>
        </div>

      </div>
    </>
  )
}
