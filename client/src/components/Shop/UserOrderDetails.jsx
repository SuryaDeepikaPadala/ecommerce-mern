import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useSelector } from "react-redux";



const badge = (status) => ({
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  shipped:   "bg-blue-100 text-blue-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  refunded:  "bg-purple-100 text-purple-700",
}[status] || "bg-gray-100 text-gray-700");

const UserOrderDetails = ({ open, onOpenChange }) => {
  const {orderDetails}=useSelector((state)=>state.order)
  console.log(orderDetails)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Order Details</DialogTitle>
        </DialogHeader>

        
          <>
            {/* Order Info */}
            <div className="space-y-2 mb-4">
              <p>
                <span className="font-semibold">Order Id:</span> {orderDetails?._id}
              </p>
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {orderDetails?.orderDate?.split("T")[0]}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {orderDetails?.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span>{" "}
                <span className={`px-2 py-1 rounded-md text-sm ${orderDetails?.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {orderDetails?.paymentStatus}
                </span>
              </p>
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                <span className={`px-2 py-1 rounded-md text-sm ${badge(orderDetails?.orderStatus)}`}>
                  {orderDetails?.orderStatus}
                </span>
              </p>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Products</h3>
              <ul className="space-y-2">
                {orderDetails?.cartItems?.map((item) => (
                  <li key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-medium">${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-3 pt-3 border-t font-semibold">
                <span>Total:</span>
                <span>${orderDetails?.totalAmount}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{orderDetails?.addressInfo?.address}</p>
              <p>
                {orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.state}
              </p>
              <p>Pincode: {orderDetails?.addressInfo?.pinCode}</p>
              <p>Phone: {orderDetails?.addressInfo?.phNumber}</p>
              {orderDetails?.addressInfo?.notes && <p>Notes: {orderDetails?.addressInfo?.notes}</p>}
            </div>
          </>
 
      </DialogContent>
    </Dialog>
  );
};

export default UserOrderDetails;
