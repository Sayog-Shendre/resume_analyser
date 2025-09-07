
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Star,
    User,
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe,
    Briefcase,
    GraduationCap,
    Code,
    Award,
    Lightbulb,
    TrendingUp,
    ExternalLink
} from "lucide-react";

export default function AnalysisResults({ resume }) {
    const getRatingColor = (rating) => {
        if (rating >= 8) return "text-green-600";
        if (rating >= 6) return "text-yellow-600";
        return "text-red-600";
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "bg-red-100 text-red-800 border-red-200";
            case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low": return "bg-green-100 text-green-800 border-green-200";
            default: return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Overall Rating */}
            <Card className="bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-700 text-white shadow-xl">
                <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-0">
                        <div className="text-center md:text-left">
                            <h2 className="text-xl md:text-2xl font-bold mb-2">Overall Resume Score</h2>
                            <p className="text-indigo-100 text-sm md:text-base">Comprehensive analysis of your resume</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2">{resume.overall_rating}/10</div>
                            <div className="flex items-center justify-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 md:w-5 h-4 md:h-5 ${i < Math.floor(resume.overall_rating / 2)
                                                ? 'text-yellow-300 fill-yellow-300'
                                                : 'text-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Category Ratings */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <TrendingUp className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                        Category Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {Object.entries(resume.category_ratings || {}).map(([category, rating]) => (
                            <div key={category} className="text-center">
                                <div className="text-xl md:text-2xl font-bold mb-1 md:mb-2" style={{ color: getRatingColor(rating) }}>
                                    {rating}/10
                                </div>
                                <div className="text-xs md:text-sm font-medium text-slate-600 capitalize mb-1 md:mb-2">
                                    {category}
                                </div>
                                <Progress
                                    value={rating * 10}
                                    className="h-1.5 md:h-2"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                {/* Contact Information */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <User className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
                        {resume.contact_info?.name && (
                            <div className="flex items-center gap-3">
                                <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <span className="text-sm md:text-base truncate">{resume.contact_info.name}</span>
                            </div>
                        )}
                        {resume.contact_info?.email && (
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <span className="text-sm md:text-base truncate">{resume.contact_info.email}</span>
                            </div>
                        )}
                        {resume.contact_info?.phone && (
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <span className="text-sm md:text-base">{resume.contact_info.phone}</span>
                            </div>
                        )}
                        {resume.contact_info?.location && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <span className="text-sm md:text-base">{resume.contact_info.location}</span>
                            </div>
                        )}
                        {resume.contact_info?.linkedin && (
                            <div className="flex items-center gap-3">
                                <Linkedin className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                <a href={resume.contact_info.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm md:text-base truncate">
                                    LinkedIn Profile
                                </a>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Skills */}
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Code className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                            Skills
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                        <div className="flex flex-wrap gap-2">
                            {resume.skills?.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs md:text-sm">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Work Experience */}
            {resume.work_experience?.length > 0 && (
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                    <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                            <Briefcase className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                            Work Experience
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                        <div className="space-y-4 md:space-y-6">
                            {resume.work_experience.map((job, index) => (
                                <div key={index} className="border-l-2 border-indigo-200 pl-3 md:pl-4">
                                    <h4 className="font-semibold text-slate-900 text-sm md:text-base">{job.position}</h4>
                                    <p className="text-indigo-600 font-medium text-sm md:text-base">{job.company}</p>
                                    <p className="text-xs md:text-sm text-slate-600">{job.duration} • {job.location}</p>
                                    {job.responsibilities && (
                                        <ul className="mt-2 text-xs md:text-sm text-slate-700 space-y-1">
                                            {job.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="w-1 h-1 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                                                    <span className="flex-1">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Improvement Suggestions */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Lightbulb className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                        Improvement Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3 md:space-y-4">
                        {resume.improvement_suggestions?.map((suggestion, index) => (
                            <div key={index} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-lg">
                                <Badge className={`${getPriorityColor(suggestion.priority)} w-fit text-xs`}>
                                    {suggestion.priority}
                                </Badge>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 mb-1 text-sm md:text-base">{suggestion.category}</p>
                                    <p className="text-slate-700 text-xs md:text-sm">{suggestion.suggestion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Suggested Skills */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardHeader className="p-4 md:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Award className="w-4 md:w-5 h-4 md:h-5 text-indigo-600" />
                        Recommended Skills to Learn
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3 md:space-y-4">
                        {resume.suggested_skills?.map((skillSuggestion, index) => (
                            <div key={index} className="p-3 md:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">{skillSuggestion.skill}</h4>
                                        <p className="text-xs md:text-sm text-slate-700 mb-2">{skillSuggestion.reason}</p>
                                        <Badge variant="outline" className="bg-white/80 border-green-300 text-green-800 text-xs">
                                            {skillSuggestion.category}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Download Resume */}
            <div className="flex justify-center">
                <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg w-full md:w-auto"
                >
                    <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Original Resume
                    </a>
                </Button>
            </div>
        </div>
    );
}
