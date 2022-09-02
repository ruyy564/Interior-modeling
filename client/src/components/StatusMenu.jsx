import React from 'react';
import { statusEnum } from '../enums/statusEnum';

export const StatusMenu = ({ status, filterByStatus }) => {
  return (
    <div>
      <ul className="sub-menu status">
        {status &&
          status.map((elem) => (
            <li key={elem._id}>
              <a
                href="#"
                onClick={() => {
                  filterByStatus(elem._id);
                }}
              >
                {statusEnum[elem.name]}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
