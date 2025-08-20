const mongoose=require("mongoose")
const OrderSchema=new mongoose.Schema({
  userId:{
    type:String,
  },
  cartId:String,
  cartItems:[{
    productId:String,
    title:String,
    image:String,
    price:Number,
    
    quantity:Number
  }],
  addressInfo:{
    addressId:String,
    address:String,
    state:String,
    city:String,
    pinCode:String,
    phNumber:String,
    notes:String
  },
  orderStatus:String,
  paymentMethod:String,
  paymentStatus:String,
  orderDate:Date,
  updatedOrderDate:Date,
  totalAmount:Number,
  paymentId:String,
  payerId:String
},{timestamps:true})
module.exports=mongoose.model("Order",OrderSchema)