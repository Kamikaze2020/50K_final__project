import React, {useState} from 'react';
import {Input, Modal, Table} from 'antd';
import {useDispatch} from "react-redux";
import {DeleteOutlined} from '@ant-design/icons';

import './styles.scss';
import {removeClients} from "../../store/Actions/clientActions";


const TableList = ({data}) => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');


  const columns = [
    {
      title: 'ФИО пациента',
      dataIndex: 'name',
    },
    {
      title: 'Дата рождения',
      dataIndex: 'dob',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
    },
    {
      title: 'Планируемая дата посещения',
      dataIndex: 'meet_date',
      width: 150
    },
    {
      title: 'Статус заявки',
      dataIndex: 'status',
    },
    {
      title: 'Действия',
      render: (record) => {
        return <DeleteOutlined
            onClick={() => onRemoveClient(record)}
            style={({color: 'red', marginLeft: 18})}
          />
      }
    }
  ];

  const onSearch = () => {
    return data.filter((val) => {
      if (searchTerm === '') {
        return val
      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val
      }
    })
  };

  const onRemoveClient = (record) => {
    Modal.confirm({
      title: 'Вы уверенны, вы точно хотите удалить этого клиента?',
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'danger',
      onOk: () => {
        dispatch(removeClients(record.id))
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
      <div className='clients__count'>Количество клиентов: <b>{data.length}</b></div>
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