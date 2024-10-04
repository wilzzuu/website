import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
    const navigate = useNavigate(); // React Router's navigation hook

    const handleNavigation = () => {
        navigate('/portfolio')
    }
  return (
    <div>
        <div className="hero-section" style={styles.container}>
            <div style={styles.welcomeContainer}>
                <h1 style={styles.mainHeader}>Welcome to my personal website</h1>
                <p style={styles.mainParagraph}>The purpose of this website is to share my projects, skills, and journey as a hobbyist developer.</p>
                <div style={styles.portfolioButton}>
                    <button onClick={() => handleNavigation()} className="cta-button">Explore My Work</button>
                </div>
            </div>
            <section id="about-section-id" className="about-section" style={styles.aboutMe}>
                <h2>About Me</h2>
                <div>
                    <p>I'm a self-taught hobbyist developer with some experience spread across software, web and game development.</p>
                    <p>I have been learning programming and doing personal projects since I was 15 years old, using online resources such as Stack Overflow, YouTube tutorials and Quora (see next section).</p>
                    <p>I am motivated to learn about programming and tech related topics and I am pursuing a career where I could apply my skills, while also aquiring new knowledge.</p>
                </div>
            </section>
            <section id="skills-section-id" className="skills-section" style={styles.skillsSection}>
                <h2>Tools, Resources & Technologies I Use</h2>
                <ul className="skills-list" style={styles.skillsList}>
                    <li>● HTML</li>
                    <li>● CSS</li>
                    <li>● JavaScript</li>
                    <li>● React</li>
                    <li>● Node.js</li>
                    <li>● Python</li>
                    <li>● C#</li>
                    <li>● Godot Engine</li>
                    <li>● Unity Engine</li>
                    <li>● Visual Studio 2022</li>
                    <li>● GitHub</li>
                    <li>● Google Firebase</li>
                    <li>● cPanel</li>
                    <li>● ChatGPT</li>
                    <li style={styles.skillSectionLink}><a href="https://www.w3schools.com/">● w3schools.com</a></li>
                    <li style={styles.skillSectionLink}><a href="https://freecodecamp.org/learn">● freecodecamp.org</a></li>
                </ul>
            </section>
            <section id="featured-id" className="featured-projects">
                <h2 id="featuredTitle" style={styles.featuredProjectsTitle}>Featured Projects</h2>
                <div style={styles.featuredProjectsGrid}>
                    <div className="featuredProjectCard" style={styles.featuredProjectCard}>
                        <img style={styles.featuredProjectImage} src="https://wilzzu.xyz/assets/weather_app_card_image.png" alt="Project 1"></img>
                        <h3>Weather App</h3>
                        <p>Weather app built in Python using Custom Tkinter. API calls are used to get weather based on geolocation.</p>
                        <a style={styles.featuredProjectLink} href="/portfolio/weather-app">Read More</a>
                    </div>
                    {/*<div className="featuredProjectCard" style={styles.featuredProjectCard}>
                        <img style={styles.featuredProjectImage} src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Project 2"></img>
                        <h3>Personal Website</h3>
                        <p>Wesbite built with Vite, deployed on cPanel with a database on Firebase.</p>
                        <a style={styles.featuredProjectLink} href="/portfolio/personal-website">Read More</a>
                    </div>
                    <div className="featuredProjectCard" style={styles.featuredProjectCard}>
                        <img style={styles.featuredProjectImage} src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Project 3"></img>
                        <h3>Featured Project 3</h3>
                        <p>Placeholder description</p>
                        <a style={styles.featuredProjectLink} href="/portfolio/">Read More</a>
                    </div>*/}
                </div>
            </section>
        </div>
        <footer style={styles.footer}>
            <div style={styles.footerItem}>
                <a href="https://github.com/wilzzuu" target="_blank">GitHub</a>
            </div>
            <div className="footer-copyright" style={styles.footerCopyright}>
                <p>© 2024 wilzzu.xyz. All Rights Reserved.</p>
            </div>
        </footer>
    </div>
  );
}

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    welcomeContainer: {
        background: '#b69c8b',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    mainHeader: {
        textAlign: 'center',
        fontSize: '36px',
        margin: '10px 0 20px',
    },
    mainParagraph: {
        textAlign: 'center',
        fontSize: '18px',
        margin: '0 0 20px',
    },
    portfolioButton: {
        textAlign: 'center',
        fontSize: '18px',
        margin: '30px 0 auto',
    },
    aboutMe: {
        background: '#b69c8b',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontSize: '20px',
        margin: '40px 0 20px',
    },
    skillsSection: {
        background: '#b69c8b',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontSize: '18px',
        margin: '40px auto',
    },
    skillsList: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    skillSectionLink: {
        textDecoration: 'underline',
        color: 'inherit',
    },
    featuredProjectsTitle:{
        textAlign: 'center',
        fontSize: '28px',
        margin: '40px 0 20px',
    },
    featuredProjectsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        margin: '0 0 40px',
    },
    featuredProjectCard: {
        background: '#b69c8b',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '300',
        height: '400px',
        position: 'relative',
        textAlign: 'center',
    },
    featuredProjectLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    featuredProjectImage: {
        width: '300px',
        height: '150px',
        objectFit: 'cover',
    },
    footer: {
        backgroundColor: '#333',
        padding: '10px 10px',
    },
    footerItem: {
        padding: '10px',
        gap: '10px',
    },
    footerCopyright: {
    }
}

export default Home;
