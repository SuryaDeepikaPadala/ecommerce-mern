const express=require("express")
const { getAllOrdersController, getOrderDetailsByOrderIdForAdminController, updateOrderStatusController } = require("../controllers/admin.order.controllers")
const adminOrderRouter=express.Router()
adminOrderRouter.get("/",getAllOrdersController)
adminOrderRouter.get("/:id",getOrderDetailsByOrderIdForAdminController)
adminOrderRouter.post("/:orderId",updateOrderStatusController)
module.exports=adminOrderRouter