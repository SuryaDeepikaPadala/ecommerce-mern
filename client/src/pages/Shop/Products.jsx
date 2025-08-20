import React, { useEffect, useState } from 'react'
import FilterProducts from '@/components/Shop/FilterProducts'
import { Button } from '@/components/ui/button'
import { RiArrowUpDownFill } from "react-icons/ri"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { shopSortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredProducts, fetchProductDetails } from '@/store/slices/shop.slice'
import ShopProductTile from '@/components/Shop/ShopProductTile'
import { useSearchParams } from 'react-router-dom'
import ProductDetailsTile from '@/components/Shop/ProductDetailsTile'
import { addProductsToCart, fetchCartProducts } from '@/store/slices/cart.slice'
import { toast } from 'sonner'

const Products = () => {
  const dispatch=useDispatch()
  const {FilteredProducts,productDetails}=useSelector((state)=>state.shop)
  const[sort,setSort]=useState(null)
  const[open,setOpen]=useState(false)
  const[filters,setFilters]=useState({})
  const[searchParams,setSearchParams]=useSearchParams()
  const{user}=useSelector((state)=>state.auth)
  const {cartItems}=useSelector((state)=>state.cart)
  const categorySearchParams=searchParams.get('category')
  const handleFilters=(key,option)=>{
    let cpyFilters={...filters}
    const checkKey=Object.keys(cpyFilters).indexOf(key)
    if(checkKey===-1)
    {
      cpyFilters={
        ...cpyFilters,
        [key]:[option]
      }
    }
    else{
      const indexOfOption=cpyFilters[key].indexOf(option)
      if(indexOfOption===-1)
      {
        cpyFilters[key].push(option)
      }
      else{
        cpyFilters[key].splice(indexOfOption,1)
      }
    }
    setFilters(cpyFilters)
    // console.log(cpyFilters)
    sessionStorage.setItem("filters",JSON.stringify(cpyFilters))
  
  }
  const createQueryParamHelper=(filterParams)=>{
    const queryParams=[]
    for(const [key,value] of Object.entries(filterParams))
    {
      if(Array.isArray(value) && value.length>0)
      {
        const paramValue=value.join(",")
        queryParams.push(`${key}=${encodeURI(paramValue)}`)
      }
    }
    return queryParams.join("&")
  }
  const handleShowDetailsPage=(productId)=>{
      dispatch(fetchProductDetails(productId)).then((res)=>{
        if(res?.payload?.success)
        {
          console.log(res?.payload?.product)
          setOpen(true)
        }
      })
  }
  const handleAddToCart=(product)=>{
    dispatch(addProductsToCart({userId:user?.id,productId:product._id,quantity:1})).then((res)=>{
      if(res?.payload?.success)
      {
        
        toast("product added to the cart")
        dispatch(fetchCartProducts(user.id))
        setOpen(false)
      }
    })
  }
  useEffect(()=>{
    dispatch(fetchFilteredProducts({filterParams:filters,sortParams:sort}))
  },[dispatch,filters,sort])
  useEffect(()=>{
    setSort("price:lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters"))||[])
  },[categorySearchParams])
  useEffect(()=>{
    if(filters && Object.keys(filters).length>0)
    {
      const queryParam=createQueryParamHelper(filters)
      setSearchParams(new URLSearchParams(queryParam))

    }
  },[filters])
  useEffect(()=>{
    dispatch(fetchCartProducts(user.id))
  },[])
  
  useEffect(() => {
  if (user?.id) {
    dispatch(fetchCartProducts(user.id));
  }
}, [dispatch, user?.id]);
  // console.log(sort)
  
  return (
<div className="w-full min-h-screen max-w-7xl mx-auto px-4 py-6">
  {/* Main Layout: Column on mobile, Row on md+ */}
  <div className="flex flex-col md:flex-row gap-6">
    
    {/* Filters Section */}
    <div className="w-full md:w-1/4">
      <FilterProducts filters={filters} handleFilters={handleFilters} />
    </div>

    {/* Products Section */}
    <div className="w-full md:w-3/4 space-y-4">
      
      {/* Top bar: Title + Sort */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-xl font-semibold text-gray-800">All Products</h1>

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <RiArrowUpDownFill className="text-lg" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            {shopSortOptions?.map((option) => (
              <DropdownMenuRadioItem key={option.id} value={option.id} >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          FilteredProducts?.map((product)=>(
            <ShopProductTile key={product._id} product={product} handleShowDetailsPage={handleShowDetailsPage} handleAddToCart={handleAddToCart}/>
          ))
        }
      </div>
    </div>
  </div>
  <ProductDetailsTile productDetails={productDetails} open={open}
          setOpen={setOpen} handleAddToCart={handleAddToCart}/>
</div>
  )
}

export default Products
