import { useState, useCallback } from 'react';
import { useHttp } from './http.hook';

export const useModal = () => {
  const { request, loading, error } = useHttp();
  const [modalActive, setModalActive] = useState(false);
  const [form, setForm] = useState({ name: '', image: null, id: null });

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

  const formHandler = useCallback(async () => {
    const data = await request(`api/design/data/${form.id}`, 'PUT', {
      ...form,
    });

    setModalActive(false);
  });

  return {
    modalActive,
    setModalActive,
    error,
    changeName,
    formHandler,
    changeImage,
    setForm,
    form,
  };
};
