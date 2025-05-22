import React from 'react'
import { Link } from 'react-router';
import { motion as Motion } from 'motion/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <main>
            <section id='footer'>
                <footer className='footer-content'>
                    <div className='divider'></div>
                    <p>Copyright &copy; 2025 - {currentYear} Athul PS</p>
                    <Motion.div  initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}}  viewport={{ once: true, amount: 0.2 }} className='links'>
                        <ul>
                            <p>Important &#x1F517;</p>
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/projects'}>Project</Link></li>
                            <li><Link>Blog</Link></li>
                        </ul>
                        <ul>
                            <p>Social</p>
                            <li><Link to={'https://www.instagram.com/d9.coder/'}>Instagram</Link></li>
                            <li><Link to={'https://github.com/psathul073/'}>Github</Link></li>
                            <li><Link to={'https://www.linkedin.com/in/athul-fullstack'}>Linkedin</Link></li>
                        </ul>
                        <ul>
                            <p>Other</p>
                            <li><Link to={'/contact'}>Contact</Link></li>
                            <li><Link to={'https://codepen.io/Athul369'}>Codepen</Link></li>
                            <li><Link to={'/three-d'}>3D</Link></li>
                        </ul>
                    </Motion.div>
                </footer>
            </section>
        </main>

    )
}

export default Footer