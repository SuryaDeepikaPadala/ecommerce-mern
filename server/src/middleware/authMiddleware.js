const jwt=require("jsonwebtoken")
const User=require("../models/user.model")
const authMiddleware=async(req,res,next)=>{
    const token=await req.cookies.token
    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:"Unauthenticated user"
        })
    }
    try {
        const decodedInfo=jwt.verify(token,process.env.JWT_SECRET)
        const {user}=decodedInfo
        const userInfo=await User.findById(user.id).select("-password")
        if(userInfo)
        {
            req.user={
                id:userInfo._id,
                username:userInfo.username,
                email:userInfo.email,
                role:userInfo.role
            }
            next()
        }
    } catch (error) {
      console.log(error)  
      return res.status(500).json({
        success:false,
        message:"something went wrong"
      })
    }
}
module.exports=authMiddleware