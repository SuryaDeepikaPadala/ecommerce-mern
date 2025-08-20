const Product=require("../models/product.model")
const addProductController=async(req,res)=>{
  try {
    const {image,title,description,category,brand,price,salePrice,totalStock}=req.body
    const newProduct=await Product.create({
      image,title,description,category,brand,price:Number(price)
      ,salePrice:Number(salePrice),totalStock:Number(totalStock)
    })
    res.status(201).json({
      success:true,
      message:"Product added successfully",
      product:newProduct
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const fetchProductsController=async(req,res)=>{
  try {
    const products=await Product.find({})
    res.status(200).json({
      success:true,
      products
    })
  } catch (error) {
     console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const updateProductController=async(req,res)=>{
  try {
    const {id}=req.params
    const{image,title,description,category,brand,price,salePrice,totalStock}=req.body
    const product=await Product.findById(id)
    if(!product)
    {
      return res.status(404).json({
        success:false,
        message:"product not found"
      })
    }
    product.image=image ||product.image
    product.title=title || product.title
    product.description=description ||product.description
    product.category=category||product.category
    product.brand=brand||product.category
    product.price=price||product.price
    product.salePrice=salePrice||product.salePrice
    product.totalStock=totalStock||product.totalStock
    await product.save()
    res.status(201).json({
      success:true,
      message:"product updated successfully",
      product
    })
  } catch (error) {
     console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const deleteProductController=async(req,res)=>{
  try {
    const {id}=req.params
    const product=await Product.findById(id)
    if(!product)
    {
      return res.status(404).json({
        success:false,
        message:"product not found"
      })
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({
      success:true,
      message:"product deleted successfully"
    })
  } catch (error) {
     console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
module.exports={addProductController,fetchProductsController,updateProductController,deleteProductController}