import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router';
import Contacts from '../pages/Contacts';
import ThreeDProject from '../pages/Three-D-Project';
const Home = React.lazy(() => import('../components/Home'))
const Projects = React.lazy(() => import('../pages/Projects'));


const Routes = () => {

  return (
    <ReactRoutes>
        <Route  index element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/three-d" element={<ThreeDProject />} />
    </ReactRoutes>
  )
}


export default Routes