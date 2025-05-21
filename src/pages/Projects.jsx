import React, { memo, useEffect, useState } from 'react'
import Squares from '../components/Squares'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { FetchRepoData } from '../API/githubData';
import { Link } from 'react-router';
import Icons from '../components/Icons';
import ProjectSkelton from '../components/Project-skelton';
import { motion as Motion } from 'motion/react';

const Projects = memo( function Projects() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [ghRepo, setGhRepo] = useState([]);
  const [skelton, setSkelton] = useState(false);

  // Github user data Fetch
  useEffect(() => {
    const gRepo = async () => {

      const localRepo = localStorage.getItem('ghRepo');

      if (localRepo) {
        const { repos, fetchedAt } = JSON.parse(localRepo);

        // Only refetch if older than 24 hours
        const isExpired = Date.now() - fetchedAt > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          setGhRepo(repos);
          return;
        }
      }
      setSkelton(true);
      const repoResults = await FetchRepoData();

      const project1 = repoResults[11];
      const project2 = repoResults[12];
      const project3 = repoResults[8];
      const project4 = repoResults[9];
      const project5 = repoResults[15];
      const project6 = repoResults[1];

      setGhRepo((prev) => ([...prev, project1, project2, project3, project4, project5, project6]));
      setSkelton(false);
      // Set data in local storage;
      localStorage.setItem('ghRepo', JSON.stringify({
        repos: [project1, project2, project3, project4, project5, project6],
        fetchedAt: Date.now()
      }));

    };

    gRepo();

  }, []);

  return (
    <>
      <Squares
        speed={0.3}
        squareSize={100}
        direction='diagonal'
        borderColor='#71717a'
        lineWidth='0.05'
      />
      <Header setIsModalOpen={setIsModalOpen} />

      <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />

      <section id='recent-project' className='full-project'>

        <Motion.div initial={{opacity: 0, y: 100}} whileInView={{opacity: 1, y: 0}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, ease: 'easeInOut'}} className='project-container'>

          <h2>Recent Projects<span>.</span></h2>
          <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>
          {
            skelton ? <><ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> </> : ghRepo?.map((project, index) => (

              <Motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, ease: 'circInOut'}} className='project' key={index}>
                <h3>{project?.name}</h3>
                <p className='date'>{project.created_at.split('T')[0]}</p>
                <p className='description'>{project.description}</p>

                <div className='image'>
                  <img src={`/image/${project.name}.png`} alt={project.name} loading='lazy' />

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

          <div className='more-project'>
            <p>Would you like to see more of my work? Check out my GitHub profile and give me some contributions; let's build together.</p>

            <Motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{duration: 0.3, ease: 'easeInOut'}} className='links'>
              <Link to={"https://github.com/psathul073/"}><Icons name={'gh'} className={'icon'} /> View my Github <Icons name={'arrowRight'} className={'icon'} /> </Link>
              <Link to={'/three-d'}> 3D Projects <Icons name={'three_d'} className={'icon'} /></Link>
            </Motion.div>
          </div>


        </Motion.div>

      </section>

    </>
  )
})

export default Projects