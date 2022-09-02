import React, { useState } from 'react';
import { useData } from '../hooks/library.hook';
import { BurgerMenu } from '../components/BurgerMenu';
import { ItemLib } from '../components/ItemLib';
import { SubMenu } from '../components/SubMenu';
import './main.css';

export default function MainPage() {
  const { type, filtered, filterByType, findByidType, download } = useData();

  return (
    <div className="main-page">
      <BurgerMenu />
      <section className="content-wrapper">
        <SubMenu type={type} filterByType={filterByType} />
        <h2>{filtered.type && findByidType(filtered.type)}</h2>
        <div className="content">
          {filtered.item &&
            filtered.item.map((el) => (
              <ItemLib
                key={el._id}
                el={el}
                download={download}
                findByidType={findByidType}
                filtered={filtered}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
