import React, { useState } from "react";
import { X, Upload, Loader2, AlertCircle, FileText } from "lucide-react";

import { uploadKBFile, createKBItem } from "../../../database/KnowledgeBaseService";
import { useAuth } from "../../Auth/AuthContext";

export default function KBUploadModal({ onClose, onSuccess }) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    kbName: "",
    fileType: "pdf", // Default, will update on file select
  });

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  // -----------------------
  // FILE CHANGE
  // -----------------------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Determine type from extension
    const ext = selected.name.split(".").pop().toLowerCase();
    let type = "pdf";
    if (ext === "pdf") type = "pdf";
    else if (["doc", "docx"].includes(ext)) type = "docx";
    else if (ext === "txt") type = "txt";
    else {
      setError("Please select a PDF, Word document, or Text file");
      return;
    }

    // Validate file size (10MB max)
    if (selected.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);
    setFile(selected);
    setFormData((prev) => ({ 
      ...prev, 
      fileType: type,
      // Auto-fill KB name if empty
      kbName: prev.kbName || selected.name.replace(/\.[^/.]+$/, "") 
    }));
  };

  // -----------------------
  // SUBMIT
  // -----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.kbName.trim()) {
      setError("Please enter a document title");
      return;
    }

    if (!file) {
      setError("Please select a file");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // 1️⃣ Upload file to Supabase Storage
      const uploadResult = await uploadKBFile(file, user.id);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error || "File upload failed");
      }

      // 2️⃣ Create KB entry in database (No tags anymore)
      const kbResult = await createKBItem({
        user_id: user.id,
        kb_name: formData.kbName.trim(),
        file_type: formData.fileType,
        file_url: uploadResult.fileUrl,
        file_path: uploadResult.filePath,
        file_size: file.size,
        tags: [], 
      });

      if (!kbResult.success) {
        throw new Error(kbResult.error || "Failed to create KB entry");
      }

      // 3️⃣ Success
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
      <div className="bg-zinc-900 w-full sm:max-w-md rounded-t-xl sm:rounded-xl border border-zinc-800 shadow-2xl">
        
        {/* HEADER */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-start">
          <div>
            <h2 className="text-white text-xl font-bold">Upload Knowledge Base</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="flex items-start gap-2 bg-red-950/50 border border-red-900/50 rounded-lg p-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* KB NAME */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Document Title *
            </label>
            <input
              type="text"
              value={formData.kbName}
              onChange={(e) => setFormData(p => ({...p, kbName: e.target.value}))}
              placeholder="e.g., My React Interview Notes"
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 placeholder-zinc-600"
              required
            />
          </div>

          {/* FILE PICKER */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Select File *
            </label>

            <div className="flex gap-3">
              <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 text-sm flex items-center gap-2 overflow-hidden">
                {file ? (
                  <>
                    <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white truncate">{file.name}</span>
                  </>
                ) : (
                  <span className="text-zinc-500">No file selected</span>
                )}
              </div>

              <label className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg cursor-pointer flex items-center justify-center transition border border-zinc-700 hover:border-zinc-600">
                <span className="text-sm font-medium">Select</span>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-zinc-500 text-xs mt-2 ml-1">
              Supports PDF, DOCX, TXT (Max 10MB)
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-purple-500/20 mt-2"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Document
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}