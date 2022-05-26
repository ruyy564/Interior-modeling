import { useControls } from 'leva';
import { useStore } from '../hooks/store.hook';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MyLoader } from '../loaders/MyLoader';
import { TLoader } from '../loaders/TLoader';
import FileLoader from '../loaders/FileLoader';
import { useState, useRef } from 'react';
import { useLoader } from '@react-three/fiber';

export const useDesign = () => {
  const refControls = useRef();
  const [scene, setScene] = useState(null);
  const { target, setTarget } = useStore();
  const { mode } = useControls({
    mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
  });
  const texture = useLoader(TLoader, './dirt.jpg');

  const ImageLoader = async (elm) => {
    if (elm.current.files) {
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;
        console.log('srcData', srcData);
      };
      fileReader.readAsDataURL(elm.current.files[0]);
    }

    elm.current.value = '';
  };

  const handleLoad = async (elm) => {
    if (elm.current.files) {
      new Response(elm.current.files[0]).json().then(
        (json) => {
          var loader = new MyLoader();

          loader.parse(json, function (gltf) {
            let ob = {
              ...scene,
              children: [...scene.children, ...gltf.scene.children],
            };

            ob.__proto__ = scene.__proto__;
            setScene(ob);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }

    elm.current.value = '';
  };

  const handleExport = (scene) => {
    const exporter = new GLTFExporter();

    exporter.parse(scene, function (gltf) {
      FileLoader.saveString(JSON.stringify(gltf), `${2}.gltf`);
    });
  };

  function loadFromFile() {
    new GLTFLoader().load('wall.txt', function (gltf) {
      let ob = {
        ...scene,
        children: [...scene.children, ...gltf.scene.children],
      };

      ob.__proto__ = scene.__proto__;
      setScene(ob);
    });
  }

  return {
    setScene,
    refControls,
    target,
    mode,
    scene,
    texture,
    handleExport,
    loadFromFile,
    handleLoad,
    setTarget,
  };
};
