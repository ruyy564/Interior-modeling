import React from 'react';
import { Modal } from '../components/Modal';
import Group from '../components/Common/Group';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export const ModalChange = ({
  modalActive,
  setModalActive,
  error,
  changeName,
  changeImage,
  formHandler,
}) => {
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
