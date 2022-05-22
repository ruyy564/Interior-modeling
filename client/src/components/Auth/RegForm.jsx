import React from 'react';
import Input from '../Common/Input';
import Button from '../Common/Button';
import Group from '../Common/Group';
import Form from '../Common/Form';
import BackgroundForm from '../Auth/BackgroundForm';

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
