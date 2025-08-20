import React, { useEffect, useState } from 'react'
import FormControl from '../common/FormControl'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, fetchAddress, updateAddress } from '@/store/slices/address.slice'
import { toast } from 'sonner'
import AddressTile from './AddressTile'

const Address = ({setSelectedAddress}) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.address)
  const [editId, setEditId] = useState(null)

  const initialState = {
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phNumber: "",
    notes: ""
  }
  const [addressFormData, setAddressFormData] = useState(initialState)
  if(addressList.length>=3 && editId===null)
  {
    setAddressFormData(initialState)
    toast("You can't add more than 3 addresses")
    return
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (editId) {
      dispatch(updateAddress({
        userId: user?.id,
        addressId: editId,
        formData: addressFormData
      })).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAddress(user?.id))
          setEditId(null)
          setAddressFormData(initialState)
          toast("Address updated successfully")
        }
      })
    } else {
      dispatch(addAddress({
        ...addressFormData,
        userId: user.id
      })).then((res) => {
        if (res?.payload?.success) {
          dispatch(fetchAddress(user.id))
          setAddressFormData(initialState)
          toast("Address added successfully")
        }
      })
    }
  }

  const handleDeleteAddress = (getAddress) => {
    dispatch(deleteAddress({ userId: user.id, addressId: getAddress?._id })).then((res) => {
      if (res?.payload?.success) {
        toast("Address deleted successfully")
        dispatch(fetchAddress(user?.id))
      }
    })
  }

  const handleEditAddress = (getAddress) => {
    setEditId(getAddress?._id)
    setAddressFormData({
      ...addressFormData,
      address: getAddress?.address,
      state: getAddress?.state,
      city: getAddress?.city,
      pinCode: getAddress?.pinCode,
      phNumber: getAddress?.phNumber,
      notes: getAddress?.notes
    })
  }
  // console.log(addressList)
  const isFormValid = () => {
    return Object.keys(addressFormData).map((item) => addressFormData[item].trim() !== "").every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAddress(user.id))
  }, [dispatch])

  return (
    <div className="space-y-6">
      {/* Address List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addressList?.map((addressItem) => (
          <AddressTile
            key={addressItem?._id}
            address={addressItem}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-lg font-semibold mb-4">
          {editId ? "Update Address" : "Add New Address"}
        </h1>
        <FormControl
          formControls={addressFormControls}
          formData={addressFormData}
          setFormData={setAddressFormData}
          buttonText={editId ? "Edit" : "Add"}
          onSubmit={handleSubmit}
          isBtnDisabled={!isFormValid()}
        />
      </div>
    </div>
  )
}

export default Address
