const express=require("express")
const searchController = require("../controllers/search.controllers")
const searchRouter=express.Router()
searchRouter.get("/:keyword",searchController)
module.exports=searchRouter