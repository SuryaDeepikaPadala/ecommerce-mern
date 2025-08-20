import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  approveURL:null,
  orderId:null,
  orders:[],
  orderDetails:{}
}
export const createOrder=createAsyncThunk("/order/create",
  async(orderData,thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/shop/order/create",orderData,{
        withCredentials:true
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const captureOrder=createAsyncThunk("/order/capture",
  async({orderId,payerId},thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/shop/order/capture",{
        orderId,
        payerId
      })
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const getAllOrdersByUser=createAsyncThunk("/orders/fetch",
  async(userId,thunkAPI)=>{
    try {
        const response=await axios.get(`http://localhost:3000/api/shop/order/${userId}`)
         return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  
  }
)
export const getOrderDetailsByOrderId=createAsyncThunk("/orders/details",
  async(orderId,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/shop/order/details/${orderId}`)
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const shopOrderSlice=createSlice({
  name:'order',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(createOrder.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(createOrder.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.approveURL=action?.payload?.approvalUrl,
      state.orderId=action?.payload?.orderId
      sessionStorage.setItem("currentOrderId",JSON.stringify(action?.payload?.orderId))
    })
    .addCase(createOrder.rejected,(state)=>{
      state.isLoading=false,
      state.approveURL=null,
      state.orderId=null
    })
    .addCase(getAllOrdersByUser.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getAllOrdersByUser.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.orders=action?.payload?.orders
    })
    .addCase(getAllOrdersByUser.rejected,(state,action)=>{
      state.isLoading=false,
      state.orders=[]
    })
    .addCase(getOrderDetailsByOrderId.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getOrderDetailsByOrderId.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.orderDetails=action?.payload?.order
    })
    .addCase(getOrderDetailsByOrderId.rejected,(state)=>{
      state.isLoading=false,
      state.orderDetails={}
    })
  }
})
export default shopOrderSlice.reducer