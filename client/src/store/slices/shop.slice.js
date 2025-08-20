
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  FilteredProducts:[],
  productDetails:null
}
export const fetchFilteredProducts=createAsyncThunk("/shop/products",
  async({filterParams,sortParams},thunkAPI)=>{
    try {
      const queryString=new URLSearchParams({
        ...filterParams,
        sort:sortParams
      }).toString()
      const response=await axios.get(`http://localhost:3000/api/shop/products?${queryString}`)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const fetchProductDetails=createAsyncThunk("/shop/product",
  async(id,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/shop/product/${id}`)
      return response?.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const shopProductSlice=createSlice({
  name:"shop",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchFilteredProducts.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(fetchFilteredProducts.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.FilteredProducts=action?.payload?.products
    })
    .addCase(fetchFilteredProducts.rejected,(state,action)=>{
      state.isLoading=false,
      state.FilteredProducts=[]
    })
    .addCase(fetchProductDetails.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(fetchProductDetails.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.productDetails=action?.payload?.product
    })
    .addCase(fetchProductDetails.rejected,(state,action)=>{
      state.isLoading=false,
      state.productDetails=null
    })
  }
})
export default shopProductSlice.reducer