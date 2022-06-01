import React, { useState } from 'react';
import { useData } from '../hooks/data.hook';
import { useModal } from '../hooks/modal.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { Item } from '../components/Item';
import { SubMenu } from '../components/SubMenu';
import { StatusMenu } from '../components/StatusMenu';
import Button from '../components/Common/Button';
import { ModalChange } from '../components/ModalChange';
import { ModalAdd } from '../components/ModalAdd';
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

  const [modalActive, setModalActive] = useState(false);
  const [form, setForm] = useState({ name: '', image: null, id: null });

  const [modalAddActive, setModalAddActive] = useState(false);
  const [formAdd, setFormAdd] = useState({
    name: '',
    image: null,
    id: null,
    model: null,
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
              value={'|  Загрузить проект  |'}
              onClick={() => setModalAddActive(true)}
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
      <ModalChange
        form={form}
        setForm={setForm}
        modalActive={modalActive}
        setModalActive={setModalActive}
      />
      <ModalAdd
        modalActive={modalAddActive}
        setModalActive={setModalAddActive}
        form={formAdd}
        setForm={setFormAdd}
        filtered={filtered}
        findByidType={findByidType}
        type={type}
      />
    </div>
  );
}
