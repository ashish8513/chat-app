import React from 'react'
import useConversation from '../../src/zustand/useConversation.js'
import { userSocketContext } from '../context/SocketContext.jsx';
import { CiMenuFries } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';

function ChatUser({user}) {
    const { selectedConversation } = useConversation();
    const { onlineUsers } = userSocketContext();
    const getOnlineUsersStatus = (userId) => {
        return onlineUsers.includes(userId) ? "online" : "offline"
    }
    const isOnline = onlineUsers.includes(user);
    // console.log(selectedConversation)
    return (
        <div className='top-0 relative flex items-center h-12  justify-between gap-4 bg-slate-800 shadow-md '>
            <label htmlFor="my-drawer-2" className='btn btn-ghost drawer-button lg:hidden absolute left-5'>
                <Link to={"/"} className='lg:hidden'>
                    <CiMenuFries className='text-white text-xl' size={25} />
                </Link>
            </label>
            <div className='ml-20 flex space-x-3 items-center justify-center h-[6vh] bg-gray-800 hover:bg-gray-700  duration-300 '>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src="../../public/WhatsApp Image 2024-06-10 at 19.50.12_f473a557.jpg" />
                    </div>
                </div>
                <div >
                    <h1 className='text-xl '>{selectedConversation.fullname}</h1>
                    <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
                </div>
            </div>

            <div >
                <button className='cursor-pointer hover:text-primary mr-3 '>
                    <HiDotsVertical />
                </button>
            </div>
        </div>
    )
}

export default ChatUser
