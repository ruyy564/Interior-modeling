import React, { useState, useCallback } from 'react';
import { useData } from '../hooks/data.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { Item } from '../components/Item';
import { SubMenu } from '../components/SubMenu';
import { StatusMenu } from '../components/StatusMenu';
import { Modal } from '../components/Modal';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Group from '../components/Common/Group';
import { statusEnum } from '../enums/statusEnum';
import { useDesign } from '../hooks/design.hook';
import { useHttp } from '../hooks/http.hook';
import './main.css';

export default function MainPage() {
  const {
    type,
    status,
    filtered,
    filterByType,
    filterByStatus,
    findByidType,
    findByidStatus,
    download,
    publish,
    deleteData,
    rejected,
    accept,
  } = useData();

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

  return (
    <div className="main-page">
      <BurgerMenu />
      <section className="content-wrapper">
        <SubMenu type={type} filterByType={filterByType} />
        <h2>
          {filtered.type && findByidType(filtered.type)}
          <span> | </span>
          {filtered.status && findByidStatus(filtered.status)}
        </h2>
        <StatusMenu status={status} filterByStatus={filterByStatus} />
        {filtered.status && findByidStatus(filtered.status) === 'Приватный' ? (
          <div className="btn-add">
            <Button
              className={'log'}
              value={'Загрузить проект'}
              onClick={() => setModalActive(true)}
            />
          </div>
        ) : (
          ''
        )}
        <div className="content">
          {filtered.item &&
            filtered.item.map((el) => (
              <Item
                key={el._id}
                el={el}
                download={download}
                openModal={setModalActive}
                setIdModal={() => setForm({ ...form, id: el._id })}
                publish={() => {
                  switch (findByidStatus(filtered.status)) {
                    case 'Приватный':
                      publish(el._id);
                      console.log('PRIVATE');
                      break;
                    case 'На проверке':
                      accept(el._id);
                      console.log('CHECK');
                      break;
                  }
                }}
                reject={() => {
                  console.log(findByidStatus(filtered.status));
                  switch (findByidStatus(filtered.status)) {
                    case 'На проверке':
                      console.log('kjkhkj');
                      rejected(el._id);
                      break;
                  }
                }}
                deleteData={deleteData}
              />
            ))}
        </div>
      </section>
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
          <Button
            className={'log'}
            value={'Подтвердить'}
            onClick={formHandler}
          />
          <Button
            className={'log'}
            value={'Отменить'}
            onClick={() => setModalActive(false)}
          />
        </Group>
      </Modal>
    </div>
  );
}
