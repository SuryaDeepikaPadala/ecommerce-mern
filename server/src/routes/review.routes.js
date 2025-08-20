const express=require("express")
const reviewRouter=express.Router()
const { addReviewController, getProductReviewsController } = require("../controllers/review.controller")
reviewRouter.post("/review",addReviewController)
reviewRouter.get("/reviews/:productId",getProductReviewsController)
module.exports=reviewRouter