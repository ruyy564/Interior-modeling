import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  TransformControls,
  useCursor,
  useGLTF,
} from '@react-three/drei';
import { useControls } from 'leva';
import create from 'zustand';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import {
  BoxGeometry,
  MeshPhongMaterial,
  LoaderUtils,
  Mesh,
  gridHelper,
  group,
  ObjectLoader,
} from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MyLoader } from './MyLoader';
const useStore = create((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
}));

export default function App() {
  const refControls = useRef();
  const file = useRef();
  const [scene, setScene] = useState(null);
  const { target, setTarget } = useStore();
  const { mode } = useControls({
    mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
  });

  const handleLoad = (elm) => {
    console.log(elm.current.files);
    new Response(elm.current.files[0]).json().then(
      (json) => {
        var loader = new MyLoader();
        console.log(json);
        loader.parse(json, null, function (gltf) {
          console.log(gltf);
          setScene({
            ...scene,
            children: [...scene.children, ...gltf.scene.children],
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  function loadFromFile() {
    new GLTFLoader().load('wall.gltf', function (gltf) {
      setScene({
        ...scene,
        children: [...scene.children, gltf.scene.children[0]],
      });
    });
  }
  function handleLoadWall() {
    let obj = new BoxGeometry(2, 8, 8);
    const sunMaterial = new MeshPhongMaterial({ emissive: 0xffff00 });
    const sunMesh = new Mesh(obj, sunMaterial);
    setScene({
      ...scene,
      children: [...scene.children, sunMesh],
    });
  }
  return (
    <>
      <Canvas
        onPointerMissed={() => setTarget(null)}
        onCreated={({ gl, raycaster, scene }) => {
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
            .filter((element, index) => {
              if (element?.type === 'Mesh') return true;
            })
            .map((element, index) => {
              //console.log(element);
              return (
                <Model object={element} cam={refControls} key={element.uuid} />
              );
            })}
      </Canvas>

      <button onClick={() => handleExport(scene)}>Export ELTF</button>
      <button onClick={loadFromFile}>Add wall</button>
      <input type="file" ref={file} onChange={handleLoad.bind(null, file)} />
    </>
  );
}

function Model({ object, cam }) {
  //console.log(object);
  const setTarget = useStore((state) => state.setTarget);
  const blockOrtoginationControll = (e) => {
    e.stopPropagation();
    cam.current.enableRotate = false;
    setTarget(e.object);
  };

  const unblockOrtoginationControll = (e) => {
    e.stopPropagation();
    setTarget(null);
    cam.current.enableRotate = true;
  };

  return (
    <primitive
      object={object}
      onClick={blockOrtoginationControll}
      onPointerMissed={unblockOrtoginationControll}
    />
  );
}

function save(blob, filename) {
  const link = document.createElement('a');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function saveString(text, filename) {
  save(new Blob([text], { type: 'text/plain' }), filename);
}

const handleExport = (scene) => {
  const exporter = new GLTFExporter();
  const result = exporter.parse(scene, function (gltf) {
    console.log(gltf);
    saveString(JSON.stringify(gltf), `${2}.gltf`);
  });
};
