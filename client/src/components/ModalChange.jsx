import React from 'react';
import { useHttp } from '../hooks/http.hook';
import { Modal } from '../components/Modal';
import Group from '../components/Common/Group';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export const ModalChange = ({
  form,
  setForm,
  modalActive,
  setModalActive,
  setItem,
  setFilterd,
}) => {
  const { request, loading, error } = useHttp();

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
    const data = await request(`api/design/data/${form.id}`, 'PUT', {
      ...form,
    });

    setItem((prev) => {
      const newItem = prev.map((el) => {
        if (el._id === form.id) {
          el.name = form.name !== null ? form.name : el.name;
          el.image = form.image !== null ? form.image : el.image;
        }

        return el;
      });

      return [...newItem];
    });

    setFilterd((prev) => {
      const newItem = prev.item.map((el) => {
        if (el._id === form.id) {
          el.name = form.name !== null ? form.name : el.name;
          el.image = form.image !== null ? form.image : el.image;
        }

        return el;
      });

      return { ...prev, item: newItem };
    });

    setModalActive(false);
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
