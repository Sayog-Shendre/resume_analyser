
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Loader2 } from "lucide-react";

const steps = [
    { id: 1, title: "Uploading Resume", description: "Securely uploading your PDF file" },
    { id: 2, title: "Extracting Content", description: "Reading and parsing resume text" },
    { id: 3, title: "AI Analysis", description: "Analyzing content and generating insights" },
    { id: 4, title: "Saving Results", description: "Storing your analysis securely" },
    { id: 5, title: "Complete", description: "Analysis ready for review" }
];

export default function ProcessingSteps({ currentStep }) {
    return (
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardContent className="p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center">
                        <Loader2 className="w-6 md:w-8 h-6 md:w-8 text-white animate-spin" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                        Analyzing Your Resume
                    </h3>
                    <p className="text-sm md:text-base text-slate-600">
                        Please wait while we process your resume with AI
                    </p>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-3 md:gap-4">
                            <div className="flex-shrink-0">
                                {currentStep > step.id ? (
                                    <CheckCircle className="w-5 md:w-6 h-5 md:h-6 text-green-500" />
                                ) : currentStep === step.id ? (
                                    <div className="w-5 md:w-6 h-5 md:h-6 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                    </div>
                                ) : (
                                    <Circle className="w-5 md:w-6 h-5 md:h-6 text-slate-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm md:text-base ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                                    }`}>
                                    {step.title}
                                </p>
                                <p className={`text-xs md:text-sm ${currentStep >= step.id ? 'text-slate-600' : 'text-slate-400'
                                    }`}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
