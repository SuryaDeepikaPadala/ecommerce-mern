import React from "react";
import { useSelector } from "react-redux";
import { SheetContent } from "../ui/sheet";
import CartContent from "./CartContent";
import { useNavigate } from "react-router-dom";

const CartWrapper = () => {
  const { cartItems,isLoading } = useSelector((state) => state.cart);
  // console.log(cartItems);
  const totalAmount=cartItems?.reduce((sum,currentValue)=>sum+(currentValue.salePrice>0?currentValue.salePrice:currentValue.price)*currentValue.quantity,0)
  const navigate=useNavigate()
  if (isLoading) {
  return <p>Loading cart...</p>; // or a spinner
}
  return (
    <SheetContent className="w-[400px] sm:w-[500px] p-4 flex flex-col bg-white">
      <h1 className="text-xl font-semibold border-b pb-3">Your Cart</h1>

      <div className="flex-1 overflow-y-auto mt-4 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartContent key={cartItem.productId} cartItem={cartItem} />
          ))
        ) : (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
        <h1 className="text-lg font-semibold">Total:</h1>
        <span className="text-xl font-bold ">${totalAmount}</span>
      </div>

      <div className="border-t pt-4 mt-4">
        <button onClick={()=>navigate("/shop/checkout")} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg">
          Checkout
        </button>
      </div>
    </SheetContent>
  );
};

export default CartWrapper;
