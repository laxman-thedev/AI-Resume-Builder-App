import React from "react";
import { Plus, Trash2, FolderIcon, Github, GlobeIcon } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {

    /**
     * Adds a new empty project entry to the form.
     */
    const addProject = () => {
        // Create a new empty project object
        const newProject = {
            name: "",
            type: "",
            description: "",
            live_link: "",
            source_code_link: ""
        };
        // Update the form data with the new project
        onChange([...data, newProject]);
    };

    /**
     * Removes a project entry at the specified index..
     */
    const removeProject = (index) => {
        // Filter out the project at the given index
        const updated = data.filter((_, i) => i !== index);
        // Update the form data
        onChange(updated);
    };

    const updateProject = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <FolderIcon className="size-5" />
                        Projects
                    </h3>
                    <p className="text-sm text-gray-500">Add your projects</p>
                </div>

                {/* Add Project Button */}
                <button
                    onClick={addProject}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

            {/* Empty State */}
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {/* Empty State Icon */}
                    <FolderIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No projects added yet.</p>
                    <p className="text-sm">Click "Add Project" to get started.</p>
                </div>
            ) : (
                <div className="space-y-4 mt-4">
                    {data.map((project, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">

                            {/* Top Row */}
                            {/* Project number and remove button */}
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium">Project #{index + 1}</h4>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            {/* Input for Project Name */}
                            <input
                                value={project.name || ""}
                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                type="text"
                                placeholder="Project Name"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
                            />

                            {/* Input for Project Type */}
                            <input
                                value={project.type || ""}
                                onChange={(e) => updateProject(index, "type", e.target.value)}
                                type="text"
                                placeholder="Project Type (e.g. Web, ML, App)"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full"
                            />

                            {/* Textarea for Project Description */}
                            <textarea
                                value={project.description || ""}
                                onChange={(e) => updateProject(index, "description", e.target.value)}
                                placeholder="Short Project Description"
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full resize-none"
                                rows={3}
                            />
                            {/* Container for project links */}
                            <div className="project-links flex flex-col gap-2">
                                {/* GitHub Link */}
                                <div
                                    className="
                                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                                        border border-gray-300
                                        focus-within:border-blue-400 focus-within:shadow-sm
                                    "
                                >
                                    <Github className="size-4 text-purple-600" />
                                    <input
                                        type="text"
                                        placeholder="Source code link (optional)"
                                        value={project.source_code_link|| ""}
                                        onChange={(e) => updateProject(index, "source_code_link", e.target.value)}
                                        className="
                                            flex-1 text-sm placeholder-gray-400
                                            border-none outline-none
                                            focus:outline-none focus:ring-0 focus:border-none
                                            bg-transparent
                                        "
                                    />
                                </div>

                                {/* Live Link */}
                                <div
                                    className="
                                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                                        border border-gray-300
                                        focus-within:border-blue-400 focus-within:shadow-sm
                                    "
                                >
                                    <GlobeIcon className="size-4 text-blue-600" />
                                    <input
                                        type="text"
                                        placeholder="Live demo link (optional)"
                                        value={project.live_link || ""}
                                        onChange={(e) => updateProject(index, "live_link", e.target.value)}
                                        className="
                                            flex-1 text-sm placeholder-gray-400
                                            border-none outline-none
                                            focus:outline-none focus:ring-0 focus:border-none
                                            bg-transparent
                                        "
                                    />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectForm;
