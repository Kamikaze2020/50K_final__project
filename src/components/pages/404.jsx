import React from 'react';
import {Button, Result} from 'antd';
import {useNavigate} from "react-router-dom";
import './style.scss';


const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = e => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Result
      style={{width: '100%'}}
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={<Button onClick={handleClick} type="primary">Вернуться назад</Button>}
    />
  );
};

export default NotFound;