import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  orders:[],
  orderDetails:{}
}
export const getAllOrders=createAsyncThunk("/admin/orders",
  async(thunkAPI)=>{
    try {
      const response=await axios.get("http://localhost:3000/api/admin/orders")
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const getOrderDetailsForAdmin=createAsyncThunk("/admin/order",
  async(id,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/admin/orders/${id}`)
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const updateOrderStatus=createAsyncThunk("/admin/orderstatus/update",
  async({orderId,status},thunkAPI)=>{
    try {
      const response=await axios.post(`http://localhost:3000/api/admin/orders/${orderId}`,
        {
          status
        }
      )
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const adminOrderSlice=createSlice({
  name:"admin orders",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getAllOrders.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getAllOrders.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.orders=action?.payload?.orders
    })
    .addCase(getAllOrders.rejected,(state)=>{
      state.isLoading=false,
      state.orders=[]
    })
    .addCase(getOrderDetailsForAdmin.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getOrderDetailsForAdmin.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.orderDetails=action?.payload?.order
    })
    .addCase(getOrderDetailsForAdmin.rejected,(state)=>{
      state.isLoading=false,
      state.orderDetails={}
    })
  }
})
export default adminOrderSlice.reducer