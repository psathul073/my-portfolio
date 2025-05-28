import { useRef, useEffect } from 'react';

const Squares = ({
  direction = 'right',
  speed = 1,
  borderColor = '#94a3b8',
  squareSize = 40,
  hoverFillColor = '#f9fafb',
  lineWidth = 1,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);

  const customStyle = {
    position:'absolute', top: 0, left: 0, width:'100%', height:'100%', border: 'none', pointerEvent: 'none', zIndex: -1,
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y
          ) {
            // ctx.fillStyle = hoverFillColor; // Uncomment for hover effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent fill
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = lineWidth;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }


    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      // canvas.removeEventListener('mousemove', handleMouseMove);
      // canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, lineWidth]);

  return <canvas ref={canvasRef} className={`squares-canvas ${className}`} style={customStyle}></canvas>;
};

export default Squares;
