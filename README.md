# AI Resume Analyzer

A full-stack web application built on the Base44 platform that uses AI to analyze resumes, provide feedback, and track historical submissions.



## Overview

This project is an implementation of the DeepKlarity Resume Analyzer assignment. It allows users to upload a resume in PDF format, which is then processed by an AI to extract key information, generate ratings, and suggest improvements.

### Key Features

- **File Upload**: Drag-and-drop PDF resume uploader.
- **AI-Powered Analysis**: Utilizes Google's Gemini LLM (via Base44 integrations) to extract structured data such as contact information, work experience, education, and skills.
- **Automated Feedback**: The AI generates an overall score, category-specific ratings, and actionable suggestions for improvement.
- **Historical Viewer**: A searchable and responsive table of all previously uploaded resumes.
- **Responsive UI**: A clean, modern, and responsive interface built with React and Tailwind CSS.

## Technology Stack & Architecture

This application is built entirely on the **Base44 platform**, which abstracts away much of the traditional backend and infrastructure management.

- **Frontend**: **React.js** with **Tailwind CSS** for styling.
- **Backend**: Handled by **Base44's built-in integrations**. There is no separate Node.js/Express server to manage.
- **Database**: **PostgreSQL**, automatically provisioned and managed by the Base44 entity system.
- **LLM Integration**: **Google Gemini**, accessed via the `InvokeLLM` core integration.
- **PDF Parsing**: Handled by the `ExtractDataFromUploadedFile` core integration.

### Data Flow

1.  **Upload**: The user uploads a PDF on the React frontend.
2.  **Integration Call**: The `UploadFile` integration is called, storing the file in managed cloud storage.
3.  **AI Analysis**: The `InvokeLLM` integration is called with the file's content and a detailed prompt, instructing it to return a structured JSON object matching the `Resume` entity schema.
4.  **Database Storage**: The returned JSON data is saved as a new record in the `Resume` entity using `Resume.create()`.
5.  **Render**: The new data is passed to the `AnalysisResults` component and displayed to the user.

## Project Structure

The project follows the standard Base44 file structure:

```
/
├── entities/
│   └── Resume.json         # Defines the database schema for resumes
├── pages/
│   ├── Analysis.js         # Main resume upload and analysis page
│   ├── History.js          # Page to view all past analyses
│   └── Readme.js           # This documentation page
├── components/
│   ├── analysis/           # Components for the Analysis page
│   └── history/            # Components for the History page
└── Layout.js               # Main sidebar and page layout
```

This structure separates data definition (`entities`), user-facing pages (`pages`), and reusable UI elements (`components`).
