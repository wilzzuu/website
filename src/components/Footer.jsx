import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import githubIcon from '../assets/github.svg';
import '../styles/Footer.css';

const Footer = () => {
    const { isSidebarCollapsed } = useSidebar();

    return (
        <footer className={`footer-container ${isSidebarCollapsed ? 'sidebar-closed' : 'sidebar-open'}`}>
            <div className='footer-content'>
                <nav>
                    <a className="githubLink" href="https://github.com/wilzzuu">
                        <img className="githubIcon" src={githubIcon} alt="GitHub" />
                        <span>GitHub</span>
                    </a>
                </nav>
                <p className="footer-copyright">© 2024 wilzzu.xyz. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;