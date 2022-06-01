import React from 'react';
import { useHttp } from '../hooks/http.hook';
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
  error,
}) => {
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
    console.log(form);
    try {
      await saveScene(form);
      setModalActive(false);
    } catch (e) {
      console.log(error);
    }
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
