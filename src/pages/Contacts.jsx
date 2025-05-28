
import { useState } from 'react';
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Settings from '../components/Settings';
import Header from '../components/Header';

const Contacts = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header setIsModalOpen={setIsModalOpen} />
      <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />
      <Contact />
      <Footer />
    </>
  )
}

export default Contacts