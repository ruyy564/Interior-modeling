import { useRef } from 'react';
import image from '../assets/grass.jpg';
import { typeEnum } from '../enums/typeEnum';

export const DesignMenu = ({
  filtered,
  findByidType,
  type,
  filterByType,
  download,
}) => {
  const menu = useRef();

  return (
    <>
      <div ref={menu} className="content-menu">
        <span>Тип:</span>
        {filtered.type && findByidType(filtered.type)}
        <ul className="sub-menu">
          {type &&
            type
              .filter((elem) => elem.parent !== null || elem.name === 'TEXTURE')
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
        <div className="content">
          {/* <a>Назад</a> */}
          {filtered.item &&
            filtered.item.map((el) => (
              <div
                key={el._id}
                className="item small"
                onClick={() => {
                  download(el._id);
                }}
              >
                <img src={el.image} alt="...упс" />
                <span>{el.name}</span>
              </div>
            ))}
        </div>
      </div>
      <div
        className="line"
        onClick={() => {
          menu.current.classList.toggle('open');
        }}
      ></div>
    </>
  );
};
