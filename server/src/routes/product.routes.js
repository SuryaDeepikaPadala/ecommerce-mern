const express=require("express")
const { addProductController, fetchProductsController, updateProductController, deleteProductController } = require("../controllers/products.contoller")
const upload = require("../config/multer")
const imageUploadController = require("../controllers/image.controllers")

const productRouter=express.Router()
productRouter.post("/",addProductController)
productRouter.get("/",fetchProductsController)
productRouter.put("/:id",updateProductController)
productRouter.delete("/:id",deleteProductController)
productRouter.post("/image",upload.single("my-image"),imageUploadController)

module.exports=productRouter