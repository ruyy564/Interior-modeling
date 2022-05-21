import React from 'react';
import Input from './Input';
import Button from './Button';
import Group from './Group';
import Form from './Form';
import BackgroundForm from './BackgroundForm';

export default function AuthForm({ authHandler }) {
  return (
    <>
      <Form>
        <h2>Авторизация</h2>
        <Group>
          <Input type={'text'} placeholder={'Email'} icon={'mail'} />
          <Input type={'password'} placeholder={'Password'} icon={'lock'} />
        </Group>
        <Group>
          <Button className={'log'} value={'Войти'} />
          <a href={'#'} onClick={authHandler}>
            Создать аккаунт
          </a>
        </Group>
      </Form>
      <BackgroundForm />
    </>
  );
}
