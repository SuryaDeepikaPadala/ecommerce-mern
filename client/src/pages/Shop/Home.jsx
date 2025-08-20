import React, { useEffect, useState } from 'react'
import hero1 from "../../assets/asset-1.png"
import hero2 from "../../assets/asset-2.png"
import hero3 from "../../assets/asset-3.png"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchFilteredProducts } from '@/store/slices/shop.slice'
import { brand, category } from '@/config'

const Home = () => {
  const [imgSlider, setImageSlider] = useState(0)
  const images = [hero1, hero2, hero3]
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(() => {
      setImageSlider((prev) => (prev + 1) % images.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [images])

  const handleCategoryFilter = (id, categoryType) => {
    sessionStorage.removeItem("filters")
    const categoryFilters = {
      [categoryType]: [id]
    }
    console.log("Setting filters:", categoryFilters)
    sessionStorage.setItem("filters", JSON.stringify(categoryFilters))
    navigate("/shop/products")
  }

  useEffect(() => {
    dispatch(fetchFilteredProducts({
      fetchParams: {},
      sortParams: "price:lowtohigh"
    }))
  }, [dispatch])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src={images[imgSlider]}
          alt={`slide-${imgSlider}`}
          className="w-full h-[450px] transition-all duration-500 object-fill"
        />

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <button
            onClick={() =>
              setImageSlider((prev) => (prev - 1 + images.length) % images.length)
            }
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() =>
              setImageSlider((prev) => (prev + 1) % images.length)
            }
            className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Category Section */}
      <div className="mt-8 m-6">
        <h1 className="text-2xl font-bold mb-4">Shop by Category</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {category?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryFilter(item?.id, "category")}
              className="cursor-pointer group border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={item?.src}
                  alt={item?.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-center py-2 font-medium">{item.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="mt-12 m-6">
        <h1 className="text-2xl font-bold mb-4">Shop by Brand</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {brand?.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryFilter(item?.id, "brand")}
              className="cursor-pointer group border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white p-4 flex items-center justify-center"
            >
              <img
                src={item?.src}
                alt={item?.label}
                className="max-w-full max-h-16 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
