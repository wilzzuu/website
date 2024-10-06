import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import ImageUploadForm from './ImageUploadForm';
import RichTextEditor from '../components/RichTextEditor';
import '../styles/Global.css';

const AddProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deepdive, setDeepdive] = useState('');
  const [route, setRoute] = useState('');
  const [cardImage, setCardImage] = useState('');
  const [imageURLs, setImageURLs] = useState(['']);
  const { currentUser } = useAuth();

  const handleCardImageChange = (e) => {
    setCardImage(e.target.value);
  };

  const handleImageUploadComplete = (uploadedUrls) => {
    setImageURLs(uploadedUrls);
  };

  const handleImageURLChange = (index, e) => {
    const newImageURLs = [...imageURLs];
    newImageURLs[index] = e.target.value;
    setImageURLs(newImageURLs);
  };

  const addImageField = () => {
    if (imageURLs.length < 10) {
      setImageURLs([...imageURLs, '']);
    }
  };

  const removeImageField = (index) => {
    const newImageURLs = imageURLs.filter((_, idx) => idx !== index);
    setImageURLs(newImageURLs);
  };
  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!currentUser) {
        console.error('User not authenticated');
        return;
    }

    const newProject = {
      title,
      description,
      deepdive,
      route,
      cardImage,
      images: imageURLs.filter((url) => url !== ''),
      createdAt: serverTimestamp(),
      createdBy: String(currentUser.uid),
      userEmail: currentUser.email,
    };

    try {
      await addDoc(collection(db, 'projects'), newProject);
      alert('Project added successfully!');
      setTitle('');
      setDescription('');
      setImage('');
      setRoute('');
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

  return (
    <div>
      <h1>Add New Project</h1>
      <form onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <h3>Project Deep Dive</h3>
        <RichTextEditor value={deepdive} onChange={(e) => setDeepdive(e.target.value)}/>
        <input
          type="text"
          placeholder="Card Image URL"
          value={cardImage}
          onChange={handleCardImageChange}
        />
        <h3>Project Image URLs (1-10)</h3>
        {imageURLs.map((url, index) => (
            <div key={index}>
                <input
                type="text"
                placeholder={`Image URL ${index + 1}`}
                value={url}
                onChange={(e) => handleImageURLChange(index, e)}
                />
                <button type="button" onClick={() => removeImageField(index)}>
                    Remove
                </button>
            </div>
        ))}
        {imageURLs.length > 0 && (
          <div>
            <h3>Uploaded Image URLs</h3>
            <ul>
              {imageURLs.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
          </div>
        )}
        <input
          type="text"
          placeholder="Unique Route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
      <ImageUploadForm onUploadComplete={handleImageUploadComplete} />
    </div>
  );
};
export default AddProjectForm;