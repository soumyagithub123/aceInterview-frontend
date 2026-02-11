import React, { useState } from "react";
import { X, Upload, Loader2, AlertCircle } from "lucide-react";

import { uploadResume, createPersona } from "../../../database/personaService";

export default function UploadResumeModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------
  // FILE CHANGE
  // -----------------------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB");
      return;
    }

    setError(null);
    setFile(selected);
  };

  // -----------------------
  // SUBMIT
  // -----------------------
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a resume");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1️⃣ Upload file
      const uploadResult = await uploadResume(file);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "Upload failed");
      }

      // 2️⃣ Save as persona (resume-only)
      const personaResult = await createPersona({
        companyName: "Knowledge Base",
        companyDescription: "Uploaded resume",
        position: "Resume",
        jobDescription: "Resume document for interview knowledge base",
        resumeFilename: uploadResult.filename,
        resumeUrl: uploadResult.url,
        resumeFilePath: uploadResult.filePath,
        is_resume_only: true,
      });

      if (!personaResult.success) {
        throw new Error(personaResult.error || "Failed to save resume");
      }

      // 3️⃣ Done
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-zinc-900 w-full sm:max-w-xl rounded-t-xl sm:rounded-xl border border-zinc-800">

        {/* HEADER */}
        <div className="p-6 border-b border-zinc-800 flex justify-between">
          <div>
            <h2 className="text-white text-xl font-bold">Upload Resume</h2>
            <p className="text-gray-500 text-sm mt-1">
              Add a resume to your knowledge base
            </p>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpload} className="p-6 space-y-6">
          {error && (
            <div className="flex items-start gap-2 bg-red-950/50 border border-red-900/50 rounded-lg p-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FILE PICKER */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Resume (PDF only)
            </label>

            <div className="flex gap-3">
              <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-gray-400 text-sm truncate">
                {file ? file.name : "No file selected"}
              </div>

              <label className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Select
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-gray-500 text-xs mt-2">Max size 5MB</p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-white hover:bg-gray-100 text-black py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-gray-500"
          >
            {isUploading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isUploading ? "Uploading…" : "Upload Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}
