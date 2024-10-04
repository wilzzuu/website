import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: '',
    description: '',
    route: '',
    cardImage: '',
    images: [],
    isPublished: false,
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

  const handleDeepdiveChange = (value) => {
    setProject({ ...project, deepdive: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSave = async () => {
    try {
        const projectDoc = doc(db, 'projects', projectId);
        await updateDoc(projectDoc, project);
        alert('Project updated successfully!');
        navigate('/portfolio'); // Redirect back to the portfolio page 
    } catch (error) {
        console.error('Error updating project: ', error);
    }
    
  };

  return (
    <div>
      <h2>Edit Project</h2>
      <form>
        <div>
            <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            required
            />
        </div>
        <div>
            <textarea
            name="description"
            value={project.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            required
            />
        </div>
        <div>
            <input
            type="text"
            name="route"
            value={project.route}
            onChange={handleInputChange}
            placeholder="Project Route"
            required
            />
        </div>
        <div>
            <input
            type="text"
            name="cardImage"
            value={project.cardImage}
            onChange={handleInputChange}
            placeholder="Card Image URL"
            />
        </div>
        <div>
        <label htmlFor="deepdive">Deepdive</label>
            <ReactQuill
                value={project.deepdive}
                onChange={handleDeepdiveChange}
                modules={EditProject.modules}
                formats={EditProject.formats}
            />
        </div>
        <div>
          <label htmlFor="isPublished">Publish</label>
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleSave}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
