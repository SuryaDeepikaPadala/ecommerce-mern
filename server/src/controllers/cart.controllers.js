const Cart=require("../models/cart.model")
const Product=require("../models/product.model")
const addProductToCart=async(req,res)=>{
  try {
    const {userId,productId,quantity}=req.body
    if(!userId || !productId ||!quantity)
    {

      return res.status(400).json({
        success:false,
        message:"Invalid data provided"
      })
    }
    let cart=await Cart.findOne({userId})
    if(!cart)
    {
      cart=await Cart.create({
        userId,
        items:[]
      })
    }
    const currentIndexOfProduct=cart.items?.findIndex((item)=>item.productId.toString()===productId)
    if(currentIndexOfProduct===-1)
    {
      cart.items.push({productId,quantity})
    }
    else{
      cart.items[currentIndexOfProduct].quantity+=quantity
    }
    await cart.save()
    res.status(200).json({
      success:true,
      message:"product added to the cart",
      cart
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const fetchCartProducts=async(req,res)=>{
  try {
    const {userId}=req.params
    const cart=await Cart.findOne({userId})
    if(!cart)
    {
      return res.status(404).json({
        success:false,
        message:"cart not found"
      })
    }
    const validProducts=cart.items.filter((item)=>item.productId)
    if(validProducts.length<cart.items.length)
      {
        cart.items=validProducts
      }
      await cart.save()
      await cart.populate({
        path:"items.productId",
      select:"image title price salePrice"
      })
    const populatedItems=validProducts.map((product)=>({
      productId:product.productId._id,
      image:product.productId.image,
      title:product.productId.title,
      price:product.productId.price,
      salePrice:product.productId.salePrice,
      quantity:product.quantity
    }))
    res.status(200).json({
      success:true,
      cart:{
        ...cart._doc,
        items:populatedItems
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
const updateCartProductQuantity=async(req,res)=>{
  try {
    const {userId,productId,quantity}=req.body
    const cart=await Cart.findOne({userId})
    if(!cart)
    {
      return res.status(404).json({
        success:false,
        message:"No products in the cart"
      })
    }
    
    const currentIndexOfProduct=cart.items.findIndex((item)=>item.productId.toString()===productId)
    if(currentIndexOfProduct===-1)
    {
      return res.status(404).json({
        success:false,
        message:"product not in the cart"
      })
    }
    else{
      cart.items[currentIndexOfProduct].quantity=quantity
    }
    await cart.save()
    await cart.populate({
      path:"items.productId",
      select:"image price salePrice title"
    })
    const populatedItems=cart.items.map((item)=>({
      productId:item.productId?._id,
      image:item.productId?.image,
      title:item.productId?.title,
      price:item.productId?.price,
      salePrice:item.productId?.salePrice,
      quantity:item.quantity
    }))
     res.status(201).json({
      success:true,
      cart:{
        ...cart._doc,
        items:populatedItems
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
const deleteCartProduct=async(req,res)=>{
  try {
    const {userId,productId}=req.params
    const cart=await Cart.findOne({userId})
    if(!cart)
    {
      return res.status(400).json({
        success:false,
        message:"No products in the cart..."
      })
    }
    const currentIndexOfProduct=cart.items.findIndex((item)=>item.productId.toString()===productId)
    if(currentIndexOfProduct===-1)
    {
      return res.status(404).json({
        success:false,
        message:"product not in the cart"
      })
    }
    
    cart.items=cart.items.filter((item)=>item.productId.toString()!==productId)
    
    await cart.save()
    await cart.populate({
      path:"items.productId",
      select:"image title price salePrice"
    })
     const populatedItems=cart.items.map((item)=>({
      productId:item.productId._id,
      image:item.productId.image,
      title:item.productId.title,
      price:item.productId.price,
      salePrice:item.productId.salePrice,
      quantity:item.quantity
    }))
    res.status(200).json({
      success:true,
      cart:{
        ...cart._doc,
        items:populatedItems
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
module.exports={addProductToCart,fetchCartProducts,updateCartProductQuantity,deleteCartProduct}