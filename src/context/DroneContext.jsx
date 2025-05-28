import { createContext, useState, useEffect, useContext } from "react";

const DroneContext = createContext();

export const DroneProvider = ({ children }) => {

    const [controller, setController] = useState(() => {
        const savedController = localStorage.getItem('controller');
        try {
            return savedController ? JSON.parse(savedController) : {
                mouseMode: true,
                sound: false,
                animation: false
            };
        } catch {
            return {
                mouseMode: true,
                sound: false,
                animation: false
            };
        }

    });

    useEffect(() => {
        localStorage.setItem('controller', JSON.stringify(controller));
    }, [controller]);

    return (
        <DroneContext.Provider value={{ controller, setController }}>
            {children}
        </DroneContext.Provider>
    )
};
export const useDrone = () => useContext(DroneContext);