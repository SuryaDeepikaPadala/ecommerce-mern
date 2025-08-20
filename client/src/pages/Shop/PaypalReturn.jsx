import { captureOrder } from '@/store/slices/order.slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturn = () => {
  const dispatch=useDispatch()
  const location=useLocation()
  const params=new URLSearchParams(location.search)
  const payerId=params.get("PayerID")
  console.log(payerId)
  useEffect(() => {
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"))
  console.log("Dispatching captureOrder with:", { payerId, orderId })
  
  dispatch(captureOrder({ payerId, orderId }))
    .then((res) => {
      console.log("Capture order response:", res)
      if (res?.payload?.success) {
        sessionStorage.removeItem("currentOrderId")
        window.location.href = "/shop/paypal-success"
      } else {
        console.log("Payment failed:", res)
      }
    })
}, [dispatch, payerId])

 
  return (
    <div className='w-full min-h-screen'>Processing payment...please wait...</div>
  )
}

export default PaypalReturn