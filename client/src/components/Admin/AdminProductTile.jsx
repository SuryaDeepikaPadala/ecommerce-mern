import { deleteProduct,fetchProducts } from "@/store/slices/product.slice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AdminProductTile = ({ product ,setOpen,setProductFormData,setEditId}) => {
  const dispatch=useDispatch()
  const isOnSale = parseFloat(product.salePrice) > 0;
  const handleDeleteProduct=(id)=>{
    dispatch(deleteProduct(id)).then((res)=>{
      if(res?.payload?.success)
      {
        toast(res?.payload?.message)
        dispatch(fetchProducts())
      }
      
    })
  }
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 p-4 flex flex-col w-full">
      {/* Product Image */}
      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500">{product.category} | {product.brand}</p>

        <div className="mt-2 flex items-center gap-2">
          <p className={`text-md ${isOnSale ? "line-through text-gray-400" : "text-gray-800"}`}>
            ₹{product.price}
          </p>
          {isOnSale && (
            <p className="text-md text-green-600 font-semibold">
              ₹{product.salePrice}
            </p>
          )}
        </div>

        
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button onClick={()=>{
          setEditId(product._id)
          setOpen(true)
          setProductFormData(product)
        }} className="w-full px-4 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Edit
        </button>
        <button onClick={()=>handleDeleteProduct(product?._id)} className="w-full px-4 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductTile;
