import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetailsByOrderId } from "@/store/slices/order.slice";
import UserOrderDetails from "./UserOrderDetails";

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);

  const [orderDialog, setOrderDialog] = useState(false);
  
  

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUser(user.id));
    }
  }, [dispatch, user?.id]);

  const handleViewOrderDetails = (order) => {
    // show basic info immediately, then hydrate with full details if needed
   
    setOrderDialog(true);

   
    dispatch(getOrderDetailsByOrderId(order?._id))
      
      .then((res) => {
        // expect res to contain .order — adjust if your thunk shape differs
        if(res?.payload?.success)
        {
          console.log(res)
        }
      })
      
      
  };
  console.log(orders)
  const badge = (status) => ({
    pending:   "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    shipped:   "bg-blue-100 text-blue-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
    refunded:  "bg-purple-100 text-purple-700",
  }[status] || "bg-gray-100 text-gray-700");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Order History</h1>

      <Table className="w-full border rounded-xl shadow-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="font-semibold">Order Id</TableHead>
            <TableHead className="font-semibold">Order Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Total</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order?._id} className="hover:bg-gray-50 transition">
              <TableCell className="font-mono">{order?._id}</TableCell>
              <TableCell>{order?.orderDate?.split("T")[0]}</TableCell>
              <TableCell>
                <span className={`px-3 py-1 text-xs rounded-full ${badge(order?.orderStatus)}`}>
                  {order?.orderStatus}
                </span>
              </TableCell>
              <TableCell className="font-semibold">${order?.totalAmount}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleViewOrderDetails(order)}
                  className="px-4 py-1 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserOrderDetails
        open={orderDialog}
        onOpenChange={setOrderDialog}
        
      />
    </div>
  );
};

export default Orders;
