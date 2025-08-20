const Order = require('../models/order.model');
const getAllOrdersController=async(req,res)=>{
  try {
    const orders=await Order.find({})
    if(!orders)
    {
      return res.status(404).json({
        success:false,
        message:"No orders"
      })
    }
    res.status(200).json({
      success:true,
      orders
    })
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}
const getOrderDetailsByOrderIdForAdminController=async(req,res)=>{
  try {
    const {id}=req.params
    const order=await Order.findById(id)
    if(!order)
    {
      return res.status(404).json({
        success:false,
        message:"No order found"
      })
    }
    res.status(200).json({
      success:true,
      order
    })
  } catch (error) {
     console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}
const updateOrderStatusController=async(req,res)=>{
  try {
    const {orderId}=req.params
   
    const {status}=req.body
    const order=await Order.findById(orderId)
    if(!order)
    {
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }
    order.orderStatus=status
    await order.save()
    res.status(201).json({
      success:true,
      message:"Order status updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong"
    });
  }
}
module.exports={getAllOrdersController,getOrderDetailsByOrderIdForAdminController,updateOrderStatusController}