const express=require("express")
const { addProductToCart, fetchCartProducts, updateCartProductQuantity, deleteCartProduct } = require("../controllers/cart.controllers")
const cartRouter=express.Router()
cartRouter.post("/",addProductToCart)
cartRouter.get("/:userId",fetchCartProducts)
cartRouter.put("/",updateCartProductQuantity)
cartRouter.delete("/:userId/:productId",deleteCartProduct)
module.exports=cartRouter