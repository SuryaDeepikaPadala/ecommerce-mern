import ProductDetailsTile from '@/components/Shop/ProductDetailsTile'
import ShopProductTile from '@/components/Shop/ShopProductTile'
import { Input } from '@/components/ui/input'
import { addProductsToCart, fetchCartProducts } from '@/store/slices/cart.slice'
import { getSearchedProducts, resetSearchedProducts } from '@/store/slices/search.slice'
import { fetchProductDetails } from '@/store/slices/shop.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const SearchProducts = () => {
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { searchedProducts } = useSelector((state) => state.search)
  const { productDetails } = useSelector((state) => state.shop)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (searchKeyword && searchKeyword.trim() !== "" && searchKeyword.length > 3) {
      setSearchParams(new URLSearchParams(`?keyword=${searchKeyword}`))
      dispatch(getSearchedProducts(searchKeyword))
    } else {
      dispatch(resetSearchedProducts())
    }
  }, [searchKeyword])

  const handleShowDetailsPage = (productId) => {
    dispatch(fetchProductDetails(productId)).then((res) => {
      if (res?.payload?.success) {
        console.log(res?.payload?.product)
        setOpen(true)
      }
    })
  }

  const handleAddToCart = (product) => {
    dispatch(addProductsToCart({ userId: user?.id, productId: product._id, quantity: 1 })).then((res) => {
      if (res?.payload?.success) {
        toast("Product added to the cart")
        dispatch(fetchCartProducts(user.id))
        setOpen(false)
      }
    })
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4">
        <Input
          placeholder="Search for products..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e?.target?.value)}
          className="w-full rounded-2xl border border-gray-300 bg-white px-5 py-3 shadow-sm 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {searchedProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchedProducts?.map((product) => (
              <ShopProductTile
                key={product._id}
                product={product}
                handleShowDetailsPage={handleShowDetailsPage}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20">
            <h1 className="text-xl font-semibold text-gray-600 bg-white shadow px-6 py-4 rounded-lg">
              No products found. Try searching something else.
            </h1>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      <ProductDetailsTile
        productDetails={productDetails}
        open={open}
        setOpen={setOpen}
        handleAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default SearchProducts
