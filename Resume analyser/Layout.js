import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, History, Brain, Sparkles } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
    {
        title: "Resume Analysis",
        url: createPageUrl("Analysis"),
        icon: Brain,
        description: "Upload & analyze resumes"
    },
    {
        title: "History",
        url: createPageUrl("History"),
        icon: History,
        description: "View past analyses"
    },
];

export default function Layout({ children }) {
    const location = useLocation();

    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <Sidebar className="border-r border-slate-200/60 bg-white/70 backdrop-blur-sm">
                    <SidebarHeader className="border-b border-slate-200/60 p-6">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-2 h-2 text-white" />
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900 text-lg">DeepKlarity</h2>
                                <p className="text-xs text-slate-500 font-medium">Resume Analyzer</p>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-3">
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 py-3">
                                Navigation
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="space-y-1">
                                    {navigationItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={`rounded-xl transition-all duration-300 group ${location.pathname === item.url
                                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200'
                                                        : 'hover:bg-slate-100 text-slate-700'
                                                    }`}
                                            >
                                                <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                                    <item.icon className={`w-5 h-5 transition-transform duration-300 ${location.pathname === item.url ? 'scale-110' : 'group-hover:scale-105'
                                                        }`} />
                                                    <div>
                                                        <span className="font-semibold">{item.title}</span>
                                                        <p className={`text-xs ${location.pathname === item.url ? 'text-indigo-100' : 'text-slate-500'
                                                            }`}>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <main className="flex-1 flex flex-col">
                    <header className="bg-white/60 backdrop-blur-sm border-b border-slate-200/60 px-6 py-4 md:hidden">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-300" />
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-600" />
                                <h1 className="text-lg font-bold text-slate-900">DeepKlarity</h1>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}