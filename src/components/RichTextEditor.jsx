import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const RichTextEditor = ({ onSave }) => {
  const [content, setContent] = useState('');

  // Handle content change
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Sanitize content before saving
  const handleSave = () => {
    const sanitizedContent = DOMPurify.sanitize(content);
    onSave(sanitizedContent); // Call parent function to save the sanitized content
  };

  return (
    <div>
      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
      <button className='quill-save-button' onClick={handleSave}>Save Deep Dive Content</button>
    </div>
  );
};

export default RichTextEditor;
