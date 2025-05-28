import React, { useState } from 'react'
import Header from '../components/Header'
import Settings from '../components/Settings'

const ThreeDProject = () => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  return (
    <main>
     <Squares
        speed={0.3}
        squareSize={100}
        direction='diagonal'
        borderColor='#71717a'
        lineWidth='0.05'
      />
      <Header setIsModalOpen={setIsModalOpen} />
      <Settings isModelOpen={isModelOpen} setIsModalOpen={setIsModalOpen} />
      <section id='three-d-project'>
        <div className='three-dP-container'>
          <h2>3D Projects<span>.</span></h2>
          <p>Added soon...</p>
        </div>
      </section>
    </main>

  )
}

export default ThreeDProject