import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  cartItems:[],
  cart:null,
  isLoading:false
}
export const addProductsToCart=createAsyncThunk("/cart/add",
  async({userId,productId,quantity},thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/shop/cart",{
        userId,
        productId,
        quantity
      },{withCredentials:true})
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const fetchCartProducts=createAsyncThunk("/cart/get",
  async(userId,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/shop/cart/${userId}`)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const updateCartProductQuantity=createAsyncThunk("/cart/edit",
  async({userId,productId,quantity},thunkAPI)=>{
    try {
      const response=await axios.put("http://localhost:3000/api/shop/cart",{
        userId,
        productId,
        quantity
      },{withCredentials:true})
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const deleteCartProduct=createAsyncThunk("/cart/del",
  async({userId,productId},thunkAPI)=>{
    try {
      const response=await axios.delete(`http://localhost:3000/api/shop/cart/${userId}/${productId}`,{withCredentials:true})
      return response?.data
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const cartProductSlice=createSlice({
  name:'cart',
  initialState,
  reducers:{
    clearCart: (state) => {
    state.cartItems = [];
    state.isLoading = false;
  }

  },
  extraReducers:(builder)=>{
    builder
    .addCase(addProductsToCart.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(addProductsToCart.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.cartItems=action?.payload?.cart?.items,
      state.cart=action?.payload?.cart
    })
    .addCase(addProductsToCart.rejected,(state,action)=>{
      state.isLoading=false,
      state.cartItems=[],
      state.cart=null
    })
    .addCase(fetchCartProducts.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(fetchCartProducts.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.cartItems=action?.payload?.cart?.items,
      state.cart=action?.payload?.cart
    })
    .addCase(fetchCartProducts.rejected,(state,action)=>{
      state.isLoading=false,
      state.cartItems=[],
      state.cart=null
    })
    .addCase(updateCartProductQuantity.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(updateCartProductQuantity.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.cartItems=action?.payload?.cart?.items,
      state.cart=action?.payload?.cart
    })
    .addCase(updateCartProductQuantity.rejected,(state,action)=>{
      state.isLoading=false,
      state.cartItems=[],
      state.cart=null
    })
    .addCase(deleteCartProduct.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(deleteCartProduct.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.cartItems=action?.payload?.cart?.items,
      state.cart=action?.payload?.cart
    })
    .addCase(deleteCartProduct.rejected,(state,action)=>{
      state.isLoading=false,
      state.cartItems=[],
      state.cart=null
    })
  }
})
export default cartProductSlice.reducer
export const { clearCart } = cartProductSlice.actions;
