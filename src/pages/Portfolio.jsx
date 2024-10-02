import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import AddProjectButton from '../components/AddProjectButton';

const Portfolio = () => {
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { currentUser } = useAuth();

    useEffect(() => {
        fetchProjects();
    }, [currentUser]);

    useEffect(() => {
        fetchProjects();
      }, [projects]);

    const fetchProjects = async () => {
      const projectRef = collection(db, 'projects');

      let q;
      if (currentUser) {
        q = query(projectRef);
      } else {
        q = query(projectRef, where('isPublished', '==', true));
      }

      const querySnapshot = await getDocs(q);
      const projectList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectList);
      setError(error)
      setLoading(false);
    };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
        <div style={styles.container}>
            <h1 style={styles.header}>My Projects</h1>
            {currentUser ? (
                <div style={styles.button}>
                    <AddProjectButton  />
                </div>
            ) : (
                <></>
            )}
            <div style={styles.grid}>
                {projects.map((project) => (
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
                ))}
            </div>
        </div>
    </div>
  );
};

const togglePublishStatus = async (projectId, currentStatus) => {
    const projectDoc = doc(db, 'projects', projectId);
    await updateDoc(projectDoc, {
      isPublished: !currentStatus, // Toggle the current published status
    });

    setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, isPublished: !currentStatus } : project
        )
    );
  };
  
const handleEditProject = (projectId) => {
// Redirect to edit form for the given project
window.location.href = `/edit-project/${projectId}`;
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
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
    maxWidth: '300',
    height: '400px',
    position: 'relative',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '100%',
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
