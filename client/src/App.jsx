import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AuthLayout from "./components/Layouts/AuthLayout";
import AdminLayout from "./components/Layouts/AdminLayout";

import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import ShopLayout from "./components/Layouts/ShopLayout";
import Products from "./pages/Shop/Products";
import Account from "./pages/Shop/Account";
import Checkout from "./pages/Shop/Checkout";
import AuthCheck from "./components/common/AuthCheck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authCheckUserSlice } from "./store/slices/auth.slice";
import Home from "./pages/Shop/Home";
import { fetchCartProducts } from "./store/slices/cart.slice";
import PaypalReturn from "./pages/Shop/PaypalReturn";
import PaypalSuccess from "./pages/Shop/PaypalSuccess";
import SearchProducts from "./pages/Shop/SearchProducts";

function App() {
  const {isLoading,isAuthenticated,user}=useSelector((state)=>state.auth)
  const{cartItems}=useSelector((state)=>state.cart)
  const dispatch=useDispatch()
 
useEffect(() => {
  dispatch(authCheckUserSlice())
}, [dispatch])

useEffect(() => {
  if (user?.id) {
    dispatch(fetchCartProducts(user?.id))
  }
}, [dispatch])
  // console.log(isAuthenticated,user)
   console.log(cartItems,"cart items")
  console.log(user)
  if(isLoading) return <h1>Loading...</h1>
  return (
    <>
      <Routes>
         <Route
          path="/"
          element={
            <AuthCheck
              isAuthenticated={isAuthenticated}
              role={user?.role}
            ></AuthCheck>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} role={user?.role}>
              <AuthLayout />
            </AuthCheck>
          }
        >
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} role={user?.role}>
              <AdminLayout />
            </AuthCheck>
          }
        >
         
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route
          path="/shop"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} role={user?.role}>
              <ShopLayout />
            </AuthCheck>
          }
        >
          <Route path="products" element={<Products />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="home" element={<Home/>}/>
          <Route path="paypal-return" element={<PaypalReturn/>}/>
          <Route path="paypal-success" element={<PaypalSuccess/>}/>
          <Route path="search" element={<SearchProducts/>}/>
        </Route>
       
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
