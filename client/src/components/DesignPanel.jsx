import { useRef } from 'react';

export const DesignPanel = ({
  scene,
  handleLoad,
  loadFromFile,
  handleExport,
}) => {
  const file = useRef();

  return (
    <div>
      <ul className="sub-menu status">
        <li>
          <span>Открыть проект из файла</span>
          <input type="file" ref={file} onChange={() => handleLoad(file)} />
        </li>
        <li>
          <a href="#" onClick={loadFromFile}>
            Добавить стену
          </a>
        </li>
        <li>
          <a href="#">Добавить проект из файла</a>
        </li>
        <li>
          <a href="#" onClick={() => handleExport(scene)}>
            Скачать
          </a>
        </li>
        <li>
          <a href="#">Сохранить</a>
        </li>
      </ul>
    </div>
  );
};
