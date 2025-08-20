import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:false,
  searchedProducts:[]

}
export const getSearchedProducts=createAsyncThunk("/shop/search",
  async(keyword,thunkAPI)=>{
    try {
      const response=await axios.get(`http://localhost:3000/api/shop/search/${keyword}`)
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const searchSlice=createSlice({
  name:"search",
  initialState,
  reducers:{
    resetSearchedProducts:(state)=>{
      state.searchedProducts=[]
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getSearchedProducts.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(getSearchedProducts.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.searchedProducts=action?.payload?.searchedProducts
    })
    .addCase(getSearchedProducts.rejected,(state)=>{
      state.isLoading=false,
      state.searchedProducts=[]
    })
  }
})
export const {resetSearchedProducts}=searchSlice.actions
export default searchSlice.reducer