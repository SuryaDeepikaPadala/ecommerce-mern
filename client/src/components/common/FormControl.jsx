import React from 'react'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

const FormControl = ({ formControls, formData, setFormData, buttonText, onSubmit,isBtnDisabled }) => {
  const renderElement = (control) => {
    let element
    switch (control.componentType) {
      case 'input':
        element = (
          <Input
            type={control.type}
            placeholder={control.placeholder}
            name={control.name}
            value={formData[control.name]}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }}
          />
        )
        break
      case 'select':
        element = (
          <Select
            value={formData[control.name]}
            onValueChange={(value) => {
              setFormData({
                ...formData,
                [control.name]: value,
              })
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {control?.options?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )
        break
      case 'textarea':
        element = (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            value={formData[control.name]}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }}
          />
        )
        break
      default:
        element = (
          <Input
            type={control.type}
            placeholder={control.placeholder}
            name={control.name}
            value={formData[control.name]}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }}
          />
        )
        break
    }
    return element
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-4">
      {formControls?.map((control) => (
        <div key={control.name} className="flex flex-col gap-2">
          <label htmlFor={control.name} className="font-medium text-gray-700">
            {control.label}
          </label>
          {renderElement(control)}
        </div>
      ))}
      <button
        disabled={isBtnDisabled}
        type="submit"
        className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-900 transition"
      >
        {buttonText}
      </button>
    </form>
  )
}

export default FormControl
