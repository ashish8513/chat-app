import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import useSendMessage from '../context/useSendMessage.js';
import { FaPlus } from 'react-icons/fa';
import { FaMicrophone } from "react-icons/fa";
import { FaImage, FaVideo } from 'react-icons/fa6';


function TypeSend() {
    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
    const [message, setMessage] = useState("")
    const { loading, sendMessages } = useSendMessage()
    const handleSubmit = async (e) => {
        console.log(e);
        e.preventDefault();
        await sendMessages(message);
        setMessage("");
    }
    return (
        <form onSubmit={handleSubmit}>

            <div className='flex space-x-2 h-[8vh] text-center bg-slate-800'>
                <div className='relative'>

                    <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white mt-1'>
                        <FaPlus size={20} className='text-black hover:rotate-90 duration-300 ease-in-out' />
                    </button>
                    {/* image and video send option */}
                    {
                        openImageVideoUpload && (
                            <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                                <form>
                                    <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                        <div className='text-primary'>
                                            <FaImage size={18} />
                                        </div>
                                        <p>Image</p>
                                    </label>
                                    <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                        <div className='text-purple-500'>
                                            <FaVideo size={18} />
                                        </div>
                                        <p>Video</p>
                                    </label>

                                    <input
                                        type='file'
                                        id='uploadImage'
                                        // onChange={handleUploadImage}
                                        className='hidden'
                                    />

                                    <input
                                        type='file'
                                        id='uploadVideo'
                                        // onChange={handleUploadVideo}
                                        className='hidden'
                                    />
                                </form>
                            </div>
                        )
                    }

                </div>
                <div className='w-[85%] mx-4'>
                    <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} className="border border-gray-700 outline-none px-3 py-2 mt-2 rounded-lg  w-full bg-black " />
                </div>
                <button className='text-primary hover:text-secondary'>
                    <div className='flex px-1 space-x-3'>

                        <IoSend size={24} />
                        <FaMicrophone className='text-gray-500' size={24} />
                    </div>
                </button>
            </div>
        </form>
    )
}

export default TypeSend;





