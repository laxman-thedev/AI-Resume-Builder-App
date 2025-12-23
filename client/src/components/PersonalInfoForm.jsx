import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

/**
 * PersonalInfoForm component for collecting and displaying personal information.
 * It includes fields for full name, email, phone, location, profession, LinkedIn, and personal website.
 * It also allows users to upload a profile image and toggle background removal for the image.
 */
const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

    // Handles changes to input fields and updates the parent component's state.
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    // Defines the structure and properties of each input field.
    const fields = [
        { key: 'full_name', label: 'Full Name', type: 'text', icon: User, required: true },
        { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
        { key: 'phone', label: 'Phone Number', type: 'tel', icon: Phone },
        { key: 'location', label: 'Location', type: 'text', icon: MapPin },
        { key: 'profession', label: 'City', type: 'text', icon: BriefcaseBusiness },
        { key: 'linkedin', label: 'LinkedIn Profile', type: 'url', icon: Linkedin },
        { key: 'website', label: 'Personal Website', type: 'url', icon: Globe },
    ]

    return (
        <div>
            {/* Section Header */}
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get started with the personal information</p>
            <div className='flex items-center gap-2'>
                {/* Image Upload Section */}
                <label>
                    {
                        // Display uploaded image or a placeholder icon
                        data.image ? (
                            <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user_image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
                        ) : (
                            <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                                <User className='size-10 p-2.5 border rounded-full' />
                                {/* Text for image upload */}
                                upload user image
                            </div>
                        )
                    }
                    <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e) => handleChange('image', e.target.files[0])} />
                </label>
                {
                    // Show "Remove Background" toggle only if an image object is present (i.e., newly uploaded)
                    typeof data.image === 'object' && (
                        <div className='flex flex-col gap-1 pl-4 text-sm'>
                            <p>Remove Background</p>
                            {/* Toggle switch for background removal */}
                            <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                                <input type="checkbox" checked={removeBackground} onChange={() => setRemoveBackground(prev => !prev)} className='sr-only peer' />
                                <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'>
                                    {/* Visual representation of the toggle switch track */}
                                </div>
                                <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'>

                                </span>
                            </label>
                        </div>
                    )
                }
            </div>

            <div>
                {/* Render input fields dynamically based on the 'fields' array */}
                {
                    fields.map((field) => {
                        const Icon = field.icon;
                        return (
                            <div key={field.key} className='space-y-1 mt-5'>
                                {/* Label for each input field with an icon */}

                                <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                                    <Icon className='size-4' />
                                    {field.label}
                                    {field.required && <span className='text-red-500'>*</span>}
                                </label>

                                {/* Input element */}
                                <input
                                    type={field.type}
                                    value={data[field.key] || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    required={field.required}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default PersonalInfoForm