import { deleteCartProduct, fetchCartProducts, updateCartProductQuantity } from '@/store/slices/cart.slice';
import {  Trash } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const CartContent = ({ cartItem }) => {
  const isSaleOn = cartItem.salePrice > 0;
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.auth)
  
  const handleDeleteCartProduct=(product)=>{
      dispatch(deleteCartProduct({userId:user?.id,productId:product.productId})).then((res)=>{
        if(res?.payload?.success)
        {
          toast("product deleted successfully")
          dispatch(fetchCartProducts(user.id))
        }
      })
  }
  const handleUpdateProductQuantity=(product,typeOfAction)=>{
      dispatch(updateCartProductQuantity({
        userId:user?.id,
        productId:product?.productId,
        quantity:typeOfAction==="plus"?product?.quantity+1:product?.quantity-1
      })).then((res)=>{
        if(res?.payload?.success)
        {
          dispatch(fetchCartProducts(user.id))
        }
      })
  }
  return (
    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
      {/* Product Image */}
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Details */}
      <div className="flex flex-col flex-1 px-3">
        <p className="font-medium text-gray-800 truncate">{cartItem.title}</p>
        <div className="flex items-center gap-2 text-sm">
          <p className={`${isSaleOn ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            ${cartItem.price}
          </p>
          {isSaleOn && (
            <p className="text-red-500 font-semibold">${cartItem.salePrice}</p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-1">
          <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"  disabled={cartItem.quantity===1} onClick={()=>handleUpdateProductQuantity(cartItem,"minus")}>-</button>
          <span className="px-2">{cartItem.quantity}</span>
          <button disabled={cartItem.totalStock===0} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={()=>handleUpdateProductQuantity(cartItem,"plus")}>+</button>
        </div>
      </div>

      {/* Delete Button */}
      <button className="text-gray-700 hover:text-red-500" onClick={()=>handleDeleteCartProduct(cartItem)}>
        {/* <DeleteIcon size={18} /> */}
        <Trash size={18}/>
        
      </button>
    </div>
  );
};

export default CartContent;
