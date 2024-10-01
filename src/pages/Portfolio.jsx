import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import AddProjectButton from '../components/AddProjectButton';

const Portfolio = () => {
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { currentUser } = useAuth();

  const fetchProjects = async () => {
    try {
      const projectCollection = collection(db, 'projects'); // Reference to the 'projects' collection
      const projectSnapshot = await getDocs(projectCollection); // Fetch the documents
      const projectList = projectSnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID for React keys
        ...doc.data(), // Spread the document data
      }));
      setProjects(projectList); // Update state with fetched projects
    } catch (error) {
      setError('Failed to load projects'); // Set error state if fetching fails
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>My Projects</h1>
      {currentUser ? (
        <>
            <AddProjectButton />
        </>
      ) : (
        <></>
      )}
      
      <div style={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} style={styles.card}>
            <Link to={`/portfolio/${project.route}`} style={styles.link}>
              <img src={project.image} alt={project.title} style={styles.image} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    fontSize: '36px',
    margin: '20px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#f9f9f9',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
};

export default Portfolio;
