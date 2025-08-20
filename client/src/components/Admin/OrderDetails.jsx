import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '../common/FormControl'
import { getAllOrders, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/slices/admin.order.slice'
import { toast } from 'sonner'

const OrderDetails = ({ orderDialog, setOrderDialog }) => {
  const initialForm={
    status:""
  }
  const dispatch=useDispatch()
  const {orderDetails}=useSelector((state)=>state.adminOrder)
  const[statusFormData,setStatusFormData]=useState(initialForm)
  const {user}=useSelector((state)=>state.auth)
  const handleUpdateOrderStatus=(event)=>{
    event.preventDefault()
    const orderId=orderDetails?._id
    const {status}=statusFormData
    dispatch(updateOrderStatus({orderId:orderId,status:status})).then((res)=>{
      if(res?.payload?.success)
      {
        dispatch(getOrderDetailsForAdmin(orderId))
        dispatch(getAllOrders())
        setStatusFormData(initialForm)
        toast(res?.payload?.message)
      }
    })
  }
  const badge = (status) => ({
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  shipped:   "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  refunded:  "bg-purple-100 text-purple-700",
}[status] || "bg-gray-100 text-gray-700");
  return (
    <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p><span className="font-semibold">Order Id:</span>{orderDetails?._id}</p>
          <p><span className="font-semibold">Order Date:</span>{orderDetails?.orderDate}</p>
          <p><span className="font-semibold">Order Price:</span>${orderDetails?.totalAmount}</p>
          <p>
            <span className="font-semibold">Order Status:</span>{' '}
            <span className={`px-2 py-1 rounded-md text-sm ${badge(orderDetails?.orderStatus)}`}>
                  {orderDetails?.orderStatus}
                </span>
          </p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Products</h3>
          <ul className="list-disc list-inside space-y-1">
            {
              orderDetails?.cartItems?.map((item)=>
                <li>{item?.title} - ${item?.price}</li>
              )
            }
           
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
         
          <p>Contact: {orderDetails?.addressInfo?.phNumber}</p>
          <p>{orderDetails?.addressInfo?.address}</p>
          <p>{orderDetails?.addressInfo?.state}, {orderDetails?.addressInfo?.city}</p>

          <p>Pincode:{orderDetails?.addressInfo?.pinCode}</p>
          <p>Notes: {orderDetails?.addressInfo?.notes}</p>
        </div>
        <FormControl formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "shipped", label: "Shipped" },
                  { id: "cancelled", label: "Cancelled" },
                  { id: "delivered", label: "Delivered" },
                  { id: "refunded", label: "Refunded" },
                ],
              },
            ]} formData={statusFormData} setFormData={setStatusFormData} buttonText={"Edit order status"} onSubmit={handleUpdateOrderStatus}/>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetails
