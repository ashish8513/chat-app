import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BiMessageRoundedDots } from "react-icons/bi";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { SiCircle } from "react-icons/si";
import { TbLogout2 } from "react-icons/tb";
import Logout from './Logout';
import { IoPeopleSharp } from "react-icons/io5";

function Header() {
    return (
        <>

            <div className='flex justify-between items-center'>

                <div className="flex  cursor-pointer  items-center mb-1  ">
                    <lord-icon
                        src="https://cdn.lordicon.com/hrjifpbq.json"
                        trigger="hover"
                        delay="2000"
                        colors="primary:#ffffff"
                        style={{ "width": "45px", "height": "45px" }}>
                    </lord-icon>
                </div>



                <div className='flex justify-end space-x-3  px-16 items-center mb-2'>
                    <SiCircle className='text-white text-3xl h-[3vh] w-[3vh] hover:scale-110 duration-300 cursor-pointer ' />
                    <IoPeopleCircleOutline className='text-white text-2xl h-[4vh] w-[4vh] hover:scale-110 duration-300 cursor-pointer ' />
                    <BiMessageRoundedDots className='text-white text-3xl h-[4vh] w-[4vh] hover:scale-110 duration-300 cursor-pointer ' />
                    <BiMessageSquareAdd className='text-white text-3xl h-[4vh] w-[4vh] hover:scale-110 duration-300 cursor-pointer ' />
                    <div tabIndex={0} className=" dropdown dropdown-end m-1  ">
                        <div className="dropdown ">
                            <HiOutlineDotsVertical className='text-3xl text-white hover:bg-gray-400 duration-300 ease-in-out hover:rounded-full pt-1' />

                            <ul tabIndex={0} className="p-2 shadow menu dropdown-content  bg-base-100 dark:bg-slate-700 dark:text-white rounded w-60">
                                <li>
                                    <a>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/fdxqrdfe.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            style={{ "width": "15px", "height": "15px", }}
                                        >
                                        </lord-icon>
                              New Chat
                                    </a>
                                </li>
                                <li>
                                    <a>
                                    <IoPeopleSharp />
                                        New Community
                                    </a>
                                </li>
                                <li><a>
                                    <TbLogout2 />
                                    <Logout />
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
{/* <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Click</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div> */}
