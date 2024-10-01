import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
        console.log("projectRef:", projectRef);
        const q = query(projectRef, where('route', '==', projectId)); // Get the document snapshot
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Assuming only one document matches the route
            const projectData = querySnapshot.docs[0].data();
            setProject(projectData);
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

  if (loading) {
    return <div>Loading project...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} style={styles.image} />
      <p>{project.description}</p>
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
    width: '100%',
    borderRadius: '8px',
    marginBottom: '20px',
  },
};

export default ProjectPage;
