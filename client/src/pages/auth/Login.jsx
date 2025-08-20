import FormControl from '@/components/common/FormControl'
import { loginFormControls } from '@/config'
import { loginUserSlice } from '@/store/slices/auth.slice'
import { clearCart, fetchCartProducts } from '@/store/slices/cart.slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [loginFormData, setLoginFormData] = useState(initialState)
  const dispatch=useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUserSlice(loginFormData)).then((res)=>{
      if(res?.payload?.success)
      {
        
        toast(res?.payload?.message)
        dispatch(clearCart())
        dispatch(fetchCartProducts(res?.payload?.user?.id))
      }
      else{
        console.log(res?.payload?.message)
      }
    })
  }

  return (
    <div className="p-6">
      <p className="text-xl font-bold mb-2">

      Don't have an account?
      <Link to="/auth/register" className="text-blue-600 hover:underline inline"> Sign Up</Link>
      </p>
      <FormControl
        formControls={loginFormControls}
        formData={loginFormData}
        setFormData={setLoginFormData}
        buttonText="Sign In"
        onSubmit={onSubmit}
        isBtnDisabled={false}
      />
    </div>
  )
}

export default Login
