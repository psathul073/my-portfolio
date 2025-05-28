import { memo } from 'react';
import '../styles/_project-skelton.scss';
import Icons from './Icons';


const ProjectSkelton = memo(function ProjectSkelton() {
  return (

    <div className='project-sk'>
      {/* <h2>Recent Projects<span>.</span></h2>
      <p>Explore some of my latest projects below, and for more, visit my GitHub profile.</p> */}
      <div className='title'></div>
      <div className='date-sk'></div>
      <div className='description-sk'></div>

      <div className='image-sk'>
        <div><Icons name={"loading"} /></div>
      </div>

      <div className='tags-sk'>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

  )
})

export default ProjectSkelton