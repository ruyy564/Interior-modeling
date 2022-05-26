import React, { useRef, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

export const BurgerMenu = () => {
  const { logout } = useContext(AuthContext);
  const burger = useRef();

  return (
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
  );
};
