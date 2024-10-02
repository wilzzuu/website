import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: '',
    description: '',
    route: '',
    cardImage: '',
    images: [],
  });

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = doc(db, 'projects', projectId);
      const projectData = await getDoc(projectDoc);
      if (projectData.exists()) {
        setProject(projectData.data());
      }
    };
    fetchProject();
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSave = async () => {
    const projectDoc = doc(db, 'projects', projectId);
    await updateDoc(projectDoc, project);
    alert('Project updated successfully!');
    navigate('/portfolio'); // Redirect back to the portfolio page
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form>
        <input
          type="text"
          name="title"
          value={project.title}
          onChange={handleInputChange}
          placeholder="Project Title"
          required
        />
        <textarea
          name="description"
          value={project.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          required
        />
        <input
          type="text"
          name="route"
          value={project.route}
          onChange={handleInputChange}
          placeholder="Project Route"
          required
        />
        <input
          type="text"
          name="cardImage"
          value={project.cardImage}
          onChange={handleInputChange}
          placeholder="Card Image URL"
        />
        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
