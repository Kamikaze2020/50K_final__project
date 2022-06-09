import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';
import {SidebarMenu} from "../sidebar-menu";
import {TableList} from "../table-list";
import {Doctors, NotFound, Patient, Profile, Services} from "../pages";
import {fetchClients} from "../../store/asyncActions/client";

const App = () => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);


  useEffect(() => {
    dispatch(fetchClients())
  }, [])

  return (
    <div className='app'>
      <SidebarMenu/>
      <Routes>
        <Route path={'/'} element={
          <TableList
            dataSource={clients}
          />
        }
        />
        <Route path={'/doctors'} element={<Doctors/>}/>
        <Route path={'/patient'} element={<Patient/>}/>
        <Route path={'/services'} element={<Services/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'*'} element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App;