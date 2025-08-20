const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const registerController=async(req,res)=>{
    const {username,email,password,role}=req.body
    try {
        let user=await User.findOne({email})
        if(user)
        {
            return res.status(400).json({
                success:false,
                message:"Email already registered"
            })
        }
        user=await User.create({
            username,
            email,
            password,
            role
        })
       
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }

        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
const loginController=async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        const passwordCheck=await user.checkPassword(password)
        if(!passwordCheck)
        {
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
         const accessToken=jwt.sign({user:{id:user._id,role:user.role}},process.env.JWT_SECRET,{expiresIn:"1h"})
        await res.cookie("token",accessToken,{
            httpOnly:true,
            secure:false,
            maxAge:1*60*60*1000,
            sameSite:"lax"
        })
         res.status(201).json({
            success:true,
            message:"User loggedIn successfully",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }

        })
    } catch (error) {
         console.log(error)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
const logoutController=async(req,res)=>{
    try {
        res.clearCookie("token",
            {
                httpOnly:true,
            secure:false,
            maxAge:1*60*60*1000,
            sameSite:"lax"
            }
        )
        res.status(200).json({
            success:true,
            message:"User loggedOut successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
module.exports={registerController,loginController,logoutController}