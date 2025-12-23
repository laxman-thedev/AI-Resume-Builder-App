/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User, Save } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast';

/**
 * ResumeBuilder component allows users to create, edit, and manage their resumes.
 * It provides a multi-step form for entering resume details and a real-time preview.
 * Users can select templates, customize colors, and save their resumes.
 */
const ResumeBuilder = () => {

    // Get resumeId from URL parameters
    const { resumeId } = useParams()
    // Get authentication token from Redux store
    const {token} = useSelector(state => state.auth)

    // State to hold all resume data, initialized with default values.
    // This structure mirrors the backend resume schema.
    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: '',
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: 'classic',
        accent_color: '#3B82F6',
        public: false
    })

    /**
 * Fetches existing resume data from the API based on resumeId and updates the state.
 */
    const loadExistingResume = async () => {
        try {
            const {data} = await api.get(`/api/resumes/get/${resumeId}`, {headers: {Authorization: token}})
            if(data.resume) {
                setResumeData(data.resume)
                document.title = `${data.resume.title} - Resume Builder`
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // State to manage the currently active section of the form (e.g., Personal Info, Experience).
    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    // State to control whether to remove the background from an uploaded profile image.
    const [removeBackground, setRemoveBackground] = useState(false)


    const sections = [
        { id: "personal_info", name: "Personal Info", icon: User },
        { id: "professional_summary", name: "Professional Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "project", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles }
    ]

    // Get the currently active section object based on activeSectionIndex.
    const activeSection = sections[activeSectionIndex]

    // Load existing resume data when the component mounts.
    useEffect(() => {
        loadExistingResume()
    }, []) // Empty dependency array ensures this runs only once on mount

    useEffect(() => {
        // Any side effects related to resumeData changes can go here
    }, [])

    const changeResumeVisibility = async () => {
        try {
            const formData = new FormData();
            formData.append('resumeId', resumeId);
            formData.append('resumeData', JSON.stringify({public: !resumeData.public}));
            const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

            setResumeData({...resumeData, public: !resumeData.public})
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume data", error);
        }
    }
    /**
 * Handles sharing the public resume URL using the Web Share API.
 * Provides a fallback alert if the API is not supported.
 */
    const handleShare = () => {
        const frontendUrl = window.location.href.split('/app')[0];
        const resumeUrl = `${frontendUrl}/view/${resumeId}`;

        if (navigator.share) {
            navigator.share({
                url: resumeUrl,
                text: 'My Resume'
            })
        }
        else{
            alert('Your browser does not support the "navigator.share" function. Please use a different browser.')
        }
    }
    /**
 * Triggers the browser's print dialog to download the resume as a PDF.
 */
    const downloadResume = () => {
        window.print();
    }
    /**
 * Saves the current resume data to the backend. Handles image uploads and background removal.
 */
    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData)

            // remove image from resumeData
            if(typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image
            }

            const formData = new FormData();
            formData.append('resumeId', resumeId);
            formData.append('resumeData', JSON.stringify(updatedResumeData));
            removeBackground && formData.append('removeBackground', "yes");
            typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image);
            const {data} = await api.put('/api/resumes/update', formData, {headers: {Authorization: token}})

            setResumeData(data.resume)
            toast.success(data.message)
        } catch (error) {
            console.error("Error saving resume data", error);
        }
    }

    return (
        <div>
            {/* Back to Dashboard Link */}
            <div className='max-w-7xl mx-auto px-4 py-6'>
                {/* Link to navigate back to the dashboard */}
                <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
                    <ArrowLeftIcon className='size-4' /> Back to Dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Panel Form */}
                <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
                        {/* progress bar using activeSectionIndex */}
                        {/* Background progress bar track */}
                        <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
                        {/* Dynamic progress bar indicating current section */}
                        <hr
                            className='absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to-green-600 border-none transition-all duration-500'
                            style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }}
                        />


                        {/* Section Navigation */}
                        <div className='flex justify-between items-center mb-6  border-gray-300 py-1'>

                            <div className='flex items-center gap-2'>
                                <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData((prev => ({ ...prev, template: template })))} />

                                <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev) => ({ ...prev, accent_color: color }))} />
                            </div> {/* End of Template and Color Pickers */}

                            <div className='flex items-center'>

                                {activeSectionIndex !== 0 && (
                                    <button
                                        onClick={() =>
                                            setActiveSectionIndex(prevIndex => Math.max(prevIndex - 1, 0))
                                        }
                                        className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                                        disabled={activeSectionIndex === 0}
                                    >
                                        <ChevronLeft className='size-4' /> Previous
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        setActiveSectionIndex(prevIndex => Math.min(prevIndex + 1, sections.length - 1))
                                    }
                                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 ? 'opacity-50' : ''}`}
                                    disabled={activeSectionIndex === sections.length - 1}
                                >
                                    <ChevronRight className='size-4' /> Next
                                </button>

                            </div> {/* End of Navigation Buttons */}
                        </div>

                        {/* Form content */}
                        <div className='space-y-6'>
                            {
                                activeSection.id === 'personal_info' && (
                                    <PersonalInfoForm
                                        data={resumeData.personal_info}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))}
                                        removeBackground={removeBackground}
                                        setRemoveBackground={setRemoveBackground}
                                    />
                                )
                            }
                            {
                                activeSection.id === 'professional_summary' && (
                                    <ProfessionalSummaryForm
                                        data={resumeData.professional_summary}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))}
                                        setResumeData={setResumeData}
                                    />
                                )
                            }
                            {
                                activeSection.id === 'experience' && (
                                    <ExperienceForm
                                        data={resumeData.experience}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))}
                                    />
                                )
                            }
                            {
                                activeSection.id === 'education' && (
                                    <EducationForm
                                        data={resumeData.education}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))}
                                    />
                                )
                            }
                            {
                                activeSection.id === 'project' && (
                                    <ProjectForm
                                        data={resumeData.project}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))}
                                    />
                                )
                            }
                            {
                                activeSection.id === 'skills' && (
                                    <SkillsForm
                                        data={resumeData.skills}
                                        onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))}
                                    />
                                )
                            }
                        </div> {/* End of Form Sections */}
                        {/* Save Changes Button */}
                        <button onClick={()=>{toast.promise(saveResume(), {loading: 'Saving...', success: 'Resume saved!', error: 'Failed to save resume.'})}} className='flex items-center gap-2 bg-linear-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                            <Save className='size-4' /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Right Panel Form */}
                <div className='lg:col-span-7 max-lg:mt-6'>
                    <div className='relative w-full'>
                        {/* Action Buttons for Resume Preview */}
                        <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                            {/* Share Button (visible if resume is public) */}
                            {resumeData.public && (
                                <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                                    <Share2Icon className='size-4' /> Share
                                </button>
                            )}
                            {/* Toggle Public/Private Visibility Button */}
                            <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-linear-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors'>
                                {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                                {resumeData.public ? 'Public' : 'Private'}
                            </button>
                            {/* Download Button */}
                            <button onClick={downloadResume} className='flex items-center p-2 px-6 gap-2 text-xs bg-linear-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                                <DownloadIcon className='size-4' /> Download
                            </button>
                        </div> {/* End of Action Buttons */}
                    </div>

                    {/* --- resume preview --- */}
                    <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />

                </div>
            </div>
        </div>

    )
}

export default ResumeBuilder