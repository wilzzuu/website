import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = ({ onUploadComplete }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]); // Store the selected files
    };

    const handleUpload = async () => {
        const formData = new FormData();
        files.forEach((file) => {
        formData.append('images', file);
        });

        try {
        const response = await axios.post('http://localhost:3001/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        const uploadedUrls = response.data.urls; // Get the uploaded URLs from response
        onUploadComplete(uploadedUrls); // Send URLs back to the parent component
        alert('Images uploaded successfully!');
        } catch (error) {
        alert('Failed to upload images.');
        console.error(error);
        }
    };

    return (
        <div>
        <h2>Upload Project Images</h2>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Images</button>
        </div>
    );
};

export default ImageUploadForm;
