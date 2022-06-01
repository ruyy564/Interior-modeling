import { useState, useCallback } from 'react';
import { useHttp } from './http.hook';

export const useModal = (form, setForm, setModalActive, type, filtered) => {
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

  const changeModel = async (elm) => {
    if (elm.files) {
      new Response(elm.files[0]).json().then((json) => {
        console.log('=', json);
        setForm({ ...form, model: json });
      });
    }
  };
  const formHandler = async () => {
    let data;
    if (type === 'CHANGE') {
      // data = await request(`api/design/data/${form.id}`, 'PUT', {
      //   ...form,
      // });

      console.log('ch', form);
      // setForm({
      //   name: '',
      //   image: null,
      //   id: null,
      // });
    }
    console.log(form);
    if (type === 'ADD') {
      console.log('add', form);
      // data = await request(`api/design/data/`, 'POST', {
      //   ...form,
      //   type: filtered.type,
      // });
      // setForm({
      //   name: '',
      //   image: null,
      //   id: null,
      //   model: null,
      // });
    }

    setModalActive(false);
  };

  if (form.model === null) {
    return [error, changeName, formHandler, changeImage, changeModel];
  }
  return [error, changeName, formHandler, changeImage];
};
