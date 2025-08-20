import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./slices/auth.slice"
import productSliceReducer from "./slices/product.slice"
import filteredProductSliceReducer from "./slices/shop.slice"
import cartProductsSliceReducer from "./slices/cart.slice"
import addressSliceReducer from "./slices/address.slice"
import shopOrderSliceReducer from "./slices/order.slice"
import adminOrderSliceReducer from "./slices/admin.order.slice"
import searchSliceReducer from "./slices/search.slice"
import productReviewSliceReducer from "./slices/review.slice"
const store=configureStore({
  reducer:{
    auth:authSliceReducer,
    products:productSliceReducer,
    shop:filteredProductSliceReducer,
    cart:cartProductsSliceReducer,
    address:addressSliceReducer,
    order:shopOrderSliceReducer,
    adminOrder:adminOrderSliceReducer,
    search:searchSliceReducer,
    review:productReviewSliceReducer
  }
})
export default store