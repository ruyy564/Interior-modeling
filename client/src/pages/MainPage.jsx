import React, { useRef } from 'react';
import Button from '../components/Common/Button';
import image from '../assets/grass.jpg';
import './main.css';
import './authPage.css';
export default function MainPage() {
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
            <li>
              <a href="">Проекты</a>
            </li>
            <li>
              <a href="">Модели</a>
            </li>
            <li>
              <a href="">Текстуры</a>
            </li>
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
            <li>
              <a href="#">Приватные</a>
            </li>
            <li>
              <a href="#">На проверке</a>
            </li>
            <li>
              <a href="#">Публичные</a>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="item">
            <img src={image} alt="...упс" />
            <span>Мой проект</span>
            <span>Автор:keyren</span>
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
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
