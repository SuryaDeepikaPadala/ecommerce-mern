import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const AuthCheck = ({children,isAuthenticated,role}) => {
  const location=useLocation()
if (location.pathname==="/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (role === "admin") {
        return <Navigate to="/admin/products" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }
  if(!isAuthenticated && !location.pathname.startsWith("/auth"))
  {
      
      return <Navigate to={"/auth/login"}/>
  }
  if(isAuthenticated && location.pathname.startsWith("/auth"))
  {
    if(role==="admin")
    {
      
       return <Navigate to={"/admin/products"}/>
    }
    else{
      return <Navigate to={"/shop/home"}/>
    }
  }
  if(isAuthenticated && role==="user" && location.pathname.startsWith("/admin"))
  {
    return <Navigate to={"/shop/home"}/>
  }
  if(isAuthenticated && role==="admin" && location.pathname.startsWith("/shop"))
  {
      return <Navigate to={"/admin/products"}/>
  }
  return children
    
  
}

export default AuthCheck