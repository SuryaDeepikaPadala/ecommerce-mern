const cloudinary=require("../config/cloudinary")
const fs=require("fs")
const imageUploadController=async(req,res)=>{
  try {
     if(!req?.file)
     {
      return res.status(400).json({
        success:false,
        message:"File required"
      })
     }
     const result=await cloudinary.uploader.upload(req?.file?.path)
     fs.unlinkSync(req?.file?.path)
     res.status(200).json({
      success:true,
      message:"File uploaded successfully",
      image:result
     })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
module.exports=imageUploadController