import React, {useState} from 'react';
import {Input, Table} from 'antd';
import {useDispatch} from "react-redux";

import './styles.scss';
import {removeClients} from "../../store/asyncActions/client";

const TableList = ({dataSource}) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      title: 'ФИО пациента',
      dataIndex: 'name',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birth',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
    },
    {
      title: 'Планируемая дата посещения',
      dataIndex: 'meet_data',
      width: 150
    },
    {
      title: 'Статус заявки',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      fixed: 'right',
      render: (_, record) => {
        return (<a onClick={() => dispatch(removeClients(record.id))}>Delete</a>)
      },
    }
  ];

  const onSearch = () => {
    return dataSource.filter((val) => {
      if (searchTerm === '') {
        return val
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    })
  }



  return (
    <div className='table-list'>
      <div className='table-list__title'>
        <h2>Запись на приём</h2>
        <label>
          <Input type="search" placeholder='Поиск пациента по имени'
                 onChange={e => setSearchTerm(e.target.value.toLowerCase())}/>
        </label>
      </div>
      <div className='clients__count'>Количество клиентов: <b>{dataSource.length}</b></div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={onSearch()}
        scroll={{x: 'max-content'}}
        bordered
      />
    </div>
  );
};

export default TableList;