const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
  image:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  category:{
    type:String
  },
  brand:{
    type:String,
  },
  price:{
    type:Number,
    required:true,
    
  },
  salePrice:{
    type:Number,
    default:0,
  },
  totalStock:{
    type:Number,
    default:0
  }
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)