
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

import AnalysisResults from "../analysis/AnalysisResults";

export default function ResumeDetailsModal({ resume, onClose }) {
    return (
        <Dialog open={!!resume} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] md:max-w-6xl max-h-[95vh] md:max-h-[90vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 md:p-6">
                <DialogHeader className="pb-3 md:pb-4">
                    <DialogTitle className="text-lg md:text-2xl font-bold text-slate-900">
                        Resume Analysis Details
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[75vh] md:h-[80vh]">
                    <div className="pr-2 md:pr-6">
                        <AnalysisResults resume={resume} />
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
