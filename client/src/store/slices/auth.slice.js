import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
  isLoading:true,
  user:null,
  isAuthenticated:false
}
export const registerUserSlice=createAsyncThunk("auth/register",
  async (formData,thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/user/register",formData,{
      withCredentials:true
    })
    
    return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
    
  }
)
export const loginUserSlice=createAsyncThunk("/auth/login",
  async (formData,thunkAPI)=>{
    try {
      const response=await axios.post("http://localhost:3000/api/user/login",formData,{
        withCredentials:true
      })
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const logoutUserSlice=createAsyncThunk("/auth/logout",
  async()=>{
    try {
      const response=await axios.get("http://localhost:3000/api/user/logout",
        {
          withCredentials:true
        }
      )
      response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
export const authCheckUserSlice=createAsyncThunk("/auth-check/user",
  async(thunkAPI)=>{
    try {
      const response=await axios.get("http://localhost:3000/api/user/profile",{
        withCredentials:true
      })
      return response?.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data)
    }
  }
)
const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(registerUserSlice.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(registerUserSlice.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.isAuthenticated=false,
      state.user=null
    })
    .addCase(registerUserSlice.rejected,(state)=>{
       state.isLoading=false,
      state.isAuthenticated=false,
      state.user=null
    })
    .addCase(loginUserSlice.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(loginUserSlice.fulfilled,(state,action)=>{
      state.isLoading=false,
     state.isAuthenticated=true,
      state.user=action?.payload?.user
    })
    .addCase(loginUserSlice.rejected,(state,action)=>{
      state.isLoading=false,
      state.isAuthenticated=false,
      state.user=null
    })
    .addCase(authCheckUserSlice.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(authCheckUserSlice.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.isAuthenticated=true,
      state.user=action?.payload?.user
    })
    .addCase(authCheckUserSlice.rejected,(state,action)=>{
      state.isLoading=false;
      state.isAuthenticated=false;
      state.user=null
    })
    .addCase(logoutUserSlice.pending,(state)=>{
      state.isLoading=true
    })
    .addCase(logoutUserSlice.fulfilled,(state,action)=>{
      state.isLoading=false,
      state.isAuthenticated=false,
      state.user=null
    })
  }
})
export default authSlice.reducer