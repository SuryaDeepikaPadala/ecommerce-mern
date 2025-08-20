import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  addressList:[]
}
export const addAddress=createAsyncThunk("/address/add",
  async(formData,thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/shop/address",formData,{withCredentials:true})
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const fetchAddress=createAsyncThunk("/address/get",
  async(userId,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/shop/address/${userId}`,{withCredentials:true})
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const updateAddress=createAsyncThunk("/address/update",
  async({userId,addressId,formData},thunkAPI)=>{
    try {
      const response=await axios.put(`http://localhost:3000/api/shop/address/${userId}/${addressId}`,formData,{withCredentials:true})
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const deleteAddress=createAsyncThunk("/address/delete",
  async({userId,addressId},thunkAPI)=>{
    try {
      const response=await axios.delete(`http://localhost:3000/api/shop/address/${userId}/${addressId}`,{withCredentials:true})
      return response?.data
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const addressSlice=createSlice({
  name:"address",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    // .addCase(addAddress.pending,(state)=>{
    //   state.isLoading=true
    // })
    // .addCase(addAddress.fulfilled,(state,action)=>{
    //   state.isLoading=false,
    //   state.addressList=action?.payload?.address
    // })
    // .addCase(addAddress.rejected,(state)=>{
    //   state.isLoading=false,
    //   state.addressList=[]
    // })
    .addCase(fetchAddress.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(fetchAddress.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.addressList=action?.payload?.address
    })
    .addCase(fetchAddress.rejected,(state)=>{
      state.isLoading=false,
      state.addressList=[]
    })
    // .addCase(updateAddress.pending,(state)=>{
    //   state.isLoading=true
    // })
    // .addCase(updateAddress.fulfilled,(state,action)=>{
    //   state.isLoading=false,
    //   state.addressList=action?.payload?.address
    // })
    // .addCase(updateAddress.rejected,(state)=>{
    //   state.isLoading=false,
    //   state.addressList=[]
    // })
  }
})
export default addressSlice.reducer