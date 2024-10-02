import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Carousel from '../components/Carousel';
import DOMPurify from 'dompurify';

const ProjectPage = () => {
  const { projectId } = useParams(); // Get the dynamic route parameter
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific project from Firestore using the dynamic route parameter
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = collection(db, 'projects'); // Reference to the specific project document
        const q = query(projectRef, where('route', '==', projectId)); // Get the document snapshot
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming only one document matches the route
            const projectData = querySnapshot.docs[0].data();
            const sanitizedContent = DOMPurify.sanitize(projectData.deepdive);
            setProject({ ...projectData, deepdive: sanitizedContent});
          } else {
            setError('Project not found');
          }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [projectId]);

  if (loading) {return <div>Loading project...</div>;}
  if (error) {return <div>{error}</div>;}

  return (
    <div style={styles.container}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {project.images ? <Carousel images={ project.images } style={styles.image}/> : <p>No images to display</p>}
      <div dangerouslySetInnerHTML={{ __html: project.deepdive }} />
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  image: {
    width: '200px',
    height: '300px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
};

export default ProjectPage;
