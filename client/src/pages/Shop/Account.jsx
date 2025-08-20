import React from 'react'
import Hero from "../../assets/Hero.jpg"
import { Tabs, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import { TabsList } from '@radix-ui/react-tabs'
import Address from '@/components/Shop/Address'
import Orders from '@/components/Shop/Orders'

const Account = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-60 md:h-72 lg:h-80">
        <img
          src={Hero}
          alt="hero"
          className="w-full h-full object-cover rounded-b-2xl shadow-md"
        />
        <div className="absolute bottom-4 left-6 bg-black/50 text-white px-6 py-2 rounded-lg backdrop-blur-md">
         
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-5xl mx-auto p-6">
        <Tabs defaultValue="address" className="w-full">
          <TabsList className="flex gap-4 border-b border-gray-300 pb-2">
            <TabsTrigger
              value="orders"
              className="px-4 py-2 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="px-4 py-2 rounded-lg data-[state=active]:bg-black data-[state=active]:text-white"
            >
              Address
            </TabsTrigger>
          </TabsList>

          <TabsContent value="address" className="pt-4">
            <Address />
          </TabsContent>
          <TabsContent value="orders" className="pt-4">
            <Orders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Account
