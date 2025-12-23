/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, XIcon } from 'lucide-react';import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../configs/api.js';
import toast from 'react-hot-toast';
import pdfToText from 'react-pdftotext';

/**
 * Dashboard component displays a user's resumes, allows creating new ones,
 * uploading existing PDFs, editing resume titles, and deleting resumes.
 */
const Dashboard = () => {

    // Get authentication token from Redux store
    const { token } = useSelector(state => state.auth)

    // Define an array of colors for resume cards
    const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
    // State to store all resumes fetched from the API
    const [allResumes, setAllResumes] = useState([])
    // State to control the visibility of the "Create Resume" modal
    const [showCreateResume, setShowCreateResume] = useState(false)
    // State to control the visibility of the "Upload Resume" modal
    const [showUploadResume, setShowUploadResume] = useState(false)
    // State to store the title for new/edited resumes
    const [title, setTitle] = useState('')
    // State to store the selected PDF file for upload
    const [resume, setResume] = useState(null)
    // State to store the ID of the resume being edited
    const [editResumeId, setEditResumeId] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    /**
     * Fetches all resumes for the authenticated user from the API.
     * Updates the 'allResumes' state with the fetched data.
     */
    const loadAllResumes = async () => {
        try {
            const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
            setAllResumes(data.resumes)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    
    /**
     * Handles the creation of a new resume.
     * Sends a POST request to the API with the resume title, then navigates to the builder.
     */
    const createResume = async (e) => {
        try {
            e.preventDefault()
            const { data } = await api.post(`/api/resumes/create`, { title }, { headers: { Authorization: token } })
            setAllResumes([...allResumes, data.resume])
            setTitle('')
            setShowCreateResume(false)
            navigate(`/app/builder/${data.resume._id}`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    
    /**
     * Handles the upload of an existing resume (PDF).
     * Extracts text from the PDF, sends it to the AI API, and navigates to the builder.
     */
    const uploadResume = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const resumeText = await pdfToText(resume)
            const { data } = await api.post(`/api/ai/upload-resume`, { resumeText, title }, { headers: { Authorization: token } })
            setTitle('')
            setResume(null)
            setShowUploadResume(false)
            navigate(`/app/builder/${data.resumeId}`)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
        setIsLoading(false)
    }
    
    /**
     * Handles editing the title of an existing resume.
     * Sends a PUT request to the API to update the resume's title.
     */
    const editTitle = async (e) => {
        try {
            e.preventDefault()
            const { data } = await api.put(`/api/resumes/update`, {resumeId: editResumeId, resumeData:{title}}, { headers: { Authorization: token } })
            setAllResumes(allResumes.map(resume => resume._id === editResumeId ? {...resume, title} : resume))
            setTitle('')
            setEditResumeId('')
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }
    
    /**
     * Handles the deletion of a resume.
     * Prompts for confirmation, then sends a DELETE request to the API.
     */
    const deleteResume = async (resumeId) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this resume?')
            if (confirm) {
                const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
                setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }

    }
    
    // Load all resumes when the component mounts
    useEffect(() => {
        loadAllResumes()
    }, [])

    return (
        <div>
            {/* Main content wrapper */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Welcome message (hidden on larger screens) */}
                <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Laxman</p>

                {/* Action buttons: Create Resume and Upload Existing */}
                <div className='flex gap-4'>
                    {/* Create Resume button */}
                    <button onClick={() => { setShowCreateResume(true) }} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                        <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
                        <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
                    </button>
                    <button onClick={() => { setShowUploadResume(true) }} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                        <UploadCloud className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full' />
                        <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
                    </button>
                </div>

                {/* Separator line */}
                <hr className='border-slate-300 my-6 sm:w-[305px]' />

                {/* Grid of existing resumes */}
                <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
                    {allResumes.map((resume, index) => {
                        // Determine base color for the resume card
                        const baseColor = colors[index % colors.length]
                        return (
                            // Resume card button
                            <button onClick={() => { navigate(`/app/builder/${resume._id}`) }} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>
                                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>{resume.title}</p>
                                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                                {/* Action icons (Trash, Pencil) for each resume */}
                                <div onClick={(e) => { e.stopPropagation() }} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                                    <TrashIcon onClick={() => { deleteResume(resume._id) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                                    <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                                </div>

                            </button>
                        )
                    })}
                </div>

                {/* Create Resume Modal */}
                {
                    showCreateResume && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-10"
                            onClick={() => setShowCreateResume(false)}
                        >
                            <form
                                onSubmit={createResume}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    // Close modal and clear title on click
                                    onClick={() => {
                                        setShowCreateResume(false);
                                        setTitle("");
                                    }}
                                />

                                <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mb-4 border focus:border-green-600 focus:ring-1 focus:ring-green-600 rounded"
                                    placeholder="Enter resume title"
                                    required
                                    // Bind input value to 'title' state
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                >
                                    Create Resume
                                </button>
                            </form>
                        </div>
                    )
                }

                {/* Upload Resume Modal */}
                {
                    showUploadResume && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-10"
                            onClick={() => setShowUploadResume(false)}
                        >
                            <form
                                onSubmit={uploadResume}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    // Close modal and clear states on click
                                    onClick={() => {
                                        setShowUploadResume(false);
                                        setTitle("");
                                        setResume(null);
                                    }}
                                />

                                <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mb-4 border focus:border-green-600 focus:ring-1 focus:ring-green-600 rounded"
                                    placeholder="Enter resume title"
                                    required
                                    // Bind input value to 'title' state
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <div>
                                    <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                                        {/* File input area */}
                                        Select resume file
                                        <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                                            {resume ? (
                                                <p className='text-green-700'>{resume.name}</p>
                                            ) :
                                                <>
                                                    <UploadCloud className='size-14 stroke-1' />
                                                    <p>Upload resume</p>
                                                </>
                                            }
                                        </div>
                                    </label>
                                    {/* Hidden file input */}
                                    <input type="file" id='resume-input' accept='.pdf' hidden onChange={(e) => { setResume(e.target.files[0]) }} />
                                </div>

                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
                                    {isLoading ? "Uploading..." : "Upload Resume"}
                                </button>
                            </form>
                        </div>
                    )
                }

                {/* Edit Resume Title Modal */}
                {
                    editResumeId && (
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-10"
                            onClick={() => setEditResumeId('')}
                        >
                            <form
                                onSubmit={editTitle}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-slate-50 shadow-md rounded-lg w-full max-w-sm p-6"
                            >
                                <XIcon
                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    // Close modal and clear title on click
                                    onClick={() => {
                                        setEditResumeId('');
                                        setTitle("");
                                    }}
                                />

                                <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mb-4 border focus:border-green-600 focus:ring-1 focus:ring-green-600 rounded"
                                    placeholder="Enter resume title"
                                    required
                                    // Bind input value to 'title' state
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <button
                                    type="submit"
                                    className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard