import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FetchRepoData, FetchUserData } from '../API/githubData';
import { Link, useNavigate } from 'react-router';
import { motion as Motion } from 'motion/react';
import Header from './Header';
import Squares from './Squares';
import Terminal from './Terminal';
import RoboDrone from './Robo-drone';
import Icons from './Icons';
import Settings from './Settings';
import ProjectSkelton from './Project-skelton';
import Technologies from './Technologies';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {

  const [isModelOpen, setIsModalOpen] = useState(false);
  const [githubStatus, setGithubStatus] = useState({});
  const [githubRepo, setGithubRepo] = useState([]);
  const [skelton, setSkelton] = useState(false);

  const aboutRef = useRef(null);
  const navigate = useNavigate();

  const handleAboutClick = useCallback(() => {
    navigate('#about', { replace: false });
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  },[navigate]);

  // Preload Image
  useEffect(() => {
    const img = new Image();
    img.src = '/image/my.png';
  }, []);

  // Github user data Fetch
  useEffect(() => {
    const gStatus = async () => {

      const localData = localStorage.getItem('ghData');

      if (localData) {
        const { repo, status, fetchedAt } = JSON.parse(localData);

        // Only refetch if older than 24 hours
        const isExpired = Date.now() - fetchedAt > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          setGithubStatus(status);
          setGithubRepo(repo);
          return;
        }
      }
      setSkelton(true);
      const statusResult = await FetchUserData();
      const repoResult = await FetchRepoData();
      const project1 = repoResult[11];
      const project2 = repoResult[12];

      setGithubStatus(statusResult);
      setGithubRepo((prev) => ([...prev, project1, project2]));
      setSkelton(false);
      // Set data in local storage;
      localStorage.setItem('ghData', JSON.stringify({
        repo: [project1, project2],
        status: statusResult,
        fetchedAt: Date.now()
      }));

    };

    gStatus();

  }, []);

  return (
    <>
      <main>
        <Squares
          speed={0.3}
          squareSize={100}
          direction='diagonal'
          borderColor='#71717a'
          lineWidth='0.05'
        />
        <Header setIsModalOpen={setIsModalOpen} aboutRef={aboutRef} aboutClick={handleAboutClick} />

        <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />

        <section id='home'>

          <div className='home_content'>
            <Terminal />
            <RoboDrone />
          </div>

          <div className='github-data'>
            <Motion.p initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} transition={{ duration: 0.6, ease: 'easeOut' }}  className='text'><Icons name={"github"} className={'icon'} /> Followers: {githubStatus?.followers ?? 369}</Motion.p>
            <Motion.p initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.6, ease: 'easeOut'}}  className='text'><Icons name={"star"} className={'icon'} /> Stars: {githubStatus?.stars ?? 369}</Motion.p>
            <Motion.p initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{ duration: 0.6, ease: 'easeOut'}}  className='text'><Icons name={"fork"} className={'icon'} /> Forks: {githubStatus?.forks ?? 369}</Motion.p>
            <Motion.p initial={{opacity: 0, x: 50}} animate={{opacity: 1, x: 0}} transition={{ duration: 0.6, ease:'easeOut'}}  className='text'><Icons name={"commit"} className={'icon'} /> Commits: {githubStatus?.commits ?? 369}</Motion.p>
          </div>

        </section>

        <section ref={aboutRef} id='about'>

          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // triggers when 20% is visible
            transition={{ duration: 0.6, ease: 'easeOut' }} className='about-content'>
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

          <Motion.div initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }} className='img-container'>
            
            <img  src="/image/my.png" alt="profile img" loading='lazy' />

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

        <section id='recent-project'>

          <Motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }} className='project-container'>

            <h2>Recent Projects<span>.</span></h2>
            <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>
            {
              skelton ? <>
                <ProjectSkelton />
                <ProjectSkelton />
              </>
                :
                githubRepo?.map((project, index) => (

                  <Motion.div  initial={{opacity: 0, scale: 0.8 }} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }} className='project' key={index}>
                    <h3>{project.name}</h3>
                    <p className='date'>{project.created_at.split('T')[0]}</p>
                    <p className='description'>{project.description}</p>

                    <div className='image'>
                      <img src={`/image/${project.name}.png`} alt={project.name} />

                      <div className='img-btns'>
                        <button><Link to={project.homepage}>Demo <Icons name={'source'} className={'icon'} /></Link> </button>
                        <button><Link to={project.svn_url}>Code<Icons name={'code'} className={'icon'} /></Link></button>
                      </div>

                    </div>

                    <ul className='tags'>
                      {project.languages && Object.keys(project.languages).map((key) => (
                        <li key={key}><Icons name={key} />{key}</li>
                      ))
                      }
                    </ul>

                  </Motion.div>

                ))

            }

            <Motion.div  initial={{opacity: 0, scale: 0.8 }} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: 'easeOut' }} className='more-project'>
              <p>Would you like to view more of my work?</p>
              <div className='links'>
                <Link to={"/projects"}>View more projects <Icons name={'arrowRight'} className={'icon'} /> </Link>
              </div>
            </Motion.div>


          </Motion.div>
        </section>

        <Technologies />

        <Contact />

        <Footer />

      </main>
    </>
  )
};


export default Home