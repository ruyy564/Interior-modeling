import React, { useState, useEffect, useCallback } from 'react';

import { useHttp } from '../../hooks/http.hook';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Group from '../Common/Group';
import Form from '../Common/Form';
import BackgroundForm from '../Auth/BackgroundForm';

export default function RegForm({ authHandler }) {
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    try {
      const data = await request('/api/auth/registration', 'POST', { ...form });
      authHandler();
    } catch (e) {}
  };

  return (
    <>
      <Form>
        {error && <span>{error}</span>}
        <h2>Регистрация</h2>
        <Group>
          <Input
            type={'text'}
            name={'email'}
            placeholder={'Email'}
            icon={'mail'}
            formHandler={formHandler}
          />
          <Input
            type={'text'}
            name={'password'}
            placeholder={'Password'}
            icon={'lock'}
            formHandler={formHandler}
          />
          <Input
            type={'text'}
            name={'nickname'}
            placeholder={'Nickname'}
            icon={'person'}
            formHandler={formHandler}
          />
        </Group>
        <Group>
          <Button
            className={'log'}
            value={'Зарегистрироваться'}
            onClick={registerHandler}
          />
          <a href={'#'} onClick={authHandler}>
            Назад
          </a>
        </Group>
      </Form>
      <BackgroundForm type={'form-reg'} />
    </>
  );
}
