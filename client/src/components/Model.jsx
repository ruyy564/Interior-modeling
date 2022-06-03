import { useStore } from '../hooks/store.hook';
import { Texture } from 'three/src/textures/Texture.js';
export const Model = ({ object, camera }) => {
  const setTarget = useStore((state) => state.setTarget);

  const blockOrtoginationControll = (e) => {
    e.stopPropagation();
    camera.current.enableRotate = false;
    setTarget(e.object.parent);
    //setTarget(e.object);
  };

  const unblockOrtoginationControll = (e) => {
    e.stopPropagation();
    setTarget(null);
    camera.current.enableRotate = true;
  };

  return (
    <primitive
      object={object}
      onClick={blockOrtoginationControll}
      onPointerMissed={unblockOrtoginationControll}
    />
  );
};
