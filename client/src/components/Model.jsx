import { useStore } from '../hooks/store.hook';

export const Model = ({ object, camera, texture }) => {
  const setTarget = useStore((state) => state.setTarget);

  const blockOrtoginationControll = (e) => {
    e.stopPropagation();
    camera.current.enableRotate = false;
    setTarget(e.object);
  };

  const unblockOrtoginationControll = (e) => {
    e.stopPropagation();
    setTarget(null);
    camera.current.enableRotate = true;
  };

  object.material.map = texture;

  return (
    <primitive
      object={object}
      onClick={blockOrtoginationControll}
      onPointerMissed={unblockOrtoginationControll}
    />
  );
};
