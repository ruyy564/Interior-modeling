import { NavLink } from 'react-router-dom';

export const Item = ({
  el,
  download,
  publish,
  deleteData,
  reject,
  openModal,
  setIdModal,
}) => {
  return (
    <div key={el._id} className="item">
      <img src={el.image} alt="...упс" />
      <span>{el.name}</span>
      <div className="item-back">
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
      </div>
    </div>
  );
};
