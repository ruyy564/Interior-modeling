import React from 'react';
import { useHttp } from '../hooks/http.hook';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Modal } from '../components/Modal';
import Group from '../components/Common/Group';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export const ModalSave = ({
  form,
  setForm,
  modalActive,
  setModalActive,
  scene,
  saveScene,
}) => {
  const { request, error } = useHttp();
  const changeName = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeImage = (elm) => {
    if (elm.files) {
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;

        setForm({ ...form, image: srcData });
      };
      fileReader.readAsDataURL(elm.files[0]);
    }
  };

  const formHandler = async () => {
    const exporter = new GLTFExporter();
    exporter.parse(scene, async function (gltf) {
      await request(`api/design/data/`, 'POST', {
        ...form,
        model: gltf,
      });
      setModalActive(false);
    });
  };
  return (
    <Modal active={modalActive} setActive={setModalActive}>
      <Group>
        <span>{error}</span>
        <Input
          type={'text'}
          placeholder={'Введите название проекта'}
          name={'name'}
          formHandler={changeName}
        />
        <span>Загрузите изображение</span>
        <input type={'file'} onChange={(e) => changeImage(e.target)} />
      </Group>
      <Group>
        <Button className={'log'} value={'Подтвердить'} onClick={formHandler} />
        <Button
          className={'log'}
          value={'Отменить'}
          onClick={() => setModalActive(false)}
        />
      </Group>
    </Modal>
  );
};
