import React from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Group from '../Common/Group';
import Form from '../Common/Form';
import BackgroundForm from '../Auth/BackgroundForm';

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
