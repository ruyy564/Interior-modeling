import React from 'react';
import Input from './Input';
import Button from './Button';
import Group from './Group';
import Form from './Form';
import BackgroundForm from './BackgroundForm';

export default function RegForm({ authHandler }) {
  return (
    <>
      <Form>
        <h2>Регистрация</h2>
        <Group>
          <Input type={'text'} placeholder={'Email'} icon={'mail'} />
          <Input type={'text'} placeholder={'Password'} icon={'lock'} />
          <Input type={'text'} placeholder={'Nickname'} icon={'person'} />
        </Group>
        <Group>
          <Button className={'log'} value={'Зарегистрироваться'} />
          <a href={'#'} onClick={authHandler}>
            Назад
          </a>
        </Group>
      </Form>
      <BackgroundForm type={'form-reg'} />
    </>
  );
}
