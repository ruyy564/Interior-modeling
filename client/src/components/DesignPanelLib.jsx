import { useRef } from 'react';

export const DesignPanel = ({ scene, handleExport, setModalActive }) => {
  const file = useRef();

  return (
    <div>
      <ul className="sub-menu status">
        <li>
          <a href="#" onClick={() => handleExport(scene)}>
            Скачать
          </a>
        </li>
        <li>
          <a href="#" onClick={() => setModalActive(true)}>
            Сохранить
          </a>
        </li>
      </ul>
    </div>
  );
};
