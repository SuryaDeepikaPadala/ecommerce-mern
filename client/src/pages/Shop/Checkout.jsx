import React, { useState } from "react";
import img from "../../assets/Hero.jpg";
import Address from "@/components/Shop/Address";
import CartContent from "@/components/Shop/CartContent";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/store/slices/order.slice";
import { toast } from "sonner";

const Checkout = () => {
  const { cartItems,cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const{approveURL}=useSelector((state)=>state.order)
  const[paymentStarted,setPaymentStarted]=useState(false)
  const[selectedAddress,setSelectedAddress]=useState("")
  const dispatch=useDispatch()
  const totalAmount = cartItems?.reduce(
    (sum, currentValue) =>
      sum +
      (currentValue.salePrice > 0
        ? currentValue.salePrice
        : currentValue.price) *
        currentValue.quantity,
    0
  );
  const handleInitiatePaypalPayment = () => {
    if(cartItems.length===0)
    {
      toast("Cart is empty")
      return 
    }
    if(selectedAddress==="")
    {
        toast("Choose address to proceed")
        return 
    }
    const orderData = {
      userId: user.id,
      cartId:cart?._id,
      cartItems: cartItems?.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: selectedAddress&&{
        addressId:selectedAddress._id,
        address:selectedAddress.address,
        state:selectedAddress.state,
        city:selectedAddress.city,
        pinCode:selectedAddress.pinCode,
        phNumber:selectedAddress.phNumber,
        notes:selectedAddress.notes,
        totalAmount
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",

      orderDate: new Date(),
      updatedOrderDate: new Date(),
      totalAmount: totalAmount,
      paymentId: "",
      payerId: "",
    };
    console.log(orderData,"opp")
    dispatch(createOrder(orderData)).then((res)=>{
      // console.log("orders",res)
      if(res.payload.success)
      {
        console.log("deepika",res)
        setPaymentStarted(true)
      }
    })
  };
  if(approveURL)
  {
    window.location.href=approveURL
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Banner Image */}
      <div className="w-full">
        <img
          src={img}
          alt="checkout-img"
          className="w-full h-[450px] "
        />
      </div>

      {/* Checkout Layout */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Address Section (Left side) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <Address setSelectedAddress={setSelectedAddress} />
        </div>

        {/* Cart Summary (Right side) */}
        <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {cartItems?.map((item) => (
              <CartContent key={item.id} cartItem={item} />
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-6">
            <h1 className="text-lg font-semibold">Total:</h1>
            <span className="text-xl font-bold text-green-600">
              ${totalAmount}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleInitiatePaypalPayment}
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Checkout with PayPal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
