import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview, getProductReviews } from "@/store/slices/review.slice";


const ProductDetailsTile = ({
  productDetails,
  open,
  setOpen,
  handleAddToCart,
}) => {
const issaleOn = productDetails?.salePrice > 0;
const [reviewMessage,setReviewMessage]=useState("")
const[rating,setRating]=useState(0)
const dispatch=useDispatch()
const {user}=useSelector((state)=>state.auth)
const {productReviews}=useSelector((state)=>state.review)
const handleAddReview=(e)=>{
 e.preventDefault()
 if(!rating && !reviewMessage)
 {
  
  return
 }
 dispatch(addProductReview({
  productId:productDetails?._id,
  userId:user?.id,
  userName:user?.username,
  reviewMessage,
  reviewValue:rating
 })).then((res)=>{
  if(res?.payload?.success)
  {
    
    dispatch(getProductReviews(productDetails?._id))
    setRating(0)
    setReviewMessage("")
  }
 })

}
console.log(productReviews,"please")
useEffect(() => {
  if (productDetails?._id) {
    dispatch(getProductReviews(productDetails._id));
  }
}, [dispatch, productDetails?._id]);
 const reviewAverage= productReviews.length>0 &&productReviews.reduce((sum,reviewItem)=>sum+Number(reviewItem.reviewValue),0)/productReviews.length
 console.log(reviewAverage)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl w-full rounded-xl p-6 bg-white shadow-xl">
        {/* Title */}
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {productDetails?.title}
          </DialogTitle>
        </DialogHeader>

        {/* Top: Image + Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-4">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className=" h-[160px] w-full object-contain rounded-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            <p className="text-gray-700 text-base mb-3 leading-relaxed">
              {productDetails?.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-3">
              <p
                className={`text-xl font-bold ${
                  issaleOn ? "line-through text-gray-400" : "text-black"
                }`}
              >
                ${productDetails?.price}
              </p>
              {issaleOn && (
                <p className="text-2xl text-green-600 font-extrabold">
                  ${productDetails?.salePrice}
                </p>
              )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1 text-yellow-500 mb-4">
              {[1,2,3,4,5].map((star) => (
                <button  key={star}>
                  <StarIcon className={`w-4 h-4 ${star <= reviewAverage
                  ? "fill-yellow-400 text-yellow-500"
                  : "fill-gray-400 text-gray-400"} `}/>
                </button>
                
              ))}
              <span className="text-gray-600 text-sm ml-2">
                {reviewAverage}
              </span>
            </div>

            {/* Add to Cart Button */}
            {
              productDetails?.totalStock===0? <Button className="w-full py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white cursor-not-allowed opacity-50">
                Out of stock
              </Button>:
              <Button
              onClick={() => handleAddToCart(productDetails)}
              className="w-full py-3 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              Add to Cart
            </Button>
            }
            
          </div>
        </div>

        {/* Reviews */}
       {/* Reviews */}
      {/* Reviews */}
<div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>

  {/* Container with scrollable reviews + fixed input */}
  <div className="flex flex-col max-h-60"> 
    {/* Scrollable Reviews List */}
    <div className="flex-1 overflow-y-auto pr-2 mb-4">
      {productReviews?.length > 0 ? (
        productReviews.map((review) => (
          <div
            key={review._id}
            className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg mb-4"
          >
            <Avatar>
              <AvatarFallback className="bg-gray-200">
                {review?.userName?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{review?.userName}</p>
              <div className="flex items-center text-yellow-500 gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= review?.reviewValue
                        ? "fill-yellow-400 text-yellow-500"
                        : "fill-gray-400 text-gray-400"
                    }`}
                  />
                ))}
                <span className="text-gray-600 text-xs ml-1">
                  ({review?.reviewValue})
                </span>
              </div>
              <p className="text-gray-700 text-sm">{review?.reviewMessage}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>

    {/* Fixed Review Input */}
    <div className="bg-gray-50 p-4 rounded-lg">
      <Label className="block mb-2 text-gray-700 font-medium">
        Write a review
      </Label>

      {/* Star Rating */}
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => setRating(star)}>
            <StarIcon
              className={`w-4 h-4 cursor-pointer transition 
                ${star <= rating
                  ? "fill-yellow-400 text-yellow-500"
                  : "fill-gray-400 text-gray-400"}`}
            />
          </button>
        ))}
      </div>

      {/* Input + Button */}
      <div className="flex gap-2">
        <Input
          name="message"
          placeholder="Write your review..."
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          className="flex-1 rounded-lg"
        />
        <Button
          onClick={handleAddReview}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  </div>
</div>


      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsTile;
