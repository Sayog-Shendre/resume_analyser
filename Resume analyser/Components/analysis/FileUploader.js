
import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

export default function FileUploader({ selectedFile, onFileSelect, onRemoveFile }) {
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files);
        const pdfFile = files.find(file => file.type === "application/pdf");

        if (pdfFile) {
            onFileSelect(pdfFile);
        }
    }, [onFileSelect]);

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            onFileSelect(file);
        }
    };

    if (selectedFile) {
        return (
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
                <CardContent className="p-4 md:p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                            <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 md:w-6 h-5 md:h-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-slate-900 text-sm md:text-base truncate">{selectedFile.name}</p>
                                <p className="text-xs md:text-sm text-slate-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onRemoveFile}
                            className="hover:bg-red-50 hover:text-red-600 flex-shrink-0"
                        >
                            <X className="w-4 md:w-5 h-4 md:h-5" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white/60 backdrop-blur-sm border-2 border-dashed border-slate-300 hover:border-indigo-400 transition-colors duration-300">
            <CardContent
                className="p-6 md:p-8 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
            >
                <div className="text-center">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-3 md:mb-4 flex items-center justify-center shadow-lg">
                        <Upload className="w-6 md:w-8 h-6 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                        Upload Your Resume
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4">
                        Drag and drop your PDF resume here, or click to browse
                    </p>
                    <Button
                        variant="outline"
                        className="bg-white/80 border-slate-300 hover:bg-white text-sm md:text-base"
                    >
                        Choose PDF File
                    </Button>
                    <p className="text-xs text-slate-500 mt-2 md:mt-3">
                        Maximum file size: 10MB • PDF format only
                    </p>
                </div>

                <input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                />
            </CardContent>
        </Card>
    );
}
