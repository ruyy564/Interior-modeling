import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
} from '@react-three/drei';
import { Model } from '../components/Model';

export default function Design({
  setScene,
  refControls,
  target,
  mode,
  scene,
  setTarget,
}) {
  return (
    <div className="create">
      <Canvas
        onPointerMissed={() => setTarget(null)}
        onCreated={({ scene }) => {
          setScene(scene);
        }}
      >
        <gridHelper args={[40, 40]} />
        <ambientLight />
        <PerspectiveCamera makeDefault position={[0, 15, 15]} />
        <OrbitControls ref={refControls} />
        <spotLight
          angle={0.25}
          penumbra={0.5}
          position={[0, 10, 0]}
          castShadow
        />
        {target && <TransformControls object={target} mode={mode} />}
        {scene !== null &&
          scene.children
            .filter((element) => {
              if (element?.type === 'Mesh') return true;
            })
            .map((element) => {
              return (
                <Model
                  object={element}
                  camera={refControls}
                  key={element.uuid}
                />
              );
            })}
      </Canvas>
    </div>
  );
}
