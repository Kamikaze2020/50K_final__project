import React from 'react';
import {Input, Table} from 'antd';

import './styles.scss';
import {useDispatch} from "react-redux";
import {removeClients} from "../../store/asyncActions/client";

const TableList = ({clients, onSearch, value, handleDelete}) => {
  const dispatch = useDispatch();

  console.log(clients)

  const columns = [
    {
      title: 'ФИО пациента',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 0,
      }
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

  return (
    <div className='table-list'>
      <div className='table-list__title'>
        <h2>Запись на приём</h2>
        <label>
          <Input type="search" placeholder='Поиск пациента' value={value} onChange={onSearch}/>
        </label>
      </div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={clients}
        scroll={{x: 'max-content'}}
        bordered
      />
    </div>
  );
};

export default TableList;