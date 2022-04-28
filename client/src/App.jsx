import { useState,useEffect,useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,PerspectiveCamera,TransformControls, useCursor,useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import create from 'zustand'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { gridHelper,group } from 'three'
import { GLTFExporter   } from 'three/examples/jsm/exporters/GLTFExporter.js';

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

function Box(props) {
  const setTarget = useStore((state) => state.setTarget)

    const blockOrtoginationControll=(e) => {
        e.stopPropagation();
        props.cam.current.enableRotate=false;
        setTarget(e.object)
    }

    const unblockOrtoginationControll=(e) =>{ 
        e.stopPropagation();
        props.cam.current.enableRotate=true;
    }

  return (
    <mesh    {...props} onClick={blockOrtoginationControll} 
    onPointerMissed={unblockOrtoginationControll}
    >
      
      <boxGeometry args={[1, 10, 10]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function App() {
    const refControls=useRef();
    const file=useRef();
    const [scene,setScene]=useState(null);
    const { target, setTarget } = useStore()
    const { mode } = useControls({ mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] } })
  

    const handleLoad = () => {
      console.log(file.current.value)
      
    };
  
  return (
    <>
        
         <Canvas  onPointerMissed={() => setTarget(null)}  
        onCreated={({ gl, raycaster, scene }) => {
        setScene(scene);
      }}
       >
            <gridHelper args={[40,40]}/>
            <ambientLight />
            <PerspectiveCamera makeDefault position={[0,15,15]}/>
            <OrbitControls ref={refControls} />
            <spotLight angle={0.25} penumbra={0.5} position={[0, 10, 0]} castShadow />
            
            <Physics gravity={[0, -200, 0]} iterations={10}>
                <Box cam={refControls}/>
                <Model/>
                {target && <TransformControls object={target} mode={mode}  />}
            </Physics>
            
        </Canvas> 
        
      <button onClick={()=>handleExport(scene)}>Export ELTF</button>
      <button onClick={handleLoad}>Export ELTF</button>
      <input type="file" ref={file} onClick={handleLoad}/>
    </>
  )
}

function Model({ url, ...props }) {
    const { scene, nodes, materials } = useGLTF('/scene.gltf')

    return <primitive object={scene} {...props} />
  }

  function save(blob, filename) {
    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

   const handleExport = (scene) => {
    const exporter = new GLTFExporter();
    const result = exporter.parse(scene,
      function ( gltf ) {
          saveString(JSON.stringify(gltf), `${2}.gltf`);
      });
    // scene.children.map((el)=>{
    //     console.log(el)
    //     const result = exporter.parse(scene,
    //         function ( gltf ) {
    //             saveString(JSON.stringify(gltf), `${el.type}.gltf`);
    //         });
    //})
    
    
  };