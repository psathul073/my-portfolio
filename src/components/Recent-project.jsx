import React, { memo, useEffect } from 'react';
import { Link } from 'react-router';
import Icons from './Icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const RecentProject = memo(({ ghRepo }) => {

    useEffect(() => {
  if (!ghRepo || ghRepo.length === 0) return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.project').forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });


}, [ghRepo]); // <--- watch for ghRepo changes

    return (
        <>
            { ghRepo?.map( (project, index) => (
                    <div className='project' key={project.id || index} >
            <h3>{project?.name}</h3>
            <p className='date'>{project.created_at?.split('T')[0]}</p>
            <p className='description'>{project.description}</p>

            <div className='image'>
                <img src={`/image/${project.name}.webp`} alt={project.name} loading='lazy' width="100%" height="auto" />

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

        </div>
            ))}

            {
                ghRepo?.length > 2 ? <div className='more-project'>
                    <p>Would you like to see more of my work? Check out my GitHub profile and give me some contributions; let's build together.</p>
                    <div className='links'>
                        <Link to={"https://github.com/psathul073/"}><Icons name={'gh'} className={'icon'} /> View my Github <Icons name={'arrowRight'} className={'icon'} /> </Link>
                        <Link to={'/three-d'}> 3D Projects <Icons name={'three_d'} className={'icon'} /></Link>
                    </div>
                </div> : <div  className='more-project'>
                    <p>Would you like to view more of my work?</p>
                    <div className='links'>
                        <Link to={"/projects"}>View more projects <Icons name={'arrowRight'} className={'icon'} /> </Link>
                    </div>
                </div>

            }

        </>
    )
});

RecentProject.displayName = 'RecentProject';
export default RecentProject;