import { Link } from 'react-router';
import { motion as Motion } from 'motion/react';
import Icons from './Icons';

const RecentProject = ({ ghRepo }) => {
    return (
        <>

            {
                ghRepo?.map((project, index) => (

                    <Motion.div initial={{ y: 10 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='project' key={index}>
                        <h3>{project?.name}</h3>
                        <p className='date'>{project.created_at.split('T')[0]}</p>
                        <p className='description'>{project.description}</p>

                        <div className='image'>
                            <img src={`/image/${project.name}.webp`} alt={project.name} loading='lazy' />

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
            {
                ghRepo.length > 2 ? <div className='more-project'>
                    <p>Would you like to see more of my work? Check out my GitHub profile and give me some contributions; let's build together.</p>
                    <Motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='links'>
                        <Link to={"https://github.com/psathul073/"}><Icons name={'gh'} className={'icon'} /> View my Github <Icons name={'arrowRight'} className={'icon'} /> </Link>
                        <Link to={'/three-d'}> 3D Projects <Icons name={'three_d'} className={'icon'} /></Link>
                    </Motion.div>
                </div> : <Motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: 'easeOut' }} className='more-project'>
                    <p>Would you like to view more of my work?</p>
                    <div className='links'>
                        <Link to={"/projects"}>View more projects <Icons name={'arrowRight'} className={'icon'} /> </Link>
                    </div>
                </Motion.div>

            }

        </>
    )
}

export default RecentProject