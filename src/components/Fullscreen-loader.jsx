import React from 'react'
import { useLoader } from '../context/LoaderContext';

const FullscreenLoader = ( ) => {
    const { loadingText  } = useLoader();

    const loaderStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    };

    const textStyle = {
        color: "var(--text-color)",
        fontSize: "clamp(1em, 1vw + 0.5em , 1.4em)",
        fontFamily: "monospace",
    };

    return (
        <div style={loaderStyle}>
      <div style={textStyle}>{loadingText}</div>
    </div>
    )
}

export default FullscreenLoader