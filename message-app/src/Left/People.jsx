import React from 'react'
import useConversation from '../zustand/useConversation.js'
import { userSocketContext } from '../context/SocketContext.jsx';

function People({ user }) {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === user._id;
    const { socket, onlineUsers } = userSocketContext();
    const isOnline = onlineUsers.includes(user._id);

    return (
        <div
            className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
            onClick={() => setSelectedConversation(user)}
        >
            <div>
                <div className='flex space-x-4 px-6 py-3 hover:bg-slate-700 duration-300 cursor-pointer '>
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="w-14 rounded-full">
                            <img src="../../public/IMG_20240602_191226.jpg" />
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-gray-200'>{user.fullname}</h1>
                        <span>{user.email}</span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default People
