import { motion as Motion } from "motion/react";
import { Link } from 'react-router';
import Icons from "./Icons";

const About = ({ aboutRef }) => {


  return (
        <section ref={aboutRef} id='about'>

          <Motion.div
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // triggers when 20% is visible
            transition={{ duration: 0.5, ease: 'easeOut' }} className='about-content'>
            <h1>About Me<span>.</span></h1>
            <p>
              Hey! I'm Athul, a self-taught Full Stack Developer from Kerala, India. I love building web apps with React, Node.js, and PostgreSQL, and I'm always experimenting with new tools and ideas. <br />
              Whether it’s creating a personal portfolio, a movie tracker, or fun games, I enjoy coding things that are both useful and fun. <br />
              <br /> I’m passionate about learning, solving problems, and constantly improving. Right now, I’m diving deeper into 3D development with Three.js and Blender. Let’s build something cool together!
            </p>

            <div className='about-content-btns'>
              <Link to={'https://github.com/psathul073/'}><Icons name={'gh'} />View My Github <Icons name={'arrowRight'} className={'icon'} /> </Link>
              <Link to={'/contact'}>Hire me <Icons name={'arrowRight'} className={'icon'} />  </Link>
            </div>

          </Motion.div>

          <Motion.div initial={{ scale: 0.9}} whileInView={{ scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='img-container'>
            
            <img src="/image/my.webp" alt="profile img" loading='lazy' />

            <div className='img-text'>

              <h3>My Mission ⏳</h3>
              <p>Develop. Discover. Deploy. Never revert—only push forward.</p>

              <div className='img-icons'>
                <Link to={'https://github.com/psathul073/'}><Icons name={'gh'} className={'icon'} /> </Link>
                <Link><Icons name={'yt'} className={'icon'} /> </Link>
                <Link to={'https://www.instagram.com/d9.coder/'}><Icons name={'ig'} className={'icon'} /></Link>
                <Link to={'https://www.linkedin.com/in/athul-fullstack'}><Icons name={'linkedin'} className={'icon'} /></Link>
              </div>

            </div>
          </Motion.div>

        </section>
  )
}

export default About