import { memo } from 'react';
import '../styles/_project-skelton.scss';
import Icons from './Icons';
import { motion as Motion } from 'motion/react';


  const  ProjectSkelton = memo( function ProjectSkelton() {
  return (

    <Motion.div initial={{opacity: 0, scale: 0}} whileInView={{opacity: 1, scale: 1}}  viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, ease: 'easeIn'}} className='project-sk'>
      <div className='title'></div>
      <div className='date-sk'></div>
      <div className='description-sk'></div>

      <div className='image-sk'>
        <div><Icons name={"loading"}/></div>
      </div>

      <div className='tags-sk'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Motion.div>

  )
})

export default ProjectSkelton