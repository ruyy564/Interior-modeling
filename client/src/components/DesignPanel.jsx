import { useRef } from 'react';

export const DesignPanel = ({
  scene,
  handleLoad,
  loadFromFile,
  handleExport,
  handleLoadFullScene,
  saveScene,
  copyObject,
  changeScene,
  setModalActive,
  deleteObject,
  refControls,
  id,
}) => {
  const file = useRef();

  return (
    <div>
      <ul className="sub-menu status">
        <li>
          <input
            type="file"
            name="file"
            id="open"
            className="inputfile"
            onChange={(e) => handleLoadFullScene(e.target)}
          />
          <label htmlFor="open">Открыть проект</label>
        </li>
        <li>
          <input
            type="file"
            name="file"
            id="file"
            className="inputfile"
            onChange={(e) => handleLoad(e.target)}
          />
          <label htmlFor="file">Добавить в проект</label>
        </li>
        {/* <li>
          <a href="#" onClick={loadFromFile}>
            Добавить стену
          </a>
        </li> */}
        <li>
          <a
            href="#"
            onClick={() => {
              //refControls.current.enableRotate = true;
              copyObject();
            }}
          >
            Скопировать объект
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              refControls.current.enableRotate = true;
              deleteObject();
            }}
          >
            Удалить объект
          </a>
        </li>
        <li>
          <a href="#" onClick={() => handleExport(scene)}>
            Скачать
          </a>
        </li>
        <li>
          {id ? (
            <a href="#" onClick={() => changeScene(id)}>
              Сохранить изменения
            </a>
          ) : (
            <a href="#" onClick={() => setModalActive(true)}>
              Сохранить
            </a>
          )}
        </li>
      </ul>
    </div>
  );
};
