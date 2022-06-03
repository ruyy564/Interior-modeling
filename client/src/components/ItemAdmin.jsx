import { NavLink } from 'react-router-dom';

export const ItemAdmin = ({
  el,
  download,
  publish,
  deleteData,
  reject,
  openModal,
  setIdModal,
  findByidType,
  findByidStatus,
  filtered,
}) => {
  return (
    <div key={el._id} className="item">
      <img src={el.image} alt="...упс" />
      <span>{el.name}</span>
      {findByidType(filtered.type) === 'Текстура' && (
        <div className="item-back">
          {findByidStatus(filtered.status) === 'Приватный' ? (
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
                  Опубликовать
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
          ) : findByidStatus(filtered.status) === 'На проверке' ? (
            <ul className="sub-menu">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    publish(el._id);
                  }}
                >
                  Опубликовать
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    console.log('jgh');
                    reject(el._id);
                  }}
                >
                  Отменить
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
          )}
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
                    download(el._id);
                  }}
                >
                  Загрузить
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    publish(el._id);
                  }}
                >
                  Опубликовать
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
          ) : findByidStatus(filtered.status) === 'На проверке' ? (
            <ul className="sub-menu">
              <li>
                <NavLink to={`/show${el._id}`}>Открыть</NavLink>
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
                    download(el._id);
                  }}
                >
                  Загрузить
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    publish(el._id);
                  }}
                >
                  Опубликовать
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    console.log('jgh');
                    reject(el._id);
                  }}
                >
                  Отменить
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
                <NavLink to={`/show${el._id}`}>Открыть</NavLink>
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
                    download(el._id);
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
          )}
        </div>
      )}
    </div>
  );
};
