import { useRef } from 'react';

export const DesignPanel = ({
  scene,
  handleLoad,
  loadFromFile,
  handleExport,
  handleLoadFullScene,
  saveScene,
}) => {
  const file = useRef();

  return (
    <div>
      <ul className="sub-menu status">
        <li>
          <span>Открыть проект из файла</span>
          <input
            type="file"
            ref={file}
            onChange={(e) => handleLoad(e.target)}
          />
        </li>
        <li>
          <a href="#" onClick={loadFromFile}>
            Добавить стену
          </a>
        </li>

        <li>
          <span>Добавить проект из файла</span>
          <input
            type="file"
            onChange={(e) => {
              handleLoadFullScene(e.target);
            }}
          />
        </li>
        <li>
          <a href="#" onClick={() => handleExport(scene)}>
            Скачать
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() =>
              saveScene({
                name: 'my-project2',
                type: '62864fd72eff904c106cf445',
                model: 'scene',
              })
            }
          >
            Сохранить
          </a>
        </li>
      </ul>
    </div>
  );
};
