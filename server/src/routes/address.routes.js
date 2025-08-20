const express=require("express")
const { addAddressController, fetchAddressController, updateAddressController, deleteAddressController } = require("../controllers/address.controllers")
const addressRouter=express.Router()
addressRouter.post("/",addAddressController)
addressRouter.get("/:userId",fetchAddressController)
addressRouter.put("/:userId/:addressId",updateAddressController)
addressRouter.delete("/:userId/:addressId",deleteAddressController)
module.exports=addressRouter