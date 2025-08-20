const Order=require("../models/order.model")
const Reviews=require("../models/review.model")
const Product=require("../models/product.model")
const addReviewController=async(req,res)=>{
  try {
    const {productId,userId,userName,reviewMessage,reviewValue}=req.body
    const order=await Order.findOne({
      userId,
      "cartItems.productId":productId,
       "orderStatus": { $in: ["confirmed", "delivered"] }
    })
    if(!order)
    {
      return res.status(403).json({
        success:false,
        message:"You have to purchase the product inorder to review"
      })
    }
    const isReviewExcistedByUser=await Reviews.findOne({productId,userId})
    if(isReviewExcistedByUser)
    {
      return res.status(400).json({
        success:false,
        message:"Review already excisted for this product"
      })
    }
    const newReview=await Reviews.create({
      productId,userId,userName,reviewMessage,reviewValue
    })
    const reviews=await Reviews.find({productId})
    const reviewsLength=reviews.length
    const reviewAverage=reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviewsLength
    const product=await Product.findByIdAndUpdate(productId,{reviewAverage})
    res.status(201).json({
      success:true,
      newReview
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
const getProductReviewsController=async(req,res)=>{
  try {
    const {productId}=req.params
    const productReviews=await Reviews.find({productId})
    res.status(200).json({
      success:true,
      productReviews
    })
  } catch (error) {
     console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
module.exports={addReviewController,getProductReviewsController}