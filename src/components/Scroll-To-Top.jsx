
import React, { useEffect } from 'react';
import { useLocation } from 'react-router'

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      if (pathname !=='/about') {
          window.scrollTo(0, 0); // Scrolls to top whenever the route changes
      }
      
    },[pathname])

  return null;
}

export default ScrollToTop;