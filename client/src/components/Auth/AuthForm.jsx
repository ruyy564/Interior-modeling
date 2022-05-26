import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Group from '../Common/Group';
import Form from '../Common/Form';
import BackgroundForm from '../Auth/BackgroundForm';

export default function AuthForm({ authHandler }) {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });

      auth.login(data.token, data.userId);
    } catch (e) {}
  };
  return (
    <>
      <Form>
        {error && <span>{error}</span>}
        <h2>Авторизация</h2>
        <Group>
          <Input
            type={'text'}
            placeholder={'Email'}
            icon={'mail'}
            name={'email'}
            formHandler={formHandler}
          />
          <Input
            type={'password'}
            placeholder={'Password'}
            icon={'lock'}
            name={'password'}
            formHandler={formHandler}
          />
        </Group>
        <Group>
          <Button className={'log'} value={'Войти'} onClick={loginHandler} />
          <a href={'#'} onClick={authHandler}>
            Создать аккаунт
          </a>
        </Group>
      </Form>
      <BackgroundForm />
    </>
  );
}
