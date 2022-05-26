import React from 'react';
import { useData } from '../hooks/data.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { Item } from '../components/Item';
import { SubMenu } from '../components/SubMenu';
import { StatusMenu } from '../components/StatusMenu';
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
          {filtered.item &&
            filtered.item.map((el) => (
              <Item
                key={el._id}
                el={el}
                download={download}
                publish={publish}
                deleteData={deleteData}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
