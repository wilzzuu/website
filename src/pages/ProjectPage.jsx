import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Carousel from '../components/Carousel';
import DOMPurify from 'dompurify';
import '../styles/ProjectPage.css';

const fetchProject = async(user, projectId) => {
    const projectRef = collection(db, 'projects');

    let q;
    if (user) {
        q = query(projectRef, where('route', '==', projectId));
    } else {
        q = query(projectRef, where('route', '==', projectId), where('isPublished', '==', true));
    }
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const projectData = doc.data();
        const sanitizedContent = DOMPurify.sanitize(projectData.deepdive);
        return { ...projectData, deepdive: sanitizedContent, documentId: doc.id };
    } else {
        throw new Error('Project not found');
    }
};

const ProjectPage = () => {
    const { currentUser } = useAuth();
    const { projectId } = useParams();

    const { data: project, isLoading, error } = useQuery(
        ['project', projectId],
        () => fetchProject(currentUser, projectId),
        {
            enabled: !!currentUser || currentUser === null,
            cacheTime: 72000000, // 2h cache time
            staleTime: 36000000, // 1h stale time
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
        }
    );

    const handleEditProject = (projectId) => {
        // Redirect to edit form for the given project
        window.location.href = `/edit-project/${projectId}`;
    };

  if (isLoading) {return <div>Loading project...</div>;}
  if (error) {return <div>{error}</div>;}
  
  return (
    <div>
        {currentUser ? (
            <button className='edit-project-button' onClick={() => handleEditProject(documentId)}>Edit Project</button>
        ):(
            <></>
        )}
        
        <div className='project-page-container'>
        <h1 className='project-title'>{project.title}</h1>
        <p className='project-description'>{project.description}</p>
        {project.images ? <Carousel images={ project.images } className='project-image'/> : <p>No images to display</p>}
        <h1 className='deep-dive-title'>Project Deep Dive</h1>
        <div dangerouslySetInnerHTML={{ __html: project.deepdive }} className='deep-dive'/>
        </div>
    </div>
  );
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

export default ProjectPage;
