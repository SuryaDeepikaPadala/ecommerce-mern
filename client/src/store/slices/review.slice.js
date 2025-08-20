import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  productReviews:[]
}
export const addProductReview=createAsyncThunk("/product/review",
  async({productId,userId,userName,reviewMessage,reviewValue},thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/products/review",{
        productId,userId,userName,reviewMessage,reviewValue
      })
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const getProductReviews=createAsyncThunk("/product/reviews",
  async(productId,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/products/reviews/${productId}`)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const productReviewSlice=createSlice({
  name:"product review",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getProductReviews.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getProductReviews.fulfilled,(state,action)=>{
      state.isLoading=false
      state.productReviews=action?.payload?.productReviews ||[]
    })
    .addCase(getProductReviews.rejected,(state)=>{
      state.isLoading=false,
      state.productReviews=[]
    })
     .addCase(addProductReview.fulfilled, (state, action) => {
      state.isLoading = false;
      // just push the new review into state so UI updates immediately
      state.productReviews = [...state.productReviews, action?.payload?.newReview];
    })
  }
})
export default productReviewSlice.reducer