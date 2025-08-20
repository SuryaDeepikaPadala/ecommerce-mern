import ShopHeader from '@/components/Shop/ShopHeader'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Shop/ShopFooter'

const ShopLayout = () => {
  return (
    <div>
      <div>
        <ShopHeader/>
      </div>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default ShopLayout