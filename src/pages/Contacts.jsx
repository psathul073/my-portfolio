
import { useState } from 'react';
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Settings from '../components/Settings';
import Squares from '../components/Squares';
import Header from '../components/Header';

const Contacts = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);

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
      <Contact />
      <Footer />
    </>
  )
}

export default Contacts