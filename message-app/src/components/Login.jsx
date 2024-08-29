import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useAuth } from '../context/Authprovider';
import { Link } from 'react-router-dom';

function Login() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSumbit = async (data) => {
        const userInfo = {

            email: data.email,
            password: data.password,
        }
        await axios.post("/api/user/login", userInfo)
            .then((res) => {
                if (res.data) {
                    toast.success('User LoggedIn Successfully😍😍😍 !');
                }
                localStorage.setItem("chat-app", JSON.stringify(res.data));
                setAuthUser(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    toast.error('error Sir Invalid user credential !', + err.response.data.message);
                }
            })
    }
    return (
        <>
            <div className='mx-auto h-[90vh] flex items-center justify-center p-4'>
                <form noValidate onSubmit={handleSubmit(onSumbit)} className=' px-6 py-2  space-y-3 flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] '>
                    <h1 className='text-xl text-center font-bold'>Chat <span className='text-yellow-500 font-semibold '>App</span></h1>
                    <h2 className='text-center text-3xl font-bold  text-yellow-500 '> Login page</h2>
                    <br />

                    {/* email */}
                    <div className='flex flex-col gap-1'>

                        <label htmlFor='email' className="font-semibold "> Email:-</label>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg> */}
                        <input
                            type="email"
                            name='email'
                            id='email'
                            required
                            className="bg-transparent px-2 py-1 border rounded-md  font-semi-bold"
                            placeholder="Email" {...register("email", { required: true })} />
                        {errors.email && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                    </div>

                    {/* password */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'>Password:-</label>
                        <input
                            type="password"
                            required
                            name='password'
                            id='password'
                            placeholder='Enter Your Password'
                            className='bg-transparent px-2 py-1 border'
                          {...register("password", { required: true })}
                       
                        />
                    </div>

                    {errors.password && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}

                    {/* Text and button */}
                    {/* <div className='flex justify-between '>
                        <p>new user ? <Link to="/signup" className='text-blue-600 underline cursor-pointer'>Signup</Link></p>
                        <input type="submit" value="Login" className='text-white bg-green-600 hover:bg-green-500 duration-300 px-4 py-2 rounded-lg cursor-pointer ' />
                    </div> */}
                    <button type='submit' className='mt-2 bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer' >Login</button>
                    <p className='flex items-center justify-center underline text-blue-500 cursor-pointer sm:font-medium'><Link to="/forgetpassword">Forgot Password?</Link></p>
                    <p className='text-center'>Do not have an account ?<Link to="/signup" className='link text-accent cursor-pointer'>Register</Link></p>
                </form>
            </div>
        </>
    )
}

export default Login
