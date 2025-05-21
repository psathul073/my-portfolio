import { useRef, useEffect, useState, memo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Drone = memo ( function Drone({ audioRef }){

  const [isAnimate, setIsAnimate] = useState(false);
  const { scene } = useGLTF("model/flying_robot/scene.gltf");
  const droneRef = useRef();
  const { camera } = useThree();

  const [mouse] = useState(() => new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());
  const target = useRef(new THREE.Vector3());

  const handleHover = useCallback(() => {
    if (!audioRef.current) return;

    if (audioRef.current.isPlaying) {
      audioRef.current.stop(); // Reset
      setIsAnimate(false);
    }
    audioRef.current.play();
    setIsAnimate(true);
  },[audioRef]);

  const handleHoverOut = useCallback(() => {
    if (audioRef.current?.isPlaying) {
      audioRef.current.stop(); // Reset
      setIsAnimate(false);
    }
  },[audioRef]);

  useEffect(() => {
    if (audioRef.current.isPlaying) {
      setIsAnimate(false);
      audioRef.current.stop();
    }
  }, [audioRef]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x = -(e.clientX / window.innerWidth) * 2 + 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouse]);

  useEffect(() => {
    droneRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [droneRef]);

  useFrame(({ clock }) => {
    raycaster.current.setFromCamera(mouse, camera);
    target.current.copy(raycaster.current.ray.origin).add(raycaster.current.ray.direction.clone().multiplyScalar(10));

    if (droneRef?.current) {
      const elapsedTime = clock.getElapsedTime();
      droneRef.current.position.y = Math.sin(elapsedTime) * 0.25;
      droneRef.current.lookAt(target.current);
      if (isAnimate) {
        droneRef.current.position.set(
          Math.random() * -0.10,
          Math.random() * -0.20,
          Math.random() * -0.10
        );
      }
    }
  });

  return <primitive ref={droneRef} object={scene} scale={[0.7, 0.7, -0.7]} onPointerOver={handleHover} onPointerOut={handleHoverOut} />;
});

export default Drone