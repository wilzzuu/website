import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Carousel from '../components/Carousel';
import DOMPurify from 'dompurify';

const ProjectDetail = () => {
    const { currentUser } = useAuth();
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [documentId, setDocumentId] = useState('');

  // Fetch the specific project from Firestore using the dynamic route parameter
  useEffect(() => {
    const fetchProject = async () => {
        try {
            const cacheKey = `project_${projectId}`;
            const cachedData = localStorage.getItem(cacheKey);

            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setProject(parsedData.project);
                setDocumentId(parsedData.documentId);
                console.log('Loaded project data from cache.');
            } else {
                const projectRef = collection(db, 'projects'); // Reference to the specific project document
                const q = query(projectRef, where('route', '==', projectId)); // Get the document snapshot
                const querySnapshot = await getDocs(q);
        
                if (!querySnapshot.empty) {
                    // Assuming only one document matches the route
                    const doc = querySnapshot.docs[0];
                    const projectData = doc.data();
                    const sanitizedContent = DOMPurify.sanitize(projectData.deepdive);
                    setProject({ ...projectData, deepdive: sanitizedContent});
                    setDocumentId(doc.id);
                } else {
                    setError('Project not found');
                }
            } 
        } catch (err) {
            console.error('Error fetching project: ', err);
            setError('Failed to fetch project');
        } finally {
            setLoading(false);
        };
    }
    fetchProject();
  }, [project, projectId]);

  if (loading) {return <div>Loading project...</div>;}
  if (error) {return <div>{error}</div>;}
  
  return (
    <div>
        {currentUser ? (
            <Link to={`/edit-project/${documentId}`}>
            <button style={styles.editButton} onClick={() => handleEditProject(documentId)}>Edit Project</button>
            </Link>
        ):(
            <></>
        )}
        
        <div style={styles.container}>
        <h1>{project.title}</h1>
        <p style={styles.desc}>{project.description}</p>
        {project.images ? <Carousel images={ project.images } style={styles.image}/> : <p>No images to display</p>}
        <h1 style={styles.deepdiveTitle}>Project Deep Dive</h1>
        <div dangerouslySetInnerHTML={{ __html: project.deepdive }} style={styles.deepdive}/>
        </div>
    </div>
  );
};

const handleEditProject = (projectId) => {
    // Redirect to edit form for the given project
    window.location.href = `/edit-project/${projectId}`;
    };

const styles = {
  container: {
    padding: '10px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  desc: {
    marginTop: '-15px',
    marginBottom: '30px',
    fontSize: '20px',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  deepdiveTitle: {
    marginTop: '80px',
    fontSize: '36px',
  },
  deepdive: {
    textAlign: 'left',
    fontSize: '19px',
    marginBottom: '100px',
  },
  editButton: {
    position: 'fixed',
    marginTop: '20px',
    marginLeft: '20px',
  },
};

export default ProjectDetail;
