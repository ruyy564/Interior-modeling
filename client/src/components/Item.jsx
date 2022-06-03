import { NavLink } from 'react-router-dom';

export const Item = ({
  el,
  download,
  publish,
  deleteData,
  findByidType,
  openModal,
  setIdModal,
  findByidStatus,
  filtered,
}) => {
  return (
    <div key={el._id} className="item">
      <img src={el.image} alt="...упс" />
      <span>{el.name}</span>
      {findByidType(filtered.type) === 'Текстура' &&
        findByidStatus(filtered.status) === 'Приватный' && (
          <div className="item-back">
            <ul className="sub-menu">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    openModal(true);
                    setIdModal();
                  }}
                >
                  Редактировать
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => {
                    publish(el._id);
                  }}
                >
                  Отправить на проверку для публикации
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    deleteData(el._id);
                  }}
                >
                  Удалить
                </a>
              </li>
            </ul>
          </div>
        )}
      {findByidType(filtered.type) !== 'Текстура' && (
        <div className="item-back">
          {findByidStatus(filtered.status) === 'Приватный' ? (
            <ul className="sub-menu">
              <li>
                <NavLink to={`/create${el._id}`}>Открыть</NavLink>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    download(el._id, filtered.type, e.target);
                  }}
                >
                  Загрузить
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    openModal(true);
                    setIdModal();
                  }}
                >
                  Редактировать
                </a>
              </li>

              <li>
                <a
                  href="#"
                  onClick={() => {
                    publish(el._id);
                  }}
                >
                  Отправить на проверку для публикации
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    deleteData(el._id);
                  }}
                >
                  Удалить
                </a>
              </li>
            </ul>
          ) : findByidStatus(filtered.status) === 'Отменено' ? (
            <ul className="sub-menu">
              <li>
                <NavLink to={`/create${el._id}`}>Открыть</NavLink>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    download(el._id, filtered.type, e.target);
                  }}
                >
                  Загрузить
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    deleteData(el._id);
                  }}
                >
                  Удалить
                </a>
              </li>
            </ul>
          ) : (
            <ul className="sub-menu">
              <li>
                <NavLink to={`/create${el._id}`}>Открыть</NavLink>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    download(el._id, filtered.type, e.target);
                  }}
                >
                  Загрузить
                </a>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
