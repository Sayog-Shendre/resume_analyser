
import React, { useState, useEffect } from "react";
import { Resume } from "@/entities/Resume";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Search,
    FileText,
    Calendar,
    Star,
    TrendingUp,
    Eye
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import ResumeDetailsModal from "../components/history/ResumeDetailsModal";
import StatsOverview from "./components/history/StatsOverview";

export default function HistoryPage() {
    const [resumes, setResumes] = useState([]);
    const [filteredResumes, setFilteredResumes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedResume, setSelectedResume] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadResumes();
    }, []);

    useEffect(() => {
        const filtered = resumes.filter(resume =>
            resume.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resume.contact_info?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resume.contact_info?.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResumes(filtered);
    }, [resumes, searchQuery]);

    const loadResumes = async () => {
        try {
            const data = await Resume.list("-created_date");
            setResumes(data);
        } catch (error) {
            console.error("Error loading resumes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getRatingColor = (rating) => {
        if (rating >= 8) return "text-green-600 bg-green-100";
        if (rating >= 6) return "text-yellow-600 bg-yellow-100";
        return "text-red-600 bg-red-100";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-3">
                        Analysis History
                    </h1>
                    <p className="text-base md:text-lg text-slate-600">
                        Review and compare all your resume analyses over time.
                    </p>
                </div>

                {!isLoading && <StatsOverview resumes={resumes} />}

                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-xl">
                    <CardContent className="p-3 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-4">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                                <h2 className="text-lg md:text-xl font-semibold text-slate-900">
                                    Resume Archives ({filteredResumes.length})
                                </h2>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search by filename, name, or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-white/80 border-slate-200 focus:border-indigo-300 text-sm"
                                />
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-slate-200/60">
                            {/* Mobile Card View */}
                            <div className="block md:hidden">
                                {isLoading ? (
                                    Array(3).fill(0).map((_, i) => (
                                        <div key={i} className="p-4 border-b border-slate-200 space-y-3">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                            <div className="flex gap-2">
                                                <Skeleton className="h-6 w-16 rounded-full" />
                                                <Skeleton className="h-6 w-20 rounded-full" />
                                            </div>
                                        </div>
                                    ))
                                ) : filteredResumes.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium text-sm">
                                            {searchQuery ? "No resumes found matching your search." : "No resumes uploaded yet."}
                                        </p>
                                    </div>
                                ) : (
                                    filteredResumes.map((resume) => (
                                        <div
                                            key={resume.id}
                                            className="p-4 border-b border-slate-200 hover:bg-slate-50/50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedResume(resume)}
                                        >
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-4 h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-slate-900 truncate text-sm">
                                                        {resume.filename}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        {resume.contact_info?.name || "N/A"}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {resume.contact_info?.email || ""}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Calendar className="w-3 h-3" />
                                                    {format(new Date(resume.created_date), "MMM d, yyyy")}
                                                </div>
                                                <div className="flex gap-2">
                                                    {resume.overall_rating && (
                                                        <Badge className={`${getRatingColor(resume.overall_rating)} border-0 font-semibold text-xs`}>
                                                            <Star className="w-2 h-2 mr-1" />
                                                            {resume.overall_rating}/10
                                                        </Badge>
                                                    )}
                                                    <Badge
                                                        variant={resume.analysis_status === "completed" ? "default" : "secondary"}
                                                        className={`text-xs ${resume.analysis_status === "completed"
                                                            ? "bg-green-100 text-green-800 border-green-200"
                                                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                            }`}
                                                    >
                                                        {resume.analysis_status === "completed" ? "Done" : "Processing"}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50/50">
                                            <TableHead className="font-semibold">Resume</TableHead>
                                            <TableHead className="font-semibold">Candidate</TableHead>
                                            <TableHead className="font-semibold">Upload Date</TableHead>
                                            <TableHead className="font-semibold">Rating</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                            <TableHead className="font-semibold">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            Array(5).fill(0).map((_, i) => (
                                                <TableRow key={i}>
                                                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                                    <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                                                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                                    <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                                                </TableRow>
                                            ))
                                        ) : filteredResumes.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-12">
                                                    <div className="flex flex-col items-center gap-3">
                                                        <FileText className="w-12 h-12 text-slate-300" />
                                                        <p className="text-slate-500 font-medium">
                                                            {searchQuery ? "No resumes found matching your search." : "No resumes uploaded yet."}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredResumes.map((resume) => (
                                                <TableRow
                                                    key={resume.id}
                                                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                                                    onClick={() => setSelectedResume(resume)}
                                                >
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                                <FileText className="w-4 h-4 text-white" />
                                                            </div>
                                                            <span className="font-medium text-slate-900 truncate max-w-48">
                                                                {resume.filename}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium text-slate-900">
                                                                {resume.contact_info?.name || "N/A"}
                                                            </p>
                                                            <p className="text-sm text-slate-500">
                                                                {resume.contact_info?.email || ""}
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-slate-600">
                                                            <Calendar className="w-4 h-4" />
                                                            {format(new Date(resume.created_date), "MMM d, yyyy")}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {resume.overall_rating ? (
                                                            <Badge className={`${getRatingColor(resume.overall_rating)} border-0 font-semibold`}>
                                                                <Star className="w-3 h-3 mr-1" />
                                                                {resume.overall_rating}/10
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-slate-400">N/A</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={resume.analysis_status === "completed" ? "default" : "secondary"}
                                                            className={resume.analysis_status === "completed"
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                            }
                                                        >
                                                            {resume.analysis_status === "completed" ? "Completed" : "Processing"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => setSelectedResume(resume)}
                                                                className="bg-white/80 hover:bg-white border-slate-200"
                                                            >
                                                                <Eye className="w-4 h-4 mr-1" />
                                                                Details
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {selectedResume && (
                    <ResumeDetailsModal
                        resume={selectedResume}
                        onClose={() => setSelectedResume(null)}
                    />
                )}
            </div>
        </div>
    );
}
