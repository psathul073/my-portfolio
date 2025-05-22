import { Canvas } from "@react-three/fiber";
import { Html, PositionalAudio, useProgress } from "@react-three/drei";
import Drone from "./Drone-viewer";
import { Suspense, useRef, memo } from "react";
import Icons from "./Icons";

const RoboDrone = memo( function RoboDrone() {

  const audioRef = useRef();

  function Loader() {
    // const { progress } = useProgress();
    // return <Html center style={{ textWrap: 'nowrap', color: '#4a65de' }}>{progress}% loaded</Html>;
    return <Html><Icons name={'loading'} /> </Html>;
  }

  return (
    <div
      className="drone-container" 
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
      >

        <ambientLight intensity={1} />
        <spotLight
          position={[0, 3, 2]}
          intensity={15}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Loader />}>
          <Drone castShadow audioRef={audioRef} />
          {/* Shadow-receiving ground (cylinder) */}
          <mesh position={[0, -1, 0]} receiveShadow>
            <cylinderGeometry args={[1.3, 1, 0.4, 32]} />
            <meshStandardMaterial
              color={'blue'}
              metalness={0.7}
              roughness={0.5}
            />
          </mesh>
        </Suspense>
        <PositionalAudio
          ref={audioRef}
          url="/sound/r2_d2_sound.mp3"
          distance={5}
          loop={false}
          autoplay={false} />
      </Canvas>

    </div>
  );
});

export default RoboDrone;
