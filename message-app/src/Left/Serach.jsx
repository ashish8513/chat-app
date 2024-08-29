import React, { useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import useGetAllUsers from '../context/useGetAllUsers.jsx'
import toast from 'react-hot-toast';
import { FaArrowLeft } from "react-icons/fa6";
import useConversation from '../zustand/useConversation.js'



function Serach() {
    const [search, setSearch] = useState("")
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const [icon, setIcon] = useState('search'); // 'search' or 'clicked' or any other identifier for your icons
    const handleClick = () => {
        setIcon(icon === 'search' ? 'clicked' : 'search'); // Toggle between icons
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        const conversation = allUsers.find((user) =>
            user.fullname?.toLowerCase().includes(search.toLowerCase()))
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        }
        else {
            toast.error("user not found")
        }
    }
    return (
        <div className='h-[10vh]'>
            <div className='p-6 py-3 '>
                <form onSubmit={handleSubmit}>
                    <div className='p-1 float-end hidden  lg:flex items-center w-full justify-between max-w-sm border rounded-lg focus-within:shadow-md '>
                        {/*start search */}
                        <div className='text-lg w-13 min-w-[28px] h-8 items-center justify-center flex rounded-r-full '>
                           
                        <div className="relative">
                       
                            {icon === 'search' ? (
                                <GrSearch />
                            ) : (
                                <FaArrowLeft className='text-green-500 cursor-pointer' />
                            )}
                        </div>
                           </div>
                        {/* end search */}
                      
                        <input type=" text "
                            placeholder='search and start new chat.'
                            className=' w-full outline-none px-2 py-2  bg-transparent '
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={handleClick}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Serach





