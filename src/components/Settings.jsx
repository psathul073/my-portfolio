
import React, { useEffect, useRef } from 'react'
import CustomDropdown from './Custom-dropdown';
import { motion as Motion } from "motion/react";
import ToggleSwitch from './ToggleSwitch';
import { useDrone } from '../context/DroneContext';
import  gsap from 'gsap';

const Settings = ({ isModelOpen, setIsModalOpen }) => {
    // const [isModelOpen, setIsModalOpen] = useState(true);
    const settingsRef = useRef(null);
    const { controller, setController } = useDrone();


    const movement = (e) => {
        // console.log(e.target.checked);
        const isChecked = e.target.checked;
        setController((prev) => ({ ...prev, mouseMode: isChecked }));
    };

    const sound = (e) => {
        const isChecked = e.target.checked;
        setController((prev) => ({ ...prev, sound: isChecked }));
    };
    const animation = (e) => {
        const isChecked = e.target.checked;
        setController((prev) => ({ ...prev, animation: isChecked }));
    }

    // close settings on outside click
    useEffect(() => {

        const handleClickOutside = (e) => {
            // console.log(e.target);
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
                setIsModalOpen(false);

            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [setIsModalOpen]);

    useEffect(() => {
          if (isModelOpen) {
        gsap.fromTo(settingsRef.current, 
            { opacity: 0, y: -50 }, 
            { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", display: "block" }
        );
    } else {
        gsap.to(settingsRef.current, {
            opacity: 0,
            y: -50,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
                settingsRef.current.style.display = 'none';
            }
        });
    }
    }, [isModelOpen]);

    return (
       <div className={`settings-overlay ${isModelOpen ? 'active' : 'inactive'}`}>
        
            <div className='settings' ref={settingsRef}>

                <h2>Settings <button onClick={() => setIsModalOpen(false)}>〤</button> </h2>
                <p>Change the settings of the application.</p>
                <div className='settings-options'>
                    <div className='theme'>Theme <CustomDropdown /> </div>

                    <div className='drone-settings'>
                        <h3>Drone Settings </h3>
                        <p>Change the settings of the drone.</p>
                        <div className='control-switches'>
                            <p>Mouse movement <ToggleSwitch handleFun={movement} isChecked={controller?.mouseMode} /></p>
                            <p>Sound <ToggleSwitch handleFun={sound} isChecked={controller?.sound} /></p>
                            <p>Animation <ToggleSwitch handleFun={animation} isChecked={controller?.animation} /></p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    
    )
}

export default Settings