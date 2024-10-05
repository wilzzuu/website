import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc, limit } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import AddProjectButton from '../components/AddProjectButton';

const fetchProjects = async (user) => {
    const projectRef = collection(db, 'projects');

    let q;
    if (user) {
        q = query(projectRef, limit(10));
    } else {
        q = query(projectRef, where('isPublished', '==', true), limit(10));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


const Portfolio = () => {
    const { currentUser } = useAuth();

    const { data: projects, isLoading, error } = useQuery(
        ['projects', currentUser],
        () => fetchProjects(currentUser),
        {
            enabled: !!currentUser || currentUser === null,
            cacheTime: 72000000, // 2h cache time
            staleTime: 36000000, // 1h stale time
            refetchOnWindowFocus: true,
            refetchOnReconnect: false,
            keepPreviousData: true,
        }
    );

    const togglePublishStatus = async (projectId, currentStatus) => {
        const projectDoc = doc(db, 'projects', projectId);
        await updateDoc(projectDoc, { isPublished: !currentStatus });
    };
      
    const handleEditProject = (projectId) => {
    // Redirect to edit form for the given project
    window.location.href = `/edit-project/${projectId}`;
    };

    if (isLoading) return <div>Loading projects...</div>;

    if (error) return <p>Error: {error.message || JSON.stringify(error)}</p>;

    return (
        <div>
            <div style={styles.container}>
                <h1 style={styles.header}>My Projects</h1>
                <p style={styles.header2}>Click on a project for details.</p>
                {currentUser ? (
                    <div style={styles.button}>
                        <AddProjectButton  />
                    </div>
                ) : (
                    <></>
                )}
                <div style={styles.grid}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} style={styles.card}>
                                <Link to={`/portfolio/${project.route}`} style={styles.link}>
                                <img src={project.cardImage} alt={project.title} style={styles.image} />
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                                </Link>
                                <div style={styles.buttons}>
                                    {currentUser ? (
                                        <>
                                            <button style={styles.isPublishedButton} onClick={() => togglePublishStatus(project.id, project.isPublished)}>
                                                { project.isPublished ? 'Hide' : 'Publish' }
                                            </button>
                                            <button style={styles.editProjectButton} onClick={() => handleEditProject(project.id)}>Edit</button>
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

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  button: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    fontSize: '36px',
    margin: '10px 0 20px',
  },
  header2: {
    textAlign: 'center',
    fontSize: '20px',
    margin: '5px 0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#b69c8b',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    height: '400px',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '300px',
    height: '150px',
    objectFit: 'cover',
  },
  buttons: {
    position: 'absolute',
    bottom: '5px',
    left: '10px',
  },
  isPublishedButton: {
    textAlign: 'left',
    margin: 'auto',
    bottom: '10px'
  },
  editProjectButton: {
    textAlign: 'left',
    margin: '10px',
    bottom: '10px'
  }
};

export default Portfolio;
