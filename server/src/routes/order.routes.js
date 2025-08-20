const express=require("express")
const {createOrderController, captureOrderController, getAllOrdersByUserController, getOrderDetailsByOrderIdController, getAllOrdersController} = require("../controllers/order.controllers")
const orderRouter=express.Router()
orderRouter.post("/create",createOrderController)
orderRouter.post("/capture",captureOrderController)
orderRouter.get("/:userId",getAllOrdersByUserController)
orderRouter.get("/details/:orderId",getOrderDetailsByOrderIdController)

module.exports=orderRouter