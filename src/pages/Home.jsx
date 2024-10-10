import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Global.css';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate(); // React Router's navigation hook

    const handleNavigation = () => {
        navigate('/portfolio')
    };
    return (
        <div>
            <div className="hero-section">
                <div className="welcome-container">
                    <h1 className="main-header">Welcome to my personal website</h1>
                    <p className="main-paragraph">The purpose of this website is to share my projects, skills, and journey as a hobbyist developer.</p>
                    <div className="portfolio-button">
                        <button onClick={() => handleNavigation()} className="cta-button">Explore My Work</button>
                    </div>
                </div>
                <section className="about-section">
                    <h2 className='about-section-header'>About Me</h2>
                    <div className='about-section-text'>
                        <p>
                            I'm a self-taught hobbyist developer with some experience spread across software, web and game development.<br/>
                            I have been learning programming and doing personal projects since around 2016, when I was 14 years old,
                            using online resources such as Stack Overflow, YouTube tutorials and Quora (next section for details).<br/>
                            I am motivated to learn more about programming and tech related topics and I am pursuing a career where I could apply my skills, while also acquiring new knowledge.<br/>
                        </p>
                    </div>
                </section>
                <section className="tools-section">
                    <h2 className='tools-section-header'>Tools, Resources & Technologies I Use</h2>
                    <ul className="tools-list">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Python</li>
                        <li>SQlite3</li>
                        <li>C#</li>
                        <li>Godot Engine</li>
                        <li>Unity Engine</li>
                        <li>Visual Studio 2022</li>
                        <li>GitHub</li>
                        <li>Google Firebase</li>
                        <li>cPanel</li>
                        <li>ChatGPT</li>
                        <li className="tools-list-link"><a href="https://www.w3schools.com/">w3schools.com</a></li>
                        <li className="tools-list-link"><a href="https://freecodecamp.org/learn">freecodecamp.org</a></li>
                    </ul>
                </section>
                <section className="featured-projects-section">
                    <h2 className="featured-projects-title">Featured Projects</h2>
                    <div className="featured-projects-grid">
                        <div className="featured-project-card">
                            <img className="featured-project-image" src="https://wilzzu.xyz/assets/weather_app_card_image.png" alt="Weather App Featured"></img>
                            <h3 className='featured-project-header'>Weather App</h3>
                            <p className='featured-project-text'>Weather app built in Python using Custom Tkinter. API calls are used to get weather based on geolocation.</p>
                            <a className="featured-project-link" href="/portfolio/weather-app">Read More</a>
                        </div>
                        {/*<div className="featured-project-card">
                            <img className="featured-project-image" src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Personal Website Featured"></img>
                            <h3 className='featured-project-header'>Personal Website</h3>
                            <p className='featured-project-text'>Wesbite built with Vite, deployed on cPanel with a database on Firebase.</p>
                            <a className="featured-project-link" href="/portfolio/personal-website">Read More</a>
                        </div>
                        <div className="featured-project-card">
                            <img className="featured-project-image" src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Project 3"></img>
                            <h3 className='featured-project-header'>Featured Project 3</h3>
                            <p className='featured-project-text'>Placeholder description</p>
                            <a className="featured-project-link" href="/portfolio/">Read More</a>
                        </div>*/}
                    </div>
                </section>
            </div>
            <footer className="footer">
                <div className="footer-item">
                    <a href="https://github.com/wilzzuu" target="_blank">GitHub</a>
                </div>
                <div className="footer-copyright">
                    <p>© 2024 wilzzu.xyz. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
