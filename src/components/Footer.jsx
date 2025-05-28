import React, { useEffect } from 'react'
import { Link } from 'react-router';
import gsap from 'gsap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        gsap.from('.footer-content',{
              y: 50,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                  trigger: '.footer-content',
                  start: 'top 90%',
                  toggleActions: 'play none none none'
              }
          });
    },[])
    return (
        <footer id='footer'>
            <div className='footer-content'>

                <div className='divider'></div>
                <p>Copyright &copy; 2025 - {currentYear} Athul PS</p>
                <div className='links'>
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
                </div>
            </div>
        </footer>

    )
}

export default Footer