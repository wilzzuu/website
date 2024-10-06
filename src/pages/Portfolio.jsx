import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import AddProjectButton from '../components/AddProjectButton';
import Notification from '../components/Notification';
import '../styles/Portfolio.css';
import '../styles/Global.css';

const Portfolio = () => {
    const { currentUser } = useAuth();
    const [notification, setNotification] = useState(null);
    const [isPublishedState, setIsPublishedState] = useState();
    const queryClient = useQueryClient();
    const prevProjectsRef = useRef([]);

    const { data: projects, isLoading, error } = useQuery(
        ['projects', currentUser],
        async () => {
            const projectRef = collection(db, 'projects');
            let q;
            if (currentUser) {
                q = query(projectRef, limit(10));
            } else {
                q = query(projectRef, where('isPublished', '==', true), limit(10));
            }

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        },
        {
            enabled: !!currentUser || currentUser === null,
            cacheTime: 72000000, // 2h cache time
            staleTime: 36000000, // 1h stale time
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (projects) {
          const projectRef = collection(db, 'projects');
          let q;
    
          if (currentUser) {
            q = query(projectRef, limit(10));
          } else {
            q = query(projectRef, where('isPublished', '==', true), limit(10));
          }
    
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const newProjects = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
    
            // Check if there are actual changes
            if (prevProjectsRef.current.length && prevProjectsRef.current.length !== newProjects.length) {
              setNotification('Projects have been added or updated.');
              setTimeout(() => setNotification(null), 3000);
            }
    
            // Update the queryClient cache
            queryClient.setQueryData(['projects', currentUser], newProjects);
    
            // Update the previous projects ref
            prevProjectsRef.current = newProjects;
          });
    
          // Cleanup listener on component unmount
          return () => unsubscribe();
        }
    }, [isPublishedState, currentUser, queryClient]);

    const togglePublishStatus = async (projectId, currentStatus) => {
        const projectDoc = doc(db, 'projects', projectId);
        await updateDoc(projectDoc, { isPublished: !currentStatus });
        setIsPublishedState(!currentStatus);
    };
      
    const handleEditProject = (projectId) => {
    // Redirect to edit form for the given project
    window.location.href = `/edit-project/${projectId}`;
    };

    if (isLoading) return <div>Loading projects...</div>;
    if (error) return <p>Error: {error.message || JSON.stringify(error)}</p>;

    return (
        <div>
            {notification && <Notification message={notification}/>}
            <div className='portfolio-container'>
                <h1 className='portfolio-header'>My Projects</h1>
                <p className='portfolio-header2'>Click on a project for details.</p>
                {currentUser ? (
                    <div className='add-project-button'>
                        <AddProjectButton  />
                    </div>
                ) : (
                    <></>
                )}
                <div className='portfolio-grid'>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div className='portfolio-project-card' key={project.id}>
                                    <Link className='portfolio-project-link' to={`/portfolio/${project.route}`}>
                                    <img className='portfolio-project-image' src={project.cardImage} alt={project.title}/>
                                    <h2 className='portfolio-project-title'>{project.title}</h2>
                                    <p className='portfolio-project-description'>{project.description}</p>
                                    </Link>
                                <div className='portfolio-project-card-buttons'>
                                    {currentUser ? (
                                        <>
                                            <button id='is-published-button' onClick={() => togglePublishStatus(project.id, project.isPublished)}>
                                                { project.isPublished ? 'Hide' : 'Publish' }
                                            </button>
                                            <button id='edit-project-button' onClick={() => handleEditProject(project.id)}>Edit</button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
