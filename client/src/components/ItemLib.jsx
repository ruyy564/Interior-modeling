import { NavLink } from 'react-router-dom';

export const ItemLib = ({ el, download, findByidType, filtered }) => {
  return (
    <div key={el._id} className="item">
      <img src={el.image} alt="...упс" />
      <span>{el.name}</span>
      {findByidType(filtered.type) !== 'Текстура' && (
        <div className="item-back">
          <ul className="sub-menu">
            <li>
              <NavLink to={`/show${el._id}`}>Открыть</NavLink>
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
          </ul>
        </div>
      )}
    </div>
  );
};
