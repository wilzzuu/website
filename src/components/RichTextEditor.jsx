import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          ['clean'],
        ],
      }}
      formats={[
        'header', 'font', 'list', 'bullet',
        'bold', 'italic', 'underline', 'strike',
        'link', 'image',
      ]}
    />
  );
};

export default RichTextEditor;
