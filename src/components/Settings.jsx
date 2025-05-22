
import React, { useEffect, useRef } from 'react'
import CustomDropdown from './Custom-dropdown';
import { motion as Motion } from "motion/react";

const Settings = ({ isModelOpen, setIsModalOpen }) => {

    // const [isModelOpen, setIsModalOpen] = useState(true);
    const settingsRef = useRef(null);
    
    // close settings on outside click
    useEffect( () => {

        const handleClickOutside = (e) =>{
            // console.log(e.target);
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
            setIsModalOpen(false);
                
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
        
    } , [setIsModalOpen]);


    return (
        isModelOpen && (<div className='settings-overlay'>
            <Motion.div initial={{opacity: 0, scale: 0.8}} animate={{ opacity: 1, scale: 1}} transition={{ duration: 0.5, ease: 'easeOut' }} className='settings' ref={settingsRef}>

                <h2>Settings <button onClick={() => setIsModalOpen(false)}>〤</button> </h2>
                <p>Change the settings of the application.</p>
                <div className='settings-options'>
                    <div className='theme'>Theme <CustomDropdown /> </div>
                </div>

            </Motion.div>
        </div>)
    )
}

export default Settings