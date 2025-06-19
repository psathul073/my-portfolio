import React, { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import { FetchRepoData, FetchUserData } from '../API/githubData';
import { useNavigate } from 'react-router';
import Header from './Header';
import Icons from './Icons';
import Settings from './Settings';
import ProjectSkelton from './Project-skelton';
import Technologies from './Technologies';
import Contact from './Contact';
import Footer from './Footer';
import About from './About';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Optimize imports 
const RoboDrone = React.lazy(() => import('./Drone-viewer'));
const Terminal = React.lazy(() => import('./Terminal'));
const RecentProject = React.lazy( () => import('./Recent-project'));
gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const aboutRef = useRef(null);
  const navigate = useNavigate();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [githubStatus, setGithubStatus] = useState({});
  const [githubRepo, setGithubRepo] = useState([]);
  const [skelton, setSkelton] = useState(false);


  const handleAboutClick = useCallback(() => {
    navigate('#about', { replace: false });
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [navigate]);

  // GitHub data fetch
  useEffect(() => {
    const gStatus = async () => {
      try {
        const localData = localStorage.getItem('ghData');
        if (localData) {
          const { repo, status, fetchedAt } = JSON.parse(localData);
          const isExpired = Date.now() - fetchedAt > 24 * 60 * 60 * 1000;
          if (!isExpired) {
            setGithubStatus(status);
            setGithubRepo(repo);
            return;
          }
        }

        setSkelton(true);
        const [statusResult, repoResult] = await Promise.all([
          FetchUserData(),
          FetchRepoData()
        ]);

        // console.log(repoResult, '==Repo');
        
        const relevantProjects = [14, 3].map( index => repoResult[index]).filter(Boolean);
        console.log(relevantProjects);
        
        setGithubStatus(statusResult);
        setGithubRepo(relevantProjects);

        localStorage.setItem('ghData', JSON.stringify({
          repo: relevantProjects,
          status: statusResult,
          fetchedAt: Date.now()
        }));
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
      } finally {
        setSkelton(false);
      }
    };

    gStatus();
  }, []);


  return (
    <>

      <Header setIsModalOpen={setIsModalOpen} aboutRef={aboutRef} aboutClick={handleAboutClick} />

      <main>
        {/* <Squares
          speed={0.5}
          squareSize={100}
          direction='diagonal'
          borderColor='#71717a'
          lineWidth='0.05'
        /> */}

        <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />

        <section id='home'>

          <div className='home_content'>
            <Terminal />
            <RoboDrone />

          </div>

          <div className='github-data'>
            <p className='text'><Icons name={"github"} className={'icon'} /> Followers: {githubStatus?.followers ?? 369}</p>
            <p className='text'><Icons name={"star"} className={'icon'} /> Stars: {githubStatus?.stars ?? 369}</p>
            <p className='text'><Icons name={"fork"} className={'icon'} /> Forks: {githubStatus?.forks ?? 369}</p>
            <p className='text'><Icons name={"commit"} className={'icon'} /> Commits: {githubStatus?.commits ?? 369}</p>
          </div>

        </section>

        <About aboutRef={aboutRef} />

        <section id='recent-project'>

          <div className='project-container'>

            <h2>Recent Projects<span>.</span></h2>
            <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>

            {skelton ? <><ProjectSkelton /> <ProjectSkelton /></> : <RecentProject ghRepo={githubRepo} />}

          </div>

        </section>

        <Technologies />

        <Contact />

      </main>
      <Footer />
    </>
  )
};


export default Home