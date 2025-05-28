import { useRef, useEffect, useState, memo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useDrone } from "../context/DroneContext";

const Drone = memo(function Drone({ lowSpec, audioRef }) {

  const { controller } = useDrone();
  const { scene } = useGLTF("model/flying_robot/scene.gltf");
  const droneRef = useRef();
  const { camera } = useThree();

  const [mouse] = useState(() => new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const target = useRef(new THREE.Vector3());

  const handleHover = useCallback(() => {
    if (!audioRef.current || !controller?.sound || lowSpec) return;
    if (audioRef.current.isPlaying || !controller?.sound || lowSpec) {
      audioRef.current.stop(); // Reset
    }
    audioRef.current.play();
  },[audioRef, controller?.sound, lowSpec]);

  const handleHoverOut = useCallback(() => {
    if (audioRef.current?.isPlaying) {
      audioRef.current.stop(); // Reset);
    }
  },[audioRef]);

  useEffect(() => {
    if (audioRef.current.isPlaying) {
      audioRef.current.stop();
    }
  }, [audioRef]);

  // Mouse move event to update mouse position
  // and raycaster
 
 
  useEffect(() => {
    let timeout;
    const handleMouseMove = (e) => {
      clearTimeout(timeout);
      timeout = setTimeout( () => {
        mouse.x = -(e.clientX / window.innerWidth) * 2 + 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      }, 16); // 60 FPS

    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update drone material properties based on lowSpec
  useEffect(() => {
    droneRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = !lowSpec;
        child.receiveShadow = !lowSpec;
        child.material.metalness = lowSpec ? 0.1 : 0.5;
        child.material.roughness = lowSpec ? 0.9 : 0.5;
      }
    });
  }, [lowSpec]);


// useEffect(() => {
//   if (controller?.sound && !lowSpec) {
//     if (!audioRef.current) return;

//     // Create and play the audio
//     const audio = new Audio("sounds/robot_flying.mp3");
//     audio.loop = true;
//     audio.play();
//     audioRef.current = audio;

//     const handleHover = () => audio.play();
//     // const handleHoverOut = () => {
//     //   audio.pause();
//     //   audio.currentTime = 0;
//     // };

//     droneRef.current.addEventListener("click", handleHover);
//     droneRef.current.addEventListener("hoverout", handleHoverOut);

//     return () => {
//       audio.pause();
//       audio.currentTime = 0;
//       droneRef.current.removeEventListener("hover", handleHover);
//       droneRef.current.removeEventListener("hoverout", handleHoverOut);
//     };
//   } else {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//     }
//   }
// }, [controller?.sound, lowSpec]);


// Animation and raycasting logic
  useFrame(({ clock }) => {

    if (controller?.mouseMode) {
      raycaster.current.setFromCamera(mouse, camera);
      target.current.copy(raycaster.current.ray.origin).add(raycaster.current.ray.direction.clone().multiplyScalar(10));
      droneRef.current.lookAt(target.current);
    }

    if (droneRef?.current && controller?.animation && !lowSpec) {
      const elapsedTime = clock.getElapsedTime();
      droneRef.current.position.y = Math.sin(elapsedTime) * 0.25 + 0.5;
    }

  });

  return <primitive ref={droneRef} object={scene} scale={controller?.mouseMode ? [0.7, 0.7, -0.7] : [0.7, 0.7, 0.7]} onPointerOver={handleHover} onPointerOut={handleHoverOut}  />;
});

export default Drone