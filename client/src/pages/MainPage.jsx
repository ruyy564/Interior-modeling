import React, { useEffect, useRef, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import Button from '../components/Common/Button';
import image from '../assets/grass.jpg';
import './main.css';
import './authPage.css';

const statusEnum = {
  PRIVATE: 'Приватный',
  PUBLIC: 'Публичный',
  CHECK: 'На проверке',
  REJECTED: 'Отклонено',
};

const typeEnum = {
  PROJECT: 'Проект',
  TEXTURE: 'Текстура',
  CATALOG: 'Каталог',
};

export default function MainPage() {
  const [type, setType] = useState(null);
  const [item, setItem] = useState(null);
  const [filtered, setFilterd] = useState(null);
  const [status, setStatus] = useState(null);
  const { loading, error, request, clearError } = useHttp();
  const burger = useRef();
  const menu = useRef();

  const getStatuses = async () => {
    const data = await request('api/design/statuses', 'GET');
    setStatus(data.statuses);
  };

  const getTypes = async () => {
    const data = await request('api/design/types', 'GET');
    setType(data.types);
  };

  const filterByStatus = (id) => {
    setFilterd(() => {
      return item.filter((el) => el.status === id);
    });
  };

  const filterByType = (id) => {
    setFilterd(() => {
      return item.filter((el) => el.type === id);
    });
  };

  const getData = async () => {
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const data = await request(`api/design/databyuser/${userId}`, 'GET');

    setItem(data.projects);
    setFilterd(data.projects);
  };

  const deleteData = (id) => {
    setItem((prev) => {
      return prev.filter((el) => el._id !== id);
    });

    setFilterd((prev) => {
      return prev.filter((el) => el._id !== id);
    });

    request(`api/design/data/${id}`, 'DELETE');
  };

  useEffect(() => {
    getStatuses();
    getTypes();
    getData();
  }, []);

  useEffect(() => {
    if (item !== null && status !== null && type !== null) {
      filterByType(type[0]._id);
      filterByStatus(status[0]._id);
    }
  }, [status, item, type]);

  return (
    <div className="main-page">
      <header>
        <nav className="nav">
          <div
            className="burger"
            onClick={(e) => {
              e.target.classList.toggle('open');
            }}
          ></div>
          <div className="circle"></div>
          <ul className="menu">
            <li>
              <a href="">Создать проект</a>
            </li>
            <li>
              <a href="">Мои проекты</a>
            </li>
            <li>
              <a href="">Библиотека</a>
            </li>
            <li>
              <a href="">Выйти</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="content-wrapper">
        <div ref={menu} className="content-menu">
          <ul className="sub-menu">
            {type &&
              type
                .filter((elem) => elem.parent === null)
                .map((elem) => (
                  <li key={elem._id}>
                    <a
                      href="#"
                      onClick={() => {
                        filterByType(elem._id);
                      }}
                    >
                      {typeEnum[elem.name]}
                    </a>
                  </li>
                ))}
          </ul>
        </div>
        <div
          className="line"
          onClick={() => {
            console.log(menu.current.classList);
            menu.current.classList.toggle('open');
          }}
        ></div>
        <h2>Проекты</h2>
        <div>
          <ul className="sub-menu status">
            {status &&
              status.map((elem) => (
                <li key={elem._id}>
                  <a
                    href="#"
                    onClick={() => {
                      filterByStatus(elem._id);
                    }}
                  >
                    {statusEnum[elem.name]}
                  </a>
                </li>
              ))}
            {/*             
            <li>
              <a href="#">На проверке</a>
            </li>
            <li>
              <a href="#">Публичные</a>
            </li> */}
          </ul>
        </div>
        <div className="content">
          {filtered &&
            filtered.map((el) => (
              <div key={el._id} className="item">
                <img src={el.image} alt="...упс" />
                <span>{el.name}</span>
                {/* <span>Автор:keyren</span> */}
                <div className="item-back">
                  <ul className="sub-menu">
                    <li>
                      <a href="#">Открыть</a>
                    </li>
                    <li>
                      <a href="#">Редактировать</a>
                    </li>
                    <li>
                      <a href="#">Загрузить</a>
                    </li>
                    <li>
                      <a href="#">Опубликовать</a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          deleteData(el._id);
                        }}
                      >
                        Удалить
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
