import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import FileLoader from '../loaders/FileLoader';
import { typeEnum } from '../enums/typeEnum';

export const useData = () => {
  const [type, setType] = useState(null);
  const [item, setItem] = useState(null);
  const [filtered, setFilterd] = useState({
    item: [],
    type: null,
  });
  const { request } = useHttp();

  const getTypes = async () => {
    const data = await request('api/design/types', 'GET');
    setType(data.types);
  };

  const getData = async () => {
    const { userId } = JSON.parse(localStorage.getItem('userData'));
    const data = await request(`api/design/catalogbyuser/${userId}`, 'GET');

    setItem(data.projects);
    setFilterd(data.projects);
  };

  const download = async (id) => {
    const data = await request(`api/design/data/${id}`, 'GET');

    console.log(data.value);
    //FileLoader.saveString(data.value, `${2}.gltf`);
  };

  useEffect(() => {
    getTypes();
    getData();
  }, []);

  const filterByType = (id) => {
    filterData(id, filtered.status);
  };

  const filterData = (typeId) => {
    const filterData = item.filter((elem) => elem.type === typeId);

    setFilterd((prev) => ({
      item: filterData,
      type: typeId,
    }));
  };

  useEffect(() => {
    if (item !== null && type !== null) {
      if (!filtered.item)
        filterData(
          (() => {
            const data = type.filter((el) => el.parent !== null);

            return data[0]._id;
          })()
        );
      else filterData(filtered.type);
    }
  }, [item, type]);

  const findByidType = (id) => {
    return typeEnum[type.filter((el) => el._id == id)[0].name];
  };

  return {
    type,
    filtered,
    filterByType,
    findByidType,
    download,
  };
};