const mongoose=require("mongoose")
const reviewSchema=new mongoose.Schema({
  productId:String,
  userId:String,
  userName:String,
  reviewMessage:String,
  reviewValue:String
},{timestamps:true})
module.exports=mongoose.model("Reviews",reviewSchema)