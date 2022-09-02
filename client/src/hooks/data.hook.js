import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import FileLoader from '../loaders/FileLoader';
import { statusEnum } from '../enums/statusEnum';
import { typeEnum } from '../enums/typeEnum';

export const useData = () => {
  const [type, setType] = useState(null);
  const [item, setItem] = useState(null);
  const [filtered, setFilterd] = useState({
    item: [],
    status: null,
    type: null,
  });
  const [status, setStatus] = useState(null);
  const { request } = useHttp();

  const getStatuses = async () => {
    const data = await request('api/design/statuses', 'GET');
    setStatus(data.statuses);
  };

  const getTypes = async () => {
    const data = await request('api/design/types', 'GET');
    setType(data.types);
  };

  const getData = async () => {
    const role = JSON.parse(localStorage.getItem('userData')).role;
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    let data;

    if (role === 'ADMIN') {
      data = await request(`api/design/alldata/${userId}`, 'GET');
    } else {
      data = await request(`api/design/databyuser/${userId}`, 'GET');
    }

    setItem(data.projects);
    setFilterd(data.projects);
  };

  const publish = async (id) => {
    const data = await request(`api/design/publish/${id}`, 'PUT');
    const status = data.status;

    setItem((prev) => {
      const newItem = prev.map((el) => {
        if (el._id === id) {
          el.status = status;
        }

        return el;
      });

      return [...newItem];
    });

    setFilterd((prev) => {
      const newItem = prev.item.filter((el) => el._id !== id);

      return { ...prev, item: [...newItem] };
    });
  };

  const rejected = async (id) => {
    const data = await request(`api/design/cancel/${id}`, 'PUT');
    const status = data.status;

    setItem((prev) => {
      const newItem = prev.map((el) => {
        if (el._id === id) {
          el.status = status;
        }

        return el;
      });

      return [...newItem];
    });

    setFilterd((prev) => {
      const newItem = prev.item.filter((el) => el._id !== id);

      return { ...prev, item: [...newItem] };
    });
  };

  const accept = async (id) => {
    const data = await request(`api/design/accept/${id}`, 'PUT');
    const status = data.status;

    setItem((prev) => {
      const newItem = prev.map((el) => {
        if (el._id === id) {
          el.status = status;
        }

        return el;
      });

      return [...newItem];
    });

    setFilterd((prev) => {
      const newItem = prev.item.filter((el) => el._id !== id);

      return { ...prev, item: [...newItem] };
    });
  };

  const download = async (id, type, ref) => {
    const data = await request(`api/design/data/${id}`, 'GET');

    FileLoader.saveString(data.value, `${2}.gltf`);
  };

  const deleteData = (id) => {
    setItem(item.filter((el) => el._id !== id));
    filterData(filtered.type, filtered.status);
    request(`api/design/data/${id}`, 'DELETE');
  };

  useEffect(() => {
    getStatuses();
    getTypes();
    getData();
  }, []);

  const filterByType = (id) => {
    filterData(id, filtered.status);
  };

  const checkChildern = (typeId, parent) => {
    const children = type.filter((el) => el.parent === parent);
    let result = false;

    children.forEach((el) => {
      if (el._id === typeId) result = true;
    });
    return result;
  };
  const filterData = (typeId, statusId) => {
    const filterData = item.filter(
      (elem) =>
        (elem.type === typeId || checkChildern(elem.type, typeId)) &&
        elem.status === statusId
    );

    setFilterd((prev) => ({
      item: filterData,
      type: typeId,
      status: statusId,
    }));
  };

  const filterByStatus = (id) => {
    filterData(filtered.type, id);
  };

  useEffect(() => {
    if (item !== null && status !== null && type !== null) {
      if (!filtered.item) filterData(type[0]._id, status[0]._id);
      else filterData(filtered.type, filtered.status);
    }
  }, [status, item, type]);

  const findByidType = (id) => {
    return typeEnum[type.filter((el) => el._id == id)[0].name];
  };

  const findByidStatus = (id) => {
    return statusEnum[status.filter((el) => el._id == id)[0].name];
  };
  return {
    type,
    status,
    filtered,
    filterByType,
    filterByStatus,
    findByidType,
    findByidStatus,
    download,
    publish,
    deleteData,
    rejected,
    accept,
    item,
    setFilterd,
    setItem,
  };
};