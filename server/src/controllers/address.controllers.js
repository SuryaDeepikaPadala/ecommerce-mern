const Address=require("../models/address.model")
const addAddressController=async(req,res)=>{
  try {
    const {userId,address,city,state,pinCode,phNumber,notes}=req.body
    if(!userId ||!address ||!city ||!state ||!pinCode ||!phNumber)
    {
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const newAddress=await Address.create({
      userId,address,city,state,pinCode,phNumber,notes
    })
    return res.status(201).json({
      success:true,
      message:"Address added successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const fetchAddressController=async(req,res)=>{
  try {
    const {userId}=req.params
    if(!userId)
    {
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const address=await Address.find({userId})
    res.status(200).json({
      success:true,
      address
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const updateAddressController=async(req,res)=>{
  try {
    const {userId,addressId}=req.params
    if(!userId ||!addressId)
    {
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const address=await Address.findOneAndUpdate({_id:addressId,userId},req.body,{new:true})
    res.status(201).json({
      success:true,
      message:"Address updated successfully"
    })
    if(!address)
    {
      return res.status(404).json({
        success:false,
        message:"Address not found"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const deleteAddressController=async(req,res)=>{
  try {
    const {userId,addressId}=req.params
    if(!userId || !addressId)
    {
      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    const address=await Address.findOneAndDelete({_id:addressId,userId})
    if(!address)
    {
      return res.status(404).json({
        success:false,
        message:"Address not found"
      })
    }
    res.status(200).json({
      success:true,
      message:"Address deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
module.exports={addAddressController,fetchAddressController,updateAddressController,deleteAddressController}