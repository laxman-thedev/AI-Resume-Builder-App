import { Check, Layout } from 'lucide-react'
import React from 'react'

/**
 * TemplateSelector component allows users to choose from different resume templates.
 */
const TemplateSelector = ({ selectedTemplate, onChange }) => {

    // State to control the visibility of the template selection dropdown.
    const [isOpen, setIsOpen] = React.useState(false)

    // Array of available resume templates with their IDs, names, and preview descriptions.
    const templates = [
        {
            id: 'classic',
            name: 'Classic',
            preview: "A classic resume template with a modern design.",
        },
        {
            id: 'modern',
            name: 'Modern',
            preview: "A modern resume template with a clean and minimalist design.",
        },
        {
            id: 'minimal',
            name: 'Minimal',
            preview: "A minimalistic resume template with a clean and simple design.",
        },
        {
            id: 'minimal-image',
            name: 'Minimal Image',
            preview: "A minimalistic resume template with a clean and simple design along image.",
        }
    ]

    return (
        <div className='relative'>
            {/* Button to toggle the template selection dropdown */}
            <button onClick={() => { setIsOpen(!isOpen) }} className='flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} /> <span className='max-sm:hidden'>Template</span>
            </button>
            {/* Template selection dropdown, visible when isOpen is true */}
            {isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                    {/* Map through each template to render its selection option */}
                    {
                        templates.map((template) => (
                            <div key={template.id} onClick={() => {
                                onChange(template.id)
                                setIsOpen(false)
                            }} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? 'bg-blue-100 border-blue-400' : 'border-gray-400 hover:bg-gray-100'}`}>
                                {selectedTemplate === template.id && (
                                    // Checkmark icon to indicate the selected template
                                    <div className='absolute top-2 right-2'>
                                        <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                            <Check className='w-3 h-3 text-white' />
                                        </div>
                                    </div>
                                )}
                                {/* Template name and preview description */}
                                <div className='space-y-1'>
                                    <h4 className='font-medium text-gray-800'>{template.name}</h4>
                                    <div className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default TemplateSelector