import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export const UploadSection = ({ isDarkMode, onFileUpload, setActiveSection }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const validateFile = (file) => {
    const allowedTypes = [".csv", ".xlsx", ".xls"];
    const maxSize = 10 * 1024 * 1024;

    const isValidType = allowedTypes.some((type) =>
      file.name.toLowerCase().endsWith(type)
    );

    if (!isValidType) {
      toast.error("Invalid file type. Please upload CSV or Excel files.");
      return false;
    }

    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 10MB.");
      return false;
    }

    return true;
  };

  const handleFileUpload = (files) => {
    setError(null);

    if (files.length === 0) return;

    const file = files[0];
    if (validateFile(file)) {
      try {
        onFileUpload({ target: { files } }, setActiveSection);
      } catch (uploadError) {
        setError("Error uploading file. Please try again.");
      }
    }

    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    handleDragEvents(e);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInput = (e) => {
    handleFileUpload(e.target.files);
  };

  return (
    <div
      className={`flex flex-col items-center shadow-lg rounded-lg p-6 w-full max-w-md mx-auto ${isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
    >
      <div
        className={`border-dashed border-2 relative ${isDragging ? "border-blue-600" : "border-blue-400"
          } h-64 w-full flex flex-col items-center justify-center mb-6 transition-colors`}
        onDragEnter={handleDragEvents}
        onDragOver={handleDragEvents}
        onDragLeave={handleDragEvents}
        onDrop={handleDrop}
      >
        {error && (
          <div className="absolute top-2 right-2 text-red-500">
            <FaTimesCircle className="h-6 w-6" />
            <p className="text-sm ml-2">{error}</p>
          </div>
        )}

        <FaCloudUploadAlt
          className={`h-16 w-16 ${isDragging ? "text-blue-600" : "text-blue-400"
            }`}
        />
        <p className="mt-4 font-semibold text-center px-4">
          {isDragging
            ? "Release to upload your file"
            : "Drag and drop CSV or Excel files here or click to upload"}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileInput}
          className="hidden"
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer mt-4 px-6 py-2 border border-blue-400 rounded text-blue-600 hover:bg-blue-100"
        >
          Select File
        </label>
      </div>
    </div>
  );
};