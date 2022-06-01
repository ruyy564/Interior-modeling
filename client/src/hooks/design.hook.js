import { useState, useRef, useCallback } from 'react';
import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { useHttp } from './http.hook';
import { Scene } from 'three';
import { useStore } from '../hooks/store.hook';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MyLoader } from '../loaders/MyLoader';
import { TLoader } from '../loaders/TLoader';
import FileLoader from '../loaders/FileLoader';

export const useDesign = () => {
  const { request, error } = useHttp();
  const refControls = useRef();
  const [scene, setScene] = useState(null);
  const { target, setTarget } = useStore();
  const { mode } = useControls({
    mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
  });
  const texture = useLoader(TLoader, './dirt.jpg');

  const saveScene = useCallback(async (body) => {
    const exporter = new GLTFExporter();
    console.log('save-=', body);
    exporter.parse(scene, async function (gltf) {
      await request(`api/design/data/`, 'POST', {
        ...body,
        model: gltf,
      });
      console.log('save-=1', body);
    });
    console.log('save-=2', body);
  });

  const changeScene = useCallback(async (id) => {
    const exporter = new GLTFExporter();
    exporter.parse(scene, async function (gltf) {
      request(`api/design/data/${id}`, 'PUT', {
        model: gltf,
      });
    });
  });

  const loadSceneById = useCallback(async (id) => {
    try {
      const { value } = await request(`api/design/data/${id}`, 'GET');

      new Response(value).json().then(
        (json) => {
          var loader = new MyLoader();
          loader.parse(json, function (gltf) {
            console.log('ghj', gltf);
            let ob = {
              ...scene,
              children: [...gltf.scene.children],
            };
            const newScene = new Scene();
            ob.__proto__ = newScene;
            setScene(ob);
            setTarget(null);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {
      console.log(e);
    }
  });

  const loadObjectById = useCallback(async (id) => {
    try {
      const { value } = await request(`api/design/data/${id}`, 'GET');

      new Response(value).json().then(
        (json) => {
          var loader = new MyLoader();
          loader.parse(json, function (gltf) {
            console.log('ghj', gltf);
            let ob = {
              ...scene,
              children: [...scene.children, ...gltf.scene.children],
            };
            const newScene = new Scene();
            ob.__proto__ = newScene;
            setScene(ob);
            setTarget(null);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {
      console.log(e);
    }
  });

  const imageLoader = async (elm) => {
    if (elm.files) {
      const fileReader = new FileReader();
      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;
        console.log('srcData', srcData);
      };
      fileReader.readAsDataURL(elm.files[0]);
    }

    elm.value = '';
  };
  const handleLoadFullScene = async (elm) => {
    if (elm.files) {
      new Response(elm.files[0]).json().then(
        (json) => {
          var loader = new MyLoader();

          loader.parse(json, function (gltf) {
            let ob = {
              ...scene,
              children: [...gltf.scene.children],
            };
            console.log('ob', ob);
            ob.__proto__ = scene.__proto__;
            setScene(ob);
            setTarget(null);
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }

    elm.value = '';
  };

  const handleLoad = async (elm) => {
    if (elm.files) {
      new Response(elm.files[0]).json().then(
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

    elm.value = '';
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
    error,
    refControls,
    target,
    mode,
    scene,
    texture,
    handleExport,
    handleLoadFullScene,
    loadFromFile,
    handleLoad,
    setTarget,
    loadSceneById,
    saveScene,
    changeScene,
    imageLoader,
    loadObjectById,
  };
};
