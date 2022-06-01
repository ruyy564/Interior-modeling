import React, { useRef } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Modal } from '../components/Modal';
import Group from '../components/Common/Group';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';

export const ModalAdd = ({
  form,
  setForm,
  modalActive,
  setModalActive,
  filtered,
  findByidType,
  type,
}) => {
  const selectType = useRef();
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

  const changeTexture = async (elm) => {
    if (elm.files) {
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;

        setForm({ ...form, model: srcData });
      };
      fileReader.readAsDataURL(elm.files[0]);
    }
  };

  const formHandler = async () => {
    let data = await request(`api/design/data/`, 'POST', {
      ...form,
      type: filtered.type,
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
        <span>Загрузите проект</span>
        {type && console.log(type)}

        {filtered.type &&
          (findByidType(filtered.type) === 'Проект' ? (
            <input type={'file'} onChange={(e) => changeModel(e.target)} />
          ) : findByidType(filtered.type) === 'Текстура' ? (
            <input type={'file'} onChange={(e) => changeTexture(e.target)} />
          ) : (
            <>
              <span>Тип проекта:</span>
              <select
                name="type"
                id=""
                ref={selectType}
                onChange={(e) => console.log(e.target)}
              >
                {type &&
                  type
                    .filter((el) => el.parent !== null)
                    .map((el) => (
                      <option value={el._id} key={el._id} defaultValue={el._id}>
                        {el.name}
                      </option>
                    ))}
              </select>
              <input
                type={'file'}
                onChange={(e) => {
                  //console.log(selectType.current.value);
                  changeModel(e.target);
                }}
              />
            </>
          ))}
      </Group>
      <Group>
        <Button
          className={'log'}
          value={'Подтвердить'}
          onClick={() => {
            if (selectType.current) {
              setForm({ ...form, type: selectType.current.value });
            }

            formHandler();
          }}
        />
        <Button
          className={'log'}
          value={'Отменить'}
          onClick={() => setModalActive(false)}
        />
      </Group>
    </Modal>
  );
};
