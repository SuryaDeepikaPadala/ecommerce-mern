import React, { useEffect, useRef, useState } from 'react'
import { SiCloudinary } from "react-icons/si"
import { CiFileOn } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import axios from 'axios'

const ImageUploader = ({ imageFile, setImageFile,secureUrl,setSecureUrl }) => {
  const imageRef = useRef()
  const [isDragging, setIsDragging] = useState(false)

  const handleOnChange = (e) => {
    const file = e.target?.files
    if (file && file.length > 0) {
      setImageFile(file[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files
    if (file && file.length > 0) {
      setImageFile(file[0])
    }
  }

  const handleRemove = () => {
    setImageFile(null)
    if (imageRef.current) {
      imageRef.current.value = null
    }
  }
  const fileUploadToCloudinary=async()=>{
    const data=new FormData()
    data.append("my-image",imageFile)
    const response=await axios.post("http://localhost:3000/api/admin/products/image",data)
    if(response?.data?.image) setSecureUrl(response.data.image?.secure_url)
    
  }
  useEffect(()=>{
    if(imageFile!==null) fileUploadToCloudinary()
  },[imageFile])
  return (
    <div className="w-full">
      <input
        type="file"
        onChange={handleOnChange}
        className="hidden"
        id="image-element"
        ref={imageRef}
      />

      <label
        htmlFor="image-element"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full h-40 border-2 border-dashed rounded-lg p-4 flex justify-center items-center text-center cursor-pointer transition ${
          isDragging ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-300'
        }`}
      >
        {!imageFile ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <SiCloudinary className="text-4xl" />
            <p className="text-sm">Drag and Drop or click to upload</p>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between bg-gray-100 p-3 rounded-md">
            <div className="flex items-center gap-2 truncate">
              <CiFileOn className="text-2xl text-gray-700" />
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {imageFile?.name}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
        )}
      </label>
    </div>
  )
}

export default ImageUploader
