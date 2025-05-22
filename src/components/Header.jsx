import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import Tooltip from './Tooltip';
import Icons from './Icons';
import { motion as Motion } from "motion/react";

const Header = ({ setIsModalOpen, aboutRef, aboutClick }) => {

  const [active, setActive] = useState(() => localStorage.getItem('activeNav') || 'home');

  useEffect(() => {

    if (active == 'about') {
      aboutRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
    const activeNav = () => {
      localStorage.setItem('activeNav', active);
    }
    activeNav();

  }, [active, aboutRef])

  return (
    <Motion.header initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
    >
      <nav>
        <ul>
          <li onClick={() => setActive('home')}><Link to="/">ATHUL <span className={active == 'home' ? 'active' : ''}>.</span></Link><Tooltip data={"Home"} /></li>
          <li onClick={() => { aboutClick; setActive('about') }}><NavLink to="/about"><Icons name={"about"} className={`icon ${active == 'about' && 'active'}`} /></NavLink> <Tooltip data={"About"} /></li>
          <li onClick={() => setActive('project')}><Link to="/projects"><Icons name={"project"} className={`icon ${active == 'project' && 'active'}`} /></Link><Tooltip data={"Projects"} /></li>
          <li onClick={() => setActive('contact')}><Link to="/contact"><Icons name={"contact"} className={`icon ${active == 'contact' && 'active'}`} /></Link><Tooltip data={"Contacts"} /></li>
          <li onClick={() => setIsModalOpen(true)}><Link to=""><Icons name={"setting"} className={"icon"} /></Link><Tooltip data={"Settings"} /></li>
        </ul>
      </nav>
    </Motion.header>
  )
}

export default Header