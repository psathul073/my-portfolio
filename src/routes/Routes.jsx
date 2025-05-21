import { Route, Routes as ReactRoutes } from 'react-router';
import Home from '../components/Home';
import Projects from '../pages/Projects';
import Contacts from '../pages/Contacts';
import ThreeDProject from '../pages/Three-D-Project';

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