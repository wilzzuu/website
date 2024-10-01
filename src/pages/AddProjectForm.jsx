import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

export default function AddProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [route, setRoute] = useState('');
  const { currentUser } = useAuth();
  
  const handleAddProject = async (e) => {
    e.preventDefault();

    if (!currentUser) {
        console.error('User not authenticated');
        return;
    }

    const newProject = {
      title,
      description,
      image,
      route,
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
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Unique Route (e.g., inventory-management-system)"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          required
        />
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};
