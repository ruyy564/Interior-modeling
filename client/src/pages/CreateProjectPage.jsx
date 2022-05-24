import React, { useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Button from '../components/Common/Button';
import Design from '../components/Design';
import image from '../assets/grass.jpg';
import './main.css';
import './authPage.css';

export default function CreateProjectPage() {
  const { logout } = useContext(AuthContext);
  const burger = useRef();
  const menu = useRef();

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
              <NavLink to="/create">Создать проект</NavLink>
            </li>
            <li>
              <NavLink to="/main">Мои проекты</NavLink>
            </li>
            <li>
              <NavLink to="/main">Библиотека</NavLink>
            </li>
            <li>
              <a href="/" onClick={logout}>
                Выйти
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="content-wrapper">
        <div ref={menu} className="content-menu">
          <ul className="sub-menu">
            <li>
              <a href="">Конструкции</a>
            </li>
            <li>
              <a href="">Мебель</a>
            </li>
            <li>
              <a href="">Дектор</a>
            </li>
            <li>
              <a href="">Текстуры</a>
            </li>
          </ul>
          <div className="content">
            <a>Назад</a>
            <div className="item">
              <img src={image} alt="...упс" />
              <span>Мой проект</span>
              <span>Автор:keyren</span>
            </div>
          </div>
        </div>
        <div
          className="line"
          onClick={() => {
            console.log(menu.current.classList);
            menu.current.classList.toggle('open');
          }}
        ></div>
        <h2>Создать проект</h2>
        <div>
          <ul className="sub-menu status">
            <li>
              <a href="#">Открыть проект из файла</a>
            </li>
            <li>
              <a href="#">Добавить проект из файла</a>
            </li>
            <li>
              <a href="#">Скачать</a>
            </li>
            <li>
              <a href="#">Сохранить</a>
            </li>
          </ul>
        </div>
        <div className="content">
          <Design />
        </div>
      </section>
    </div>
  );
}
