const jwt=require('jsonwebtoken')
const User=require("../models/User")
// Generate JWT Token

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"})
}

// Register User
exports.registerUser=async(req,res)=>{
        console.log("req.body:", req.body);
    const {fullName,email,password,profileImageUrl}=req.body

    if(!fullName||!email||!password)
    {
        return res.status(400).json({message:"All fields are required!"})
    }
    try{
        const emailExist=await User.findOne({email})
        if(emailExist){
            return res.status(400).json({message:"Email Already Exists"})
        }

        // create a user
        const user=await User.create({
            fullName,email,password,profileImageUrl
        })
        res.status(201).json({
            id:user._id,user,token:generateToken(user._id),
        })

    }catch(err){
        res.status(500).json({message:"Error While Registering"})
    }
}

// login User
exports.loginUser=async(req,res)=>{
    const {email,password}=req.body

    if(!email||!password){
         return res.status(400).json({message:"All fields are required!"})
    }try{
         const user=await User.findOne({email})
         if(!user || !(await user.comparePasswords(password)))
         {
              return res.status(400).json({message:"Invalid Credential!"})
         }
          res.status(201).json({
            id:user._id,user,token:generateToken(user._id),
        })

    }catch(err){
        res.status(500).json({message:"Error While Registering",error:err.message})
    }
    
}

// Register User
exports.getUserInfo=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id).select("-password")
        if(!user){
             return res.status(404).json({message:"User not Found!"})
        }
        res.status(200).json(user)
        
    }catch(err){
            res.status(500).json({message:"Error While Registering",error:err.message})
        }
}