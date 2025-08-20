const express=require("express")
const {getFilteredProducts,getProductController} = require("../controllers/shop.controllers")
const shopRouter=express.Router()
shopRouter.get("/products",getFilteredProducts)
shopRouter.get("/product/:id",getProductController)
module.exports=shopRouter