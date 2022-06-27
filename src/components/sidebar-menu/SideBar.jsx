import React, {useState} from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";

import './styles.scss';
import {avatarImg} from 'assets';
import {ModalComponent, ModalForm} from "../modal";
 import {DarkMode} from "../dark-mode";

const SidebarMenu = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showMenu = () => {
    setActive(!active)
  }

  return (
    <>
      <h1 className="menu" onClick={() => showMenu()}>
        <button/>
        LOGO PROJECT
      </h1>
      <div className={active ? 'sidebar menu__active' : 'sidebar '}>
        <div className="user">
          <img src={avatarImg} alt="user"/>
          <p className='user__name'>Чон Кыз
            <span>Администратор</span>
          </p>
        </div>
        <div className='sidebar__nav'>
          <Link onClick={() => showMenu()} to={'/'}>Запись на приём</Link>
          <Link onClick={() => showMenu()} to={'/doctors'}>Врачи</Link>
          <Link onClick={() => showMenu()} to={'/patient'}>Пациенты</Link>
          <Link onClick={() => showMenu()} to={'/services'}>Услуги</Link>
          <Link onClick={() => showMenu()} to={'/profile'}>Профиль</Link>
        </div>
        <div className="btns">
          <Button className='make-appointment' onClick={showModal}> Записать на приём</Button>
        </div>
        <ModalForm handleOk={handleOk} isModalVisible={isModalVisible}
                        handleCancel={handleCancel}/>
        {/*<ModalComponent handleOk={handleOk} isModalVisible={isModalVisible}*/}
        {/*                handleCancel={handleCancel}/>*/}
        <DarkMode/>
      </div>
    </>

  );
};

export default SidebarMenu;