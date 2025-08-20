const Product=require("../models/product.model")
const getFilteredProducts=async(req,res)=>{
  try {
    const {category=[],brand=[],sort}=req.query
    let filters={}
    let sortOptions={}
    if(category.length)
    {
      filters.category={$in:category.split(",")}
    }
    if(brand.length)
    {
      filters.brand={$in:brand.split(",")}
    }
    switch (sort) {
      case "price:lowtohigh":
        sortOptions.price=1
        break;
      case "price:hightolow":
        sortOptions.price=-1
        break;
      case "title:atoz":
        sortOptions.title=1
        break;
      case "title:ztoa":
        sortOptions.title=-1
        break;
      default:
        sortOptions.price=1
        break;
    }
    const products=await Product.find(filters).sort(sortOptions)
    res.status(200).json({
      success:true,
      products
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Something went wrong"
    })
  }
}
const getProductController=async(req,res)=>{
  try{
    const {id}=req.params
    const product=await Product.findById(id)
    if(!product)
    {
      return res.status(404).json({
        success:false,
        message:"product not found"
      })
    }
    res.status(200).json({
      success:true,
      product

    })
  }
  catch(error)
  {
    console.log(error)
    res.status(500).json({
      success:false,
      message:"Something went wrong"
    })
  }
}
module.exports={getFilteredProducts,getProductController}