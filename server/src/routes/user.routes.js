const express=require("express")
const { registerController, loginController, logoutController } = require("../controllers/user.controllers")
const authMiddleware = require("../middleware/authMiddleware")
const userRouter=express.Router()
userRouter.post("/register",registerController)
userRouter.post("/login",loginController)
userRouter.get("/logout",logoutController)
userRouter.get("/profile",authMiddleware,(req,res)=>{
   
        if(req?.user)
        {
            return res.status(200).json({
                success:true,
                message:"User is authenticated",
                user:req.user
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Unauthenticated user"
            })
        }
})
module.exports=userRouter