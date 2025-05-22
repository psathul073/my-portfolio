import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FetchRepoData, FetchUserData } from '../API/githubData';
import { useNavigate } from 'react-router';
import { motion as Motion } from 'motion/react';
import Header from './Header';
import Terminal from './Terminal';
import Icons from './Icons';
import Settings from './Settings';
import ProjectSkelton from './Project-skelton';
import Technologies from './Technologies';
import Contact from './Contact';
import Footer from './Footer';
import About from './About';
import RecentProject from './Recent-project';
const RoboDrone = React.lazy(() => import('./Robo-drone'));
const Squares = React.lazy(() => import('./Squares'));

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
  }, [navigate]);


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
            <Motion.p initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='text'><Icons name={"github"} className={'icon'} /> Followers: {githubStatus?.followers ?? 369}</Motion.p>
            <Motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='text'><Icons name={"star"} className={'icon'} /> Stars: {githubStatus?.stars ?? 369}</Motion.p>
            <Motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='text'><Icons name={"fork"} className={'icon'} /> Forks: {githubStatus?.forks ?? 369}</Motion.p>
            <Motion.p initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='text'><Icons name={"commit"} className={'icon'} /> Commits: {githubStatus?.commits ?? 369}</Motion.p>
          </div>

        </section>

        <About aboutRef={aboutRef} />

        <section id='recent-project'>

          <Motion.div initial={{ y: 10 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='project-container'>

            <h2>Recent Projects<span>.</span></h2>
            <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>

            {skelton ? <><ProjectSkelton /> <ProjectSkelton /></> : <RecentProject ghRepo={githubRepo} />}

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