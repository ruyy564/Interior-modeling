import { useRef } from 'react';
import image from '../assets/grass.jpg';

export const DesignMenu = () => {
  const menu = useRef();

  return (
    <>
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
    </>
  );
};
