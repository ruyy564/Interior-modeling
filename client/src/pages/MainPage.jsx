import React from 'react';
import { useData } from '../hooks/data.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { Item } from '../components/Item';
import { SubMenu } from '../components/SubMenu';
import { StatusMenu } from '../components/StatusMenu';
import { statusEnum } from '../enums/statusEnum';
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
        <div className="content">
          <div className="change-modal">
            <h1>Изменить</h1>
            <input type="text" />
            <input type="file" />
            <button>Подтвердить</button>
            <button>Отменить</button>
          </div>
          {filtered.item &&
            filtered.item.map((el) => (
              <Item
                key={el._id}
                el={el}
                download={download}
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
    </div>
  );
}
