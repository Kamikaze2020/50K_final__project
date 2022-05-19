import React, {useState} from 'react';
import {Button} from "antd";
import {Link} from "react-router-dom";

import './styles.scss';
import {avatarImg} from 'assets';
import {ModalComponent} from "../modal";
import {DarkMode} from "../dark-mode";

const SidebarMenu = ({addItem}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [active, setActive] = useState(false)

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
          <p className='user__name'>Гульмира Гульмировна
            <span>Администратор</span>
          </p>
        </div>
        <div className='sidebar__nav'>
          <Link to={'/'}>Запись на приём</Link>
          <Link to={'/doctors'}>Врачи</Link>
          <Link to={'/patient'}>Пациенты</Link>
          <Link to={'/services'}>Услуги</Link>
          <Link to={'/profile'}>Профиль</Link>
        </div>
        <div className="btns">
          <Button className='make-appointment' onClick={showModal}> Записать на приём</Button>
        </div>

        <ModalComponent addItem={addItem} handleOk={handleOk} isModalVisible={isModalVisible}
                        handleCancel={handleCancel}/>
        <DarkMode/>
      </div>
    </>

  );
};

export default SidebarMenu;