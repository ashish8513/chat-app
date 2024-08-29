import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/Authprovider'
import { Link } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs';
import uploadFile from '../Helpers/uploadFile'


function Signup() {
    const [authUser, setAuthUser] = useAuth();
    const [previewImage, setPreviewImage] = useState('');
    const [SignupData, setSignupData] = useState({
        fullname: "",
        email: "",
        password: "",
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const validatePasswordMatch = (value) => {
        return value === password || "passwords do not match bsdk "
    };

    const password = watch("password", "")
    const confirmPassword = watch("confirmPassword", "");
    //get the image 
    function getImage(event) {
        event.preventDefault();
        // gettiing the image
        const uploadedImage = event.target.files[0];
        if (uploadedImage) {
            setSignupData({
                ...SignupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                // console.log(this.result)
                setPreviewImage(this.result);
            })
        }
    }
    // const handleUploadPhoto = async (e) => {
    //     const file = e.target.files[0]

    //     const uploadPhoto = await uploadFile(file)

    //     // SignupData(file)

    //     ((preve) => {
    //         return {
    //             ...preve,
    //             profile_pic: uploadPhoto?.url
    //         }
    //     })
    // }

    const onSumbit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }
        await axios.post("/api/user/signup", userInfo)
            .then((res) => {
                if (res.data) {
                    toast.success('Successfully created!');
                }
                localStorage.setItem("chat-app", JSON.stringify(res.data));
                setAuthUser(res.data)
            })
            .catch((err) => {
                if (err.response) {
                    toast.error('error sir !', + err.response.data.message);
                }
            })
    }
    return (
        <>
            <div className='flex h-[90vh] items-center justify-center mx-auto'>
                <form noValidate onSubmit={handleSubmit(onSumbit)} className='px-6 py-2  space-y-3  flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black] '>
                    <h1 className='text-2xl text-center'>Chat <span className='text-yellow-500 font-semibold '>App</span></h1>
                    <h2 className=' text-center text-3xl font-bold text-yellow-500'>Signup</h2>
                    <label htmlFor="profile_pic" className='cursor-pointer'>
                        {previewImage ? (
                            <img className='w-24 h-23 rounded-full m-auto ' src={previewImage} />
                        ) : (
                            <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />
                        )}
                    </label>

                    <input
                        onChange={getImage}
                        type='file'
                        className='hidden'
                        name='profile_pic'
                        id='profile_pic'
                        accept='.jpg,.jpeg,.png,.svg'

                    />
                    {/* Full name */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullname" className='font-semibold'>Name:-</label>
                        <input
                            type="fullName"
                            required
                            name='fullName'
                            id='fullName'
                            placeholder='Enter Your Full Name'
                            className='bg-transparent px-2 py-1 border focus:outline-primary'
                            {...register("fullname", { required: true })}
                        />
                    </div>
                    {errors.fullname && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
                    {/* email */}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'>Email:-</label>
                        <input
                            type="email"
                            required
                            name='email'
                            id='email'
                            placeholder='Enter Your Email'
                            className='bg-transparent px-2 py-1 border'

                            {...register("email", { required: true })}

                        />
                    </div>
                    {errors.email && <span className='text-sm text-red-500 font-semibold'>This field is required</span>}
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
                    <button type='submit' className='mt-2 bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer leading-relaxed tracking-wide'>Create Account</button>
                    <p className='text-center text-white'>Already have an account ?<Link to="/login" className='link text-accent cursor-pointer'>Login</Link></p>
                </form>
            </div>
        </>
    )
}

export default Signup

