import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { BiLogOutCircle } from "react-icons/bi";
import toast from 'react-hot-toast';

function Logout() {
    const [loading, setLoading] = useState(false)
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await axios.post('/api/user/logout')
            localStorage.removeItem('chat-app')
            Cookies.remove("jwt")
            setLoading(false)
            // window.location.href = '/'
            window.location.reload();
            toast.success('Logout sucessfull😍😍!');
            
        } catch (error) {
            console.log("Error to logout", error)
            toast.error("Error to logout", error)
        }
    }

    return (
        <div className=''>
            <div   onClick={handleLogout} >
                {/* <BiLogOutCircle
                 className='text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1 ' 
               /> */}
               Logout
            </div>
        </div>
    )
}

export default Logout
