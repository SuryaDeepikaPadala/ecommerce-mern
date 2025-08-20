import React from 'react'

const AddressTile = ({ address, handleDeleteAddress, handleEditAddress ,setSelectedAddress}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between" onClick={setSelectedAddress?()=>setSelectedAddress(address):null}>
      <div className="space-y-1 text-gray-700">
        <p><span className="font-semibold">State:</span> {address?.state}</p>
        <p><span className="font-semibold">City:</span> {address?.city}</p>
        <p><span className="font-semibold">Pincode:</span> {address?.pinCode}</p>
        <p><span className="font-semibold">Address:</span> {address?.address}</p>
        <p><span className="font-semibold">Contact:</span> {address?.phNumber}</p>
        <p><span className="font-semibold">Notes:</span> {address?.notes}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleEditAddress(address)}
          className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 w-14"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteAddress(address)}
          className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 w-14"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AddressTile
