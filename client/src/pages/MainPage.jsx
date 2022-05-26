import React, { useEffect, useRef, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import FileLoader from '../loaders/FileLoader';
import { statusEnum } from '../enums/statusEnum';
import { typeEnum } from '../enums/typeEnum';
import './main.css';
import './authPage.css';

export default function MainPage() {
  const [type, setType] = useState(null);
  const [item, setItem] = useState(null);
  const [filtered, setFilterd] = useState({
    item: [],
    status: null,
    type: null,
  });
  const [status, setStatus] = useState(null);
  const { request } = useHttp();

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

  const getData = async () => {
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const data = await request(`api/design/databyuser/${userId}`, 'GET');

    setItem(data.projects);
    setFilterd(data.projects);
  };

  const publish = async (id) => {
    await request(`api/design/publish/${id}`, 'PUT');

    getData();
  };

  const download = async (id) => {
    const data = await request(`api/design/data/${id}`, 'GET');

    FileLoader.saveString(data.value, `${2}.gltf`);
  };

  const deleteData = (id) => {
    setItem(item.filter((el) => el._id !== id));
    filterData(filtered.type, filtered.status);
    request(`api/design/data/${id}`, 'DELETE');
  };

  useEffect(() => {
    getStatuses();
    getTypes();
    getData();
  }, []);

  const filterByType = (id) => {
    filterData(id, filtered.status);
  };

  const filterData = (typeId, statusId) => {
    const filterData = item.filter(
      (elem) => elem.type === typeId && elem.status === statusId
    );

    setFilterd((prev) => ({
      item: filterData,
      type: typeId,
      status: statusId,
    }));
  };

  const filterByStatus = (id) => {
    filterData(filtered.type, id);
  };

  useEffect(() => {
    if (item !== null && status !== null && type !== null) {
      console.log(filtered.item);
      if (!filtered.item) filterData(type[0]._id, status[0]._id);
      else filterData(filtered.type, filtered.status);
    }
  }, [status, item, type]);

  const findByidType = (id) => {
    if (!type) return '';
    if (!id) return '';

    return typeEnum[type.filter((el) => el._id == id)[0].name];
  };

  const findByidStatus = (id) => {
    if (!status) return '';
    if (!id) return '';

    return statusEnum[status.filter((el) => el._id == id)[0].name];
  };
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
        <h2>
          {findByidType(filtered.type) +
            ' | ' +
            findByidStatus(filtered.status)}
        </h2>
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
          </ul>
        </div>
        <div className="content">
          {filtered.item &&
            filtered.item.map((el) => (
              <div key={el._id} className="item">
                <img src={el.image} alt="...упс" />
                <span>{el.name}</span>
                <div className="item-back">
                  <ul className="sub-menu">
                    <li>
                      <a href="#">Открыть</a>
                    </li>
                    <li>
                      <a href="#">Редактировать</a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          download(el._id);
                        }}
                      >
                        Загрузить
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          publish(el._id);
                        }}
                      >
                        Опубликовать
                      </a>
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
