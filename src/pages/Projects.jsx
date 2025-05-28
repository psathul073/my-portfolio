import React, { memo, Suspense, useEffect, useState } from 'react'
import Header from '../components/Header'
import Settings from '../components/Settings'
import { FetchRepoData } from '../API/githubData';
import ProjectSkelton from '../components/Project-skelton';
const RecentProject = React.lazy( () => import('../components/Recent-project'));

const Projects = memo(function Projects() {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [ghRepo, setGhRepo] = useState([]);
  const [skelton, setSkelton] = useState(false);

  // Github user data Fetch
  useEffect(() => {

    const gRepo = async () => {
      try {
        const localRepo = localStorage.getItem('ghRepo');
        if (localRepo) {
          const { repos, fetchedAt } = JSON.parse(localRepo);

          // Only refetch if older than 24 hours
          const isExpired = Date.now() - fetchedAt > 24 * 60 * 60 * 1000;
          if (!isExpired) {
            setGhRepo(repos);
            return;
          }
        };

        setSkelton(true);
        const [repoResult] = await Promise.all( [FetchRepoData()]);

        // Select specific indices from repoResult
        const relevantProjects = [11, 12, 8, 9, 17, 1].map(index => repoResult[index]).filter(Boolean);
        setGhRepo(relevantProjects);


        // Set data in local storage;
        localStorage.setItem('ghRepo', JSON.stringify({
          repos: relevantProjects,
          fetchedAt: Date.now()
        }));

    } catch (error) {
      console.error('Error fetching GitHub data:', error);

    } finally {
      setSkelton(false);
    }
  };
    gRepo();

  }, []);

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />

      <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />

      <main>

        <section id='recent-project'>

          <div  className='project-container'>

            <h2>Recent Projects<span>.</span></h2>
            <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p>

            {skelton ? <><ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> <ProjectSkelton /> </> : <RecentProject ghRepo={ghRepo} /> }

          </div>

        </section>
      </main>






    </>
  )
})

export default Projects