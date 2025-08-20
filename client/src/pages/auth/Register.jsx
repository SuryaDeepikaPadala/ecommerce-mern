import FormControl from '@/components/common/FormControl'
import { registerFormControls } from '@/config'
import { registerUserSlice } from '@/store/slices/auth.slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Register = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
  }
  const [registerFormData, setRegisterFormData] = useState(initialState)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUserSlice(registerFormData)).then((res)=>{
      if(res?.payload?.success)
      {
        
        toast(res?.payload?.message)
        navigate("/auth/login")
      }
      else{
       
        console.log(res?.payload?.message);
      }
    })
  }

  return (
    <div className="p-6">
      <p className='text-xl font-bold mb-2'>
      Already have an account?

      <Link to="/auth/login" className="text-blue-600 hover:underline"> Sign In</Link>
      </p>
      <FormControl
        formControls={registerFormControls}
        formData={registerFormData}
        setFormData={setRegisterFormData}
        buttonText="Sign Up"
        onSubmit={onSubmit}
        isBtnDisabled={false}
      />
    </div>
  )
}

export default Register
