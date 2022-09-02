import { useState, useRef, useCallback } from 'react';
import { useControls } from 'leva';
import { useHttp } from './http.hook';
import { Scene } from 'three';
import { useStore } from '../hooks/store.hook';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MyLoader } from '../loaders/MyLoader';
import { Texture } from 'three/src/textures/Texture.js';
import FileLoader from '../loaders/FileLoader';
import { Mesh, Object3D, BoxGeometry, MeshBasicMaterial } from 'three';

import { TLoader } from '../loaders/TLoader';
import { useLoader } from '@react-three/fiber';

export const useDesign = () => {
  const { request, error } = useHttp();
  const refControls = useRef();
  const [scene, setScene] = useState(null);
  const { target, setTarget } = useStore();
  const { mode } = useControls({
    mode: { value: 'translate', options: ['translate', 'rotate', 'scale'] },
  });

  const deleteObject = () => {
    if (target) {
      setScene((prev) => {
        const children = prev.children.filter((el) => el !== target);
        let ob = {
          ...prev,
          children,
        };

        ob.__proto__ = scene.__proto__;
        return ob;
      });
      setTarget(null);
    }
  };

  const copyObject = () => {
    if (target) {
      setScene((prev) => {
        let ob;
        if (target.type === 'Mesh') {
          const geometry = target.geometry.clone();
          const material = target.material.clone();
          const mesh = new Mesh(geometry, material);

          mesh.scale.x = target.scale.x;
          mesh.scale.y = target.scale.y;
          mesh.scale.z = target.scale.z;

          mesh.position.setX(target.position.x);
          mesh.position.setY(target.position.y);
          mesh.position.setZ(target.position.z);

          ob = {
            ...prev,
            children: [...prev.children, mesh],
          };
        } else {
          const group = new Object3D();
          target.children.forEach((el) => {
            const geometry = el.geometry.clone();
            const material = el.material.clone();
            const mesh = new Mesh(geometry, material);

            mesh.scale.x = el.scale.x;
            mesh.scale.y = el.scale.y;
            mesh.scale.z = el.scale.z;
            mesh.rotateX = el.rotateX;
            mesh.rotateY = el.rotateY;
            mesh.rotateZ = el.rotateZ;

            mesh.position.setX(el.position.x);
            mesh.position.setY(el.position.y);
            mesh.position.setZ(el.position.z);
            group.add(mesh);
          });
          group.scale.x = target.scale.x;
          group.scale.y = target.scale.y;
          group.scale.z = target.scale.z;
          group.rotateX = target.rotateX;
          group.rotateY = target.rotateY;
          group.rotateZ = target.rotateZ;

          group.position.setX(target.position.x);
          group.position.setY(target.position.y);
          group.position.setZ(target.position.z);
          ob = {
            ...prev,
            children: [...prev.children, group],
          };
        }

        const newScene = new Scene();
        ob.__proto__ = newScene;

        return ob;
      });
    }
  };

  const saveScene = useCallback(async (body) => {
    const exporter = new GLTFExporter();
    exporter.parse(scene, async function (gltf) {
      await request(`api/design/data/`, 'POST', {
        ...body,
        model: gltf,
      });
    });
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
            let group = new Object3D();
            let haveGroup = gltf.scene.children.map((el) => {
              if (el.type === 'Mesh') {
                group.add(el);
              } else {
                return el;
              }
            });
            let ob = {
              ...scene,
              children: [...haveGroup, group],
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

  const makeTexture = (img) => {
    const image = document.createElement('img');
    image.src = JSON.parse(img);
    let texture = new Texture(image);
    texture.needsUpdate = true;

    return texture;
  };

  const loadTextureById = useCallback(async (id) => {
    try {
      if (target) {
        const { value } = await request(`api/design/data/${id}`, 'GET');
        const texture = await makeTexture(value);
        if (target.type === 'Object3D') {
          target.children.forEach((el) => (el.material.map = texture));
        } else {
          target.material.map = texture;
        }
      }
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
            let group = new Object3D();
            let haveGroup = gltf.scene.children.map((el) => {
              if (el.type === 'Mesh') {
                group.add(el);
              } else {
                return el;
              }
            });
            console.log(haveGroup, group);
            let ob = {
              ...scene,
              children: [...scene.children, ...haveGroup, group],
            };
            const newScene = new Scene();
            ob.__proto__ = newScene;
            setScene(ob);
            setTarget(null);
            console.log(scene);
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
            let group = new Object3D();
            let haveGroup = gltf.scene.children.map((el) => {
              if (el.type === 'Mesh') {
                group.add(el);
              } else {
                return el;
              }
            });

            let ob = {
              ...scene,
              children: [...haveGroup, group],
            };
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
            let group = new Object3D();
            let haveGroup = gltf.scene.children.filter(
              (el) => el.type !== 'Mesh'
            );
            gltf.scene.children.forEach((el) => {
              if (el.type == 'Mesh') {
                group.add(new Mesh().copy(el));
              }
            });
            let chld = [];
            if (haveGroup) chld = [...haveGroup];
            if (group.children.length !== 0) chld.push(group);

            let ob = {
              ...scene,
              children: [...scene.children, ...chld],
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

  const handleExport = () => {
    const exporter = new GLTFExporter();
    console.log();
    exporter.parse(scene.children.slice(4), function (gltf) {
      console.log(gltf);
      FileLoader.saveString(JSON.stringify(gltf), `${2}.gltf`);
    });
  };

  async function loadFromFile() {
    let group = new Object3D();
    var boxGeometry = new BoxGeometry(0.2, 2, 0.2);
    var basicMaterial = new MeshBasicMaterial({ color: 0x0095dd });
    var cube = new Mesh(boxGeometry);
    const image = document.createElement('img');
    let texture = new Texture(image);
    group.add(
      new Mesh(boxGeometry),
      new Mesh(boxGeometry),
      new Mesh(boxGeometry),
      new Mesh(boxGeometry),
      new Mesh(boxGeometry)
    );

    let chld = [];
    if (group.children.length !== 0) chld.push(group);

    let ob = {
      ...scene,
      children: [...scene.children, ...chld],
    };

    ob.children[ob.children.length - 1].children.forEach(
      (el) => (el.material.map = texture)
    );

    ob.__proto__ = scene.__proto__;
    setScene(ob);
  }

  return {
    setScene,
    error,
    refControls,
    target,
    mode,
    scene,
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
    deleteObject,
    loadTextureById,
    copyObject,
  };
};
