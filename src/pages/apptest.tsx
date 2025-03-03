import React, { useState } from "react";
import axios from "axios";

const Apptest: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!files) return alert("Please select files first");

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    setUploading(true);
    try {
      const response = await axios.post("http://localhost:3000/client/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(files);
      
      setUploadedUrls(response.data.urls);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
    
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <input type="file" multiple onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>

      {uploadedUrls.length > 0 && (
        <div className="mt-4">
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
};

export default Apptest;
