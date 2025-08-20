import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  products:[]
}
export const addProduct=createAsyncThunk("/product/add",
  async(formData,thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/admin/products",formData)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const fetchProducts=createAsyncThunk("/products",
  async(thunkAPI)=>{
    try {
      const response=await axios.get("http://localhost:3000/api/admin/products")
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const updateProduct=createAsyncThunk("product/edit",
  async({id,formData},thunkAPI)=>{
    try {
      const response=await axios.put(`http://localhost:3000/api/admin/products/${id}`,formData)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const deleteProduct=createAsyncThunk("/product/del",
  async(id,thunkAPI)=>{
    try {
      const response=await axios.delete(`http://localhost:3000/api/admin/products/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const productSlice=createSlice({
  name:'product',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
   builder
   .addCase(fetchProducts.pending,(state)=>{
    state.isLoading=true
   })
   .addCase(fetchProducts.fulfilled,(state,action)=>{
    state.isLoading=false,
    state.products=action?.payload?.products
   })
   .addCase(fetchProducts.rejected,(state,action)=>{
    state.isLoading=false,
    state.products=[]
   })
  }
})
export default productSlice.reducer