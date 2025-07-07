import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { isNumericPasswordValid, validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'

const Login = () => {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState("")

  const {updateUser}=useContext(UserContext);
  const navigate=useNavigate()

  const handleLogin=async (e) =>{
    e.preventDefault()

    if(!email){
      setError("please enter email address")
      return
    }

    if(!validateEmail(email))
    {
      setError("please enter valid email address");
      return;
    }
    if(!password)
    {
      setError("please enter the password");
      return;
    }
  if (password.length < 6) {
    setError("password must be 6 or greater then 6 length");
      return;
  }
  if(!isNumericPasswordValid(password))
          {
              setError("password must contains only number");
            return;
          }
    setError(" ");

    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
      })
      const {token,user}=response.data

      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        navigate("/dashboard")

      }
      
    }catch(err){
      if(err.response && err.response.data.message)
      {
        setError(err.response.data.message)
      }else{
        setError("Something went Wrong.Please try again")
      }
    }
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in 
        </p>

        <form onSubmit={handleLogin}>
          <Input value={email} onChange={({target})=>setEmail(target.value)}
          label="Email Address"
          placeholder="aarti@gmail.com" type="text"/> 

          <Input value={password} onChange={({target})=>setPassword(target.value)}
          label="Password"
          placeholder="Min 6 Character" type="password"/> 

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type='submit' className='btn-primary'>LOGIN</button>

          <p className='text-[13px] text-slate-800 mt-3'>Dont't have an account?{" "}
            <Link className='font-medium text-violet-500 underline' to="/signup">SignUp</Link>

          </p>


        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
