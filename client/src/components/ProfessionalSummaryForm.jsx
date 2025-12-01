import { Sparkles } from 'lucide-react'
import React from 'react'

const ProfessionalSummaryForm = ({data, onChange, setResumeData}) => {
    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                    <p className='text-sm text-gray-500'>A brief summary of your professional experience and skills.</p>
                </div>

                <button className='flex items-center gap-2 px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                    <Sparkles className='size-4' />
                    AI Enhance
                </button>
            </div>

            <div className='mt-6'>
                <textarea
                    className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
                    placeholder='Type your professional summary here...'
                    value={data || ''}
                    rows={7}
                    onChange={(e) => onChange(e.target.value)}
                />
                <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Tip: Keep it concise and to the point. Use bullet points to highlight your achievements and skills.</p>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm