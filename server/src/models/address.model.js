const mongoose=require("mongoose")
const addressSchema=new mongoose.Schema({
  userId:{
    type:String,
    
  },
  address:{
    type:String,
    
  },
  pinCode:{
    type:String
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  phNumber:{
    type:String
  },
  notes:{
    type:String
  }
},{timestamps:true})
module.exports=mongoose.model("Address",addressSchema)