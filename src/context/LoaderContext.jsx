import { createContext, useState, useEffect, useContext } from 'react';
const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');

    useEffect(() => {
       
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1000); // Simulate loading time
            return () => clearTimeout(timer);
        }


    }, [isLoading]);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading, loadingText, setLoadingText }}>
            {children}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);