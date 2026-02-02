import React, { useState } from "react";
import { X, Upload, Loader2, AlertCircle } from "lucide-react";
import {
  createPersona,
  uploadResume,
} from "../../../database/personaService";

export default function PersonaCreateModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    position: "",
    jobDescription: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // FILE CHANGE
  // -------------------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size is 5MB");
      return;
    }

    setError(null);
    setResumeFile(file);
  };

  // -------------------------
  // SUBMIT
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let resumeUrl = "";
      let resumeFilename = "";
      let resumeFilePath = "";

      if (resumeFile) {
        const uploadResult = await uploadResume(resumeFile);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Resume upload failed");
        }

        resumeUrl = uploadResult.url;
        resumeFilename = uploadResult.filename;
        resumeFilePath = uploadResult.filePath;
      }

      const payload = {
        companyName: formData.companyName.trim(),
        companyDescription: formData.companyDescription.trim(),
        position: formData.position.trim(),
        jobDescription: formData.jobDescription.trim(),
        resumeUrl,
        resumeFilename,
        resumeFilePath,
      };

      const result = await createPersona(payload);
      if (!result.success) {
        throw new Error(result.error || "Failed to create persona");
      }

      // ✅ SUCCESS
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
      <div className="bg-zinc-900 w-full sm:max-w-2xl rounded-t-xl sm:rounded-xl max-h-[95vh] overflow-y-auto border border-zinc-800">

        {/* HEADER */}
        <div className="p-6 border-b border-zinc-800 flex justify-between sticky top-0 bg-zinc-900 z-10">
          <div>
            <h2 className="text-white text-xl font-bold">
              Create Persona
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Add company and role details
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* ERROR */}
          {error && (
            <div className="flex items-start gap-2 bg-red-950/50 border border-red-900/50 rounded-lg p-3 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* RESUME */}
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Resume (optional)
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-gray-400 text-sm truncate">
                {resumeFile ? resumeFile.name : "No resume uploaded"}
              </div>

              <label className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-gray-500 text-xs mt-2">
              PDF only • Max 5MB
            </p>
          </div>

          <InputField
            label="Company Name"
            value={formData.companyName}
            onChange={(v) =>
              setFormData({ ...formData, companyName: v })
            }
          />

          <TextAreaField
            label="Company Description"
            value={formData.companyDescription}
            onChange={(v) =>
              setFormData({ ...formData, companyDescription: v })
            }
          />

          <InputField
            label="Position"
            value={formData.position}
            onChange={(v) =>
              setFormData({ ...formData, position: v })
            }
          />

          <TextAreaField
            label="Job Description"
            value={formData.jobDescription}
            onChange={(v) =>
              setFormData({ ...formData, jobDescription: v })
            }
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-100 text-black py-3.5 rounded-lg font-bold flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {isSubmitting ? "Creating…" : "Create Persona"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------------
   REUSABLE FIELDS
------------------------- */

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-white text-sm font-medium mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm focus:border-zinc-700 outline-none"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-white text-sm font-medium mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <textarea
        rows={4}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm resize-none focus:border-zinc-700 outline-none"
      />
    </div>
  );
}
