const Product=require("../models/product.model")
const searchController=async(req,res)=>{
  try {
    const {keyword}=req.params
    if(!keyword && keyword.trim()!=="" && typeof keyword==='string')
    {
      return res.status(400).json({
        success:false,
        message:"Keyword must be string"
      })
    }
    const regexp=new RegExp(keyword,"i")
    const searchFilter={
      $or:[
        {title:regexp},
        {description:regexp},
        {category:regexp},
        {brand:regexp}
      ]
    }
    const searchedProducts=await Product.find(searchFilter)
    res.status(200).json({
      success:true,
      searchedProducts
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
}
module.exports=searchController