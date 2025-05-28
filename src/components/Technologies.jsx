
import React, { memo, useEffect } from 'react'
import Icons from './Icons'
import { Link } from 'react-router';
import { motion as Motion } from 'motion/react';
import gsap from 'gsap';

const Technologies = memo ( function Technologies() {

  const technologies = [
    {
      id: 0,
      name: 'HTML',
      icon: <Icons name={'HTML'} />,
      link: 'https://html.spec.whatwg.org/'
    },
    {
      id: 1,
      name: 'CSS',
      icon: <Icons name={'CSS'} />,
      link: 'https://www.w3.org/TR/css/#css'
    },
    {
      id: 2,
      name: 'JavaScript',
      icon: <Icons name={'JavaScript'} />,
      link: 'https://ecma-international.org/'
    },
    {
      id: 3,
      name: 'Bootstrap',
      icon: <Icons name={'bootstrap'} />,
      link: 'https://getbootstrap.com/'
    },
    {
      id: 4,
      name: 'TailwindCSS',
      icon: <Icons name={'tailwind'} />,
      link: 'https://tailwindcss.com/'
    },
    {
      id: 5,
      name: 'Sass',
      icon: <Icons name={'sass'} />,
      link: 'https://sass-lang.com/'
    },
    {
      id: 6,
      name: 'React',
      icon: <Icons name={'react'} />,
      link: 'https://react.dev/'
    },
    {
      id: 7,
      name: 'React Query',
      icon: <Icons name={'react_query'} />,
      link: 'https://tanstack.com/query/latest'
    },
    {
      id: 8,
      name: 'React Router',
      icon: <Icons name={'reactrouter'} />,
      link: 'https://reactrouter.com/'
    },
    {
      id: 9,
      name: 'Axios',
      icon: <Icons name={'axios'} />,
      link: 'https://axios-http.com/docs/intro'
    },
    {
      id: 10,
      name: 'Git',
      icon: <Icons name={'git'} />,
      link: 'https://git-scm.com/'
    },
    {
      id: 11,
      name: 'Github',
      icon: <Icons name={'gh'} />,
      link: 'https://github.com/'
    },
    {
      id: 12,
      name: 'NPM',
      icon: <Icons name={'npm'} />,
      link: 'https://www.npmjs.com/'
    },
    {
      id: 13,
      name: 'Node.js',
      icon: <Icons name={'node_js'} />,
      link: 'https://nodejs.org/en'
    },
    {
      id: 14,
      name: 'Express.js',
      icon: <Icons name={'express_js'} />,
      link: 'https://expressjs.com/'
    },
    {
      id: 15,
      name: 'Internet Computer',
      icon: <Icons name={'icp'} />,
      link: 'https://internetcomputer.org/'
    },
    {
      id: 16,
      name: 'Three.js',
      icon: <Icons name={'three_js'} />,
      link: 'https://threejs.org/'
    },
    {
      id: 17,
      name: 'PostgreSQL',
      icon: <Icons name={'postgresql'} />,
      link: 'https://www.postgresql.org/'
    },
    {
      id: 18,
      name: 'MongoDB',
      icon: <Icons name={'mongoDB'} />,
      link: 'https://www.mongodb.com/'
    },
    {
      id: 19,
      name: 'Firebase',
      icon: <Icons name={'firebase'} />,
      link: 'https://firebase.google.com/'
    },
    {
      id: 20,
      name: 'Sequelize',
      icon: <Icons name={'sequelize'} />,
      link: 'https://sequelize.org/'
    },
    {
      id: 21,
      name: 'Docker',
      icon: <Icons name={'docker'} />,
      link: 'https://www.docker.com/'
    },
    {
      id: 22,
      name: 'Blender',
      icon: <Icons name={'blender'} />,
      link: 'https://www.blender.org/'
    },
    {
      id: 23,
      name: 'Canva',
      icon: <Icons name={'canva'} />,
      link: 'https://www.canva.com/'
    },
  ]

  useEffect(() => {
    gsap.from('.tools-container',{
      y: 60,
      opacity:0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tools-container',
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    })
  },[]);

  return (
      <section id='technologies'>
        <div className='tech-content'>
          <h2>Technologies I use<span>.</span></h2>
          <p>I have experience working with a wide range of technologies over the years. Here are some of the technologies I am familiar with:</p>

          <div className='tools-container'>
            {
              technologies.map((tec) => (
                <Link className='tech-tools' key={tec.id} to={tec.link}>
                  {tec.icon}
                  <p>{tec.name}</p>
                </Link>
              ))
            }
          </div>
          <p>🙂 Not at all!</p>

        </div>
      </section>
  )
})

export default Technologies