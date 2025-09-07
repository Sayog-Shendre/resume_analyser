
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Star, TrendingUp, Calendar } from "lucide-react";

export default function StatsOverview({ resumes }) {
    const completedResumes = resumes.filter(r => r.analysis_status === "completed");
    const avgRating = completedResumes.length > 0
        ? (completedResumes.reduce((sum, r) => sum + (r.overall_rating || 0), 0) / completedResumes.length).toFixed(1)
        : "0";

    const thisMonthCount = resumes.filter(r => {
        const resumeDate = new Date(r.created_date);
        const now = new Date();
        return resumeDate.getMonth() === now.getMonth() && resumeDate.getFullYear() === now.getFullYear();
    }).length;

    const stats = [
        {
            title: "Total Resumes",
            value: resumes.length,
            icon: FileText,
            color: "from-blue-500 to-blue-600"
        },
        {
            title: "Average Rating",
            value: `${avgRating}/10`,
            icon: Star,
            color: "from-yellow-500 to-yellow-600"
        },
        {
            title: "This Month",
            value: thisMonthCount,
            icon: Calendar,
            color: "from-green-500 to-green-600"
        },
        {
            title: "Completed",
            value: completedResumes.length,
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform translate-x-4 md:translate-x-8 -translate-y-4 md:-translate-y-8`} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:p-4 pb-2">
                        <CardTitle className="text-xs md:text-sm font-medium text-slate-600">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="w-3 md:w-4 h-3 md:h-4 text-slate-500" />
                    </CardHeader>
                    <CardContent className="p-3 md:p-4 pt-0">
                        <div className="text-lg md:text-2xl font-bold text-slate-900">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
