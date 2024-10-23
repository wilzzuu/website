import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import Footer from '../components/Footer';
import Maintenance from '../components/UnderMaintenance';
import AddProjectButton from '../components/AddProjectButton';
import Notification from '../components/Notification';
import '../styles/Portfolio.css';

const Portfolio = () => {
    const { isSidebarCollapsed, setIsSidebarCollapsed, toggleSidebar } = useSidebar();
    const { currentUser } = useAuth();
    const [notification, setNotification] = useState(null);
    const [authStatus, setAuthStatus] = useState('guest');
    const queryClient = useQueryClient();
    const prevProjectsRef = useRef([]);

    useEffect(() => {
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';

        return () => {
            document.body.style.overflowY = '';
            document.body.style.overflowX = '';
        };
    }, []);

    useEffect(() => {
        if (currentUser) {
            setAuthStatus('authenticated');
        } else {
            setAuthStatus('guest');
        }
    }, [currentUser]);

    const { data: projects, isLoading, error } = useQuery(
        ['projects', authStatus],
        async () => {
            const projectRef = collection(db, 'projects');
            let q;
            if (authStatus === 'authenticated') {
                q = query(projectRef);
            } else {
                q = query(projectRef, where('isPublished', '==', true));
            };

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        },
        {
            enabled: !!authStatus,
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
            if (authStatus === 'authenticated') {
                q = query(projectRef);
            } else {
                q = query(projectRef, where('isPublished', '==', true));
            };

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newProjects = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
        
                if (prevProjectsRef.current.length && prevProjectsRef.current.length !== newProjects.length) {
                setNotification('Projects have been added or updated.');
                setTimeout(() => setNotification(null), 5000);
                }
                
                queryClient.setQueryData(['projects', authStatus], newProjects);
                
                prevProjectsRef.current = newProjects;
            });
            
            return () => unsubscribe();
        }

    }, [authStatus, queryClient]);
    
    const togglePublishStatus = async (projectId, currentStatus) => {
        const projectDoc = doc(db, 'projects', projectId);
        await updateDoc(projectDoc, { isPublished: !currentStatus });

        setNotification(`Project ${!currentStatus ? 'published' : 'hidden'}.`);
        queryClient.invalidateQueries(['projects', authStatus]);
    };
      
    const handleEditProject = (projectId) => {
        window.location.href = `/portfolio/edit-project/${projectId}`;
    };

    if (isLoading) return <div>Loading projects...</div>;
    if (error) return <p>Error: {error.message || JSON.stringify(error)}</p>;

    return (
        <div>
            {notification && (
                <Notification
                    message={notification}
                    style={{position: 'fixed', bottom: '10px', right: '10px', padding: '10px 20px', backgroundColor: '#333', color: '#fff', borderRadius: '5px', zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}
                />
            )}
            <div className={`portfolio-container ${isSidebarCollapsed ? 'sidebar-closed': 'sidebar-open'}`}>
                <Maintenance state={true} />
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
                                    {authStatus === 'authenticated' && (
                                        <>
                                            <button id='is-published-button' onClick={() => togglePublishStatus(project.id, project.isPublished)}>
                                                { project.isPublished ? 'Hide' : 'Publish' }
                                            </button>
                                            <button id='edit-project-button' onClick={() => handleEditProject(project.id)}>Edit</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Portfolio;
