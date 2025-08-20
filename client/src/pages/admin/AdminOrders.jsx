import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/table'
import { Button } from '../../components/ui/button'
import OrderDetails from '@/components/Admin/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, getOrderDetailsForAdmin } from '@/store/slices/admin.order.slice'

const AdminOrders = () => {
  
  const [orderDialog, setOrderDialog] = useState(false)
  const {orders}=useSelector((state)=>state.adminOrder)
  
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllOrders()).then((res)=>console.log(res))
  },[dispatch])
  const handleOrderDetailsForAdmin=(order)=>{
    setOrderDialog(true)
    dispatch(getOrderDetailsForAdmin(order?._id)).then((res)=>console.log("admin",res))
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Orders</h1>

      <Table className="border rounded-xl shadow-sm">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            orders?.map((order)=><TableRow className="hover:bg-gray-50 transition">
            <TableCell className="font-mono">{order?._id}</TableCell>
            <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
            <TableCell>
             <span className={`px-3 py-1 text-xs rounded-full ${badge(order?.orderStatus)}`}>
                  {order?.orderStatus}
                </span>
            </TableCell>
            <TableCell className="font-semibold">${order?.totalAmount}</TableCell>
            <TableCell>
              <Button
                variant="default"
                size="sm"
                onClick={() => {setOrderDialog(true)
                  handleOrderDetailsForAdmin(order)
                }}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>)
          }
          
        </TableBody>
      </Table>

      {/* Order Details Dialog */}
      <OrderDetails
        orderDialog={orderDialog}
        setOrderDialog={setOrderDialog}
      />
    </div>
  )
}

export default AdminOrders
