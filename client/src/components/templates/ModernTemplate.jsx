import { Mail, Phone, MapPin, Linkedin, Globe, Github, GlobeIcon } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    // Ensure links always open correctly
    const formatLink = (link) => {
        if (!link) return "";
        return link.startsWith("http") ? link : `https://${link}`;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800">

            {/* Header */}
            <header
                className="p-8 text-white print-header"
                style={{ backgroundColor: accentColor, "--print-accent": accentColor }}
            >
                <h1 className="text-4xl font-light mb-3">
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-2">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}

                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-2">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}

                    {data.personal_info?.location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}

                    {data.personal_info?.linkedin && (
                        <a
                            href={formatLink(data.personal_info.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Linkedin className="size-4" />
                            <span className="text-xs break-all">
                                {data.personal_info.linkedin.replace("https://www.", "")}
                            </span>
                        </a>
                    )}

                    {data.personal_info?.website && (
                        <a
                            href={formatLink(data.personal_info.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <Globe className="size-4" />
                            <span className="text-xs break-all">
                                {data.personal_info.website.replace("https://", "")}
                            </span>
                        </a>
                    )}
                </div>
            </header>

            {/* Body */}
            <div className="p-8">

                {/* Summary */}
                {data.professional_summary && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                            Professional Summary
                        </h2>
                        <p className="text-gray-700">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
                            Experience
                        </h2>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="pl-6 border-l border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-medium">{exp.position}</h3>
                                            <p style={{ color: accentColor }}>{exp.company}</p>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                                            {formatDate(exp.start_date)} –{" "}
                                            {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>

                                    {exp.description && (
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                            Projects
                        </h2>

                        <div className="space-y-6">
                            {data.project.map((p, index) => (
                                <div
                                    key={index}
                                    className="pl-6 border-l"
                                    style={{ borderColor: accentColor }}
                                >
                                    <h3 className="text-lg font-medium">{p.name}</h3>

                                    {p.description && (
                                        <p className="text-gray-700 text-sm mt-2">
                                            {p.description}
                                        </p>
                                    )}

                                    {/* Project Links (text-only, clickable) */}
                                    <div className="flex gap-4 text-sm mt-3 print:flex-col">
                                        {p.source_code_link && (
                                            <a
                                                href={formatLink(p.source_code_link)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline cursor-pointer"
                                            >
                                                Source code
                                            </a>
                                        )}

                                        {p.live_link && (
                                            <a
                                                href={formatLink(p.live_link)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline cursor-pointer"
                                            >
                                                Live demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid sm:grid-cols-2 gap-8">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                                Education
                            </h2>

                            {data.education.map((edu, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p style={{ color: accentColor }}>{edu.institution}</p>
                                    <div className="text-sm text-gray-600 flex justify-between">
                                        <span>{formatDate(edu.graduation_date)}</span>
                                        {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && (
                        <section>
                            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm text-white rounded-full"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;