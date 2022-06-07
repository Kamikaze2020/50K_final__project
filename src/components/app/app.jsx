import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";

import './styles.scss';
import {SidebarMenu} from "../sidebar-menu";
import {TableList} from "../table-list";
import {Doctors, NotFound, Patient, Profile, Services} from "../pages";
import {addClients, fetchClients} from "../../store/asyncActions/client";

const App = () => {
  // const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const clients = useSelector(state => state.clients.clients);

  useEffect(() => {
    dispatch(fetchClients(clients))
  }, [])


  const addItem = async (text) => {
    const newItem = {
      key: clients.length + 1,
      id: new Date().getUTCMilliseconds(),
      name: text.name,
      birth: text.birth,
      phone: text.phone,
      meet_data: text.meet_data,
      status: "Ожидает"
    }

    dispatch(addClients(newItem))

    // await axios.post('http://localhost:5000/users', newItem)
    // setDataSource([...dataSource, newItem])

  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`)
    // setDataSource(dataSource.filter((item) => item.id !== id))
  }


  const onSearch = (e) => {
    const currValue = e.target.value.toLowerCase();
    if (currValue.length === 0) {
      console.log('empty!!!')
      // return setDataSource(dataSource), setValue('')
    }

    // setValue(currValue);
    // const filteredData = dataSource.filter(entry => entry.name.toLowerCase().includes(currValue))
    // setDataSource(filteredData)
  }

  return (
    <div className='app'>
      <SidebarMenu addItem={addItem}/>
      <Routes>
        <Route path={'/'} element={
          <TableList
            clients={clients}
            value={value}
            onSearch={onSearch}
            handleDelete={handleDelete}
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