import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({selectedColor, onChange}) => {
    
    const colors = [
        {name: "Blue", value: "#3B82F6"},
        {name: "Green", value: "#2ECC71"},
        {name: "Red", value: "#E74C3C"},
        {name: "Orange", value: "#FF9800"},
        {name: "Yellow", value: "#F1C40F"},
        {name: "Purple", value: "#9B59B6"},
        {name: "Pink", value: "#E91E63"},
        {name: "Brown", value: "#9C27B0"},
        {name: "Grey", value: "#9E9E9E"},
        {name: "Black", value: "#000000"},
    ]

    // State to control the visibility of the color picker dropdown.
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div className='relative'>
            {/* Button to toggle the color picker dropdown */}
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-purple-600 bg-linear-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Palette size={16} /> <span className='max-sm:hidden'>Accent</span>
            </button>
            {/* Color picker dropdown, visible when isOpen is true */}
            {
                isOpen && (
                    <div className='grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                        {/* Map through each color to render its selection option */}
                        {colors.map((color) => (
                            <div key={color.value} className='relative cursor-pointer group flex flex-col' onClick={()=>{onChange(color.value); setIsOpen(false)}} >
                                {/* Color swatch */}
                                <div className={`w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors`} style={{backgroundColor: color.value}} >

                                </div>
                                {/* Checkmark icon to indicate the selected color */}
                                {selectedColor === color.value && (
                                    <div className='absolute top-0 left-0 right-0 bottom-4 flex items-center justify-center'>
                                        <Check className='size-5 text-white' />
                                    </div>
                                )}
                                <p className='text-xs text-center mt-1 text-gray-600' >{color.name}</p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default ColorPicker