import React, { useRef } from 'react';
import { typeEnum } from '../enums/typeEnum';

export const SubMenu = ({ type, filterByType }) => {
  const menu = useRef();
  return (
    <>
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
          menu.current.classList.toggle('open');
        }}
      ></div>
    </>
  );
};
