import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import Maintenance from '../components/UnderMaintenance';
import githubIcon from '../assets/github.svg';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate(); // React Router's navigation hook
    const { isSidebarCollapsed, setIsSidebarCollapsed, toggleSidebar } = useSidebar();
    const [activeSection, setActiveSection] = useState(0);
    const sections = ['section-0', 'section-1', 'section-2', 'section-3', 'section-4']

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? 1 : -1;
            setActiveSection((prevSection) => {
                let newSection = prevSection + direction;
                if (newSection < 0) newSection = 0;
                if (newSection >= sections.length) newSection = sections.length -1;
                return newSection;
            });
        };

        window.addEventListener('wheel', handleScroll, { passive: false });

        return () => window.removeEventListener('wheel', handleScroll);
    }, [sections.length]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown') {
                setActiveSection((prev) => Math.min(prev +1, sections.length -1));
            } else if (e.key === 'ArrowUp') {
                setActiveSection((prev) => Math.max(prev -1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [sections.length]);

    useEffect(() => {
        const sectionElement = document.getElementById(`section-${activeSection}`);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeSection]);

    const handleNavigation = () => {
        navigate('/portfolio')
    };

    return (
        <div>
            <div className='home-dot-selector'>
                {sections.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${activeSection === index ? 'active-dot' : ''}`}
                        onClick={() => setActiveSection(index)}
                    ></span>
                ))}
            </div>
            <div className={`homepage-container ${isSidebarCollapsed ? 'sidebar-closed': 'sidebar-open'}`}>
                <div className='sections-container'>
                    <div id="section-0" className={`section ${activeSection === 0 ? 'active' : ''}`}>
                        <div>
                            <h1 id="section-0-header">Welcome to my website</h1>
                            <p id="section-0-paragraph">The purpose of this website is to share my projects, skills, and journey as a hobbyist developer.</p>
                            <div id="section-0-portfolio-btn">
                                <button onClick={() => handleNavigation()} className="cta-button">Explore My Work</button>
                            </div>
                        </div>
                    </div>
                    <div id="section-1" className={`section ${activeSection === 1 ? 'active' : ''}`}>
                        <div>
                            <h2 id='section-1-header'>About Me</h2>
                            <div id='section-1-paragraph'>
                                <p>
                                    I'm a self-taught hobbyist developer with some experience spread across software, web and game development.<br/>
                                    I have been learning programming and doing some personal projects since 2016, when I was around 14 years old,
                                    using online resources such as Stack Overflow, YouTube tutorials and Quora.<br/>
                                    I am motivated to learn more about programming and tech related topics and I am pursuing a career where I could apply my skills, while also acquiring new knowledge.<br/>
                                    Currently my focus is on learning more about web development, which is also why I made this website as a project where I can learn and get creative.<br/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="section-2" className={`section ${activeSection === 2 ? 'active' : ''}`}>
                        <div>
                            <h2 id='section-2-header'>Tools, Resources & Technologies I Use</h2>
                            <ul id="section-2-tools-list">
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
                                <li>Visual Studio Code</li>
                                <li>GitHub</li>
                                <li>Google Firebase</li>
                                <li>cPanel</li>
                                <li>ChatGPT</li>
                                <li>Krita</li>
                                <li id="section-2-tools-list-link"><a href="https://stackoverflow.com/">stackoverflow.com</a></li>
                                <li id="section-2-tools-list-link"><a href="https://www.w3schools.com/">w3schools.com</a></li>
                                <li id="section-2-tools-list-link"><a href="https://freecodecamp.org/learn">freecodecamp.org</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="section-3" className={`section ${activeSection === 3 ? 'active' : ''}`}>
                        <div>
                            <h2 id="section-3-header">Featured Projects</h2>
                            <div id="section-3-grid">
                                <div id="section-3-project-card">
                                    <img id="section-3-project-image" src="https://wilzzu.xyz/assets/weather_app_card_image.png" alt="Weather App Featured"></img>
                                    <h3 id='section-3-project-header'>Weather App</h3>
                                    <p id='section-3-project-text'>Weather app built in Python using Custom Tkinter. API calls are used to get weather based on geolocation.</p>
                                    <a id="section-3-project-link" href="/portfolio/weather-app">Read More</a>
                                </div>
                                {/*<div id="section-3-project-card">
                                    <img id="section-3-project-image" src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Personal Website Featured"></img>
                                    <h3 id='section-3-project-header'>Personal Website</h3>
                                    <p id='section-3-project-text'>Wesbite built with Vite, deployed on cPanel with a database on Firebase.</p>
                                    <a id="section-3-project-link" href="/portfolio/personal-website">Read More</a>
                                </div>
                                <div id="section-3-project-card">
                                    <img id="section-3-project-image" src="https://wilzzu.xyz/assets/card_image_placeholder.png" alt="Project 3"></img>
                                    <h3 id='section-3-project-header'>Featured Project 3</h3>
                                    <p id='section-3-project-text'>Placeholder description</p>
                                    <a id="section-3-project-link" href="/portfolio/">Read More</a>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                    <div id="section-4" className={`section ${activeSection === 4 ? 'active' : ''}`}>
                        <div>
                            <footer id='footer-container'>
                                <div id='footer-content'>
                                    <nav>
                                        <a id="githubLink" href="https://github.com/wilzzuu">
                                            <img id="githubIcon" src={githubIcon} alt="GitHub" />
                                            <span>GitHub</span>
                                        </a>
                                    </nav>
                                    <p id="footer-copyright">© 2024 wilzzu.xyz. All Rights Reserved.</p>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Home;
