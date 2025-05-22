import React, { memo, useEffect, useState } from 'react'
import Squares from '../components/Squares'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { FetchRepoData } from '../API/githubData';
import { Link } from 'react-router';
import Icons from '../components/Icons';
import ProjectSkelton from '../components/Project-skelton';
import { motion as Motion } from 'motion/react';
import RecentProject from '../components/Recent-project';

const Projects = memo(function Projects() {
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
      const project5 = repoResults[16];
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

      <main>
        <section id='recent-project'>
          
          <Motion.div initial={{ y: 50 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='project-container'>

            <h2>Recent Projects<span>.</span></h2>
            <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>

            { skelton ? <><ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> </> : <RecentProject ghRepo={ghRepo} />}

          </Motion.div>

        </section>
      </main>






    </>
  )
})

export default Projects