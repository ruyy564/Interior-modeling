export const Item = ({ el, download, publish, deleteData }) => {
  return (
    <div key={el._id} className="item">
      <img src={el.image} alt="...упс" />
      <span>{el.name}</span>
      <div className="item-back">
        <ul className="sub-menu">
          <li>
            <a href="#">Открыть</a>
          </li>
          <li>
            <a href="#">Редактировать</a>
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
      </div>
    </div>
  );
};
