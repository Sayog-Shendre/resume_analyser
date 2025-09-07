
import React, { useState } from "react";
import { Resume } from "@/entities/Resume";
import { UploadFile, ExtractDataFromUploadedFile, InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

import FileUploader from "./components/analysis/FileUploader";
import AnalysisResults from "./components/analysis/AnalysisResults";
import ProcessingSteps from "./components/analysis/ProcessingSteps";

export default function AnalysisPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const processResume = async () => {
        if (!selectedFile) return;

        setIsProcessing(true);
        setCurrentStep(0);
        setError(null);
        setResults(null);

        try {
            // Step 1: Upload file
            setCurrentStep(1);
            const { file_url } = await UploadFile({ file: selectedFile });

            // Step 2: Extract text
            setCurrentStep(2);
            const extractResult = await ExtractDataFromUploadedFile({
                file_url,
                json_schema: {
                    type: "object",
                    properties: {
                        raw_text: { type: "string" }
                    }
                }
            });

            if (extractResult.status !== "success") {
                throw new Error("Failed to extract text from resume");
            }

            // Step 3: AI Analysis
            setCurrentStep(3);
            const analysisPrompt = `
        Analyze the following resume text and extract structured information. Return a comprehensive JSON object with the following structure:

        {
          "contact_info": {
            "name": "Full name",
            "email": "Email address",
            "phone": "Phone number",
            "location": "City, State/Country",
            "linkedin": "LinkedIn URL",
            "portfolio": "Portfolio/website URL"
          },
          "summary": "Professional summary or objective statement",
          "work_experience": [
            {
              "company": "Company name",
              "position": "Job title",
              "duration": "Start - End dates",
              "location": "Location",
              "responsibilities": ["List of key responsibilities and achievements"]
            }
          ],
          "education": [
            {
              "institution": "School/University name",
              "degree": "Degree type",
              "field": "Field of study",
              "graduation_year": "Year",
              "gpa": "GPA if mentioned"
            }
          ],
          "skills": ["List of technical and soft skills"],
          "certifications": ["List of certifications"],
          "projects": [
            {
              "name": "Project name",
              "description": "Brief description",
              "technologies": ["Technologies used"]
            }
          ],
          "overall_rating": 7.5,
          "category_ratings": {
            "content": 8.0,
            "format": 7.0,
            "skills": 8.5,
            "experience": 7.0
          },
          "improvement_suggestions": [
            {
              "category": "Content/Format/Skills/Experience",
              "suggestion": "Specific improvement suggestion",
              "priority": "high/medium/low"
            }
          ],
          "suggested_skills": [
            {
              "skill": "Skill name",
              "reason": "Why this skill would be valuable",
              "category": "Technical/Soft/Industry-specific"
            }
          ]
        }

        Provide thoughtful analysis and actionable recommendations. Rate each category out of 10 and give an overall rating.

        Resume text to analyze:
        ${extractResult.output.raw_text}
      `;

            const analysisResult = await InvokeLLM({
                prompt: analysisPrompt,
                response_json_schema: Resume.schema()
            });

            // Step 4: Save to database
            setCurrentStep(4);
            const resumeData = {
                filename: selectedFile.name,
                file_url,
                analysis_status: "completed",
                ...analysisResult
            };

            const savedResume = await Resume.create(resumeData);
            setResults(savedResume);
            setCurrentStep(5);

        } catch (err) {
            console.error("Error processing resume:", err);
            setError(err.message || "An error occurred while processing your resume");
        } finally {
            setIsProcessing(false);
        }
    };

    const resetAnalysis = () => {
        setSelectedFile(null);
        setResults(null);
        setError(null);
        setCurrentStep(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2 md:mb-3">
                        Resume Analysis
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-2">
                        Upload your resume and get AI-powered insights, ratings, and personalized recommendations for improvement.
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive" className="mb-4 md:mb-6 max-w-2xl mx-auto">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {!results ? (
                    <>
                        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
                            <FileUploader
                                selectedFile={selectedFile}
                                onFileSelect={setSelectedFile}
                                onRemoveFile={() => setSelectedFile(null)}
                            />
                        </div>

                        {selectedFile && !isProcessing && (
                            <div className="text-center">
                                <Button
                                    onClick={processResume}
                                    size="lg"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                                >
                                    Analyze Resume
                                </Button>
                            </div>
                        )}

                        {isProcessing && (
                            <div className="max-w-2xl mx-auto">
                                <ProcessingSteps currentStep={currentStep} />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
                            <Alert className="border-green-200 bg-green-50 flex-1 md:max-w-md">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800 text-sm">
                                    Resume analysis completed successfully!
                                </AlertDescription>
                            </Alert>
                            <Button
                                onClick={resetAnalysis}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-50 w-full md:w-auto text-sm"
                            >
                                Analyze Another Resume
                            </Button>
                        </div>

                        <AnalysisResults resume={results} />
                    </div>
                )}
            </div>
        </div>
    );
}
