import React,{useState,useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {Link, useNavigate} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import {fullNameValidation, isNumericPasswordValid, validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/layouts/ProfilePhotoSelector'
import axiosInstance from '../../utils/axiosinstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/UserContext'
import uploadImage from '../../utils/uploadImage'

const SignUp = () => {
  const [profilePic,setProfilePic]=useState(null)
  const [fullName,setFullName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [error,setError]=useState(null)
 
  const {updateUser}=useContext(UserContext);

  const navigate=useNavigate()

  const handleSignUp=async(e)=>{
    e.preventDefault()

    if(!fullName){
      setError("please enter full name")
      return;
    }

    if (!fullNameValidation(fullName)) {
  setError("Full name must be a valid string");
  return;
}

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
        if(password.length<6)
        {
           setError("password must be greater then 6 length");
          return;
        }
        if(!isNumericPasswordValid(password))
        {
            setError("password must contains only number");
          return;
        }
        setError(" ");

 let profileImageUrl = "";
        try{
          if(profilePic){
            const imgUploadRes=await uploadImage(profilePic)
            profileImageUrl=imgUploadRes.imageUrl||""
          }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{

        fullName,email,password,profileImageUrl
      })
      const {token,user}=response.data

      if(token){
        localStorage.setItem("token",token)
        updateUser(user)
        navigate("/dashboard")

      }
      
    }catch (err) {
  console.error("Signup error:", err);  // <-- log full error object
  if (err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message);
  } else if (err.message) {
    setError(err.message);  // show generic JS error message
  } else {
    setError("Something went Wrong. Please try again");
  }
}


  }
  return (
    <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
          <p className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp}>

            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input value={fullName} onChange={({target})=>setFullName(target.value)}
          label="Full Name"
          placeholder="aarti malpeddi" type="text"/> 

<Input value={email} onChange={({target})=>setEmail(target.value)}
          label="Email Address"
          placeholder="aarti@gmail.com" type="text"/> 

          <div className='col-span-2'>

          <Input value={password} onChange={({target})=>setPassword(target.value)}
          label="Password"
          placeholder="Min 6 Character" type="password"/>
</div>
            </div>
             {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            
                      <button type='submit' className='btn-primary'>SIGNUP</button>
            
                      <p className='text-[13px] text-slate-800 mt-3'>Already have an Account? {" "}
                        <Link className='font-medium text-violet-500 underline' to="/login">LogIn</Link>
            
                      </p>
        </form>
        </div>
    </AuthLayout>
  )
}

export default SignUp
