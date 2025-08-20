import React from 'react'
import { Badge } from '../ui/badge'

const ShopProductTile = ({ product,handleShowDetailsPage,handleAddToCart }) => {
  const isSale = product.salePrice > 0

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col">
      <div onClick={()=>handleShowDetailsPage(product._id)}>
          <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product?.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {isSale && (
          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
            Sale
          </Badge>
        )}
        {
          product?.totalStock===0? <Badge className="absolute top-2 left-2 bg-red-600 text-white">Out of stock</Badge>:null
        }
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <h3 className="font-semibold text-lg truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 capitalize">{product.brand}</p>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>

        <div className="flex items-center gap-2 mt-1">
          <p className={`${isSale ? 'line-through text-gray-400' : 'text-black'} font-semibold`}>
            ${product.price}
          </p>
          {isSale && <p className="text-green-600 font-bold">${product.salePrice}</p>}
        </div>
      </div>

      </div>
    
        {
          product.totalStock===0?<button className='mt-auto bg-black text-white py-2 px-4 rounded cursor-not-allowed opacity-50'>
            Out of stock
          </button>:
        <button onClick={()=>handleAddToCart(product)}  className="mt-auto bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
        Add to Cart
      </button>
        }
    
      </div>
    
  )
}

export default ShopProductTile
