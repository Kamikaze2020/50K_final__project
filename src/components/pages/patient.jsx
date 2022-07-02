import React, {useState} from 'react';
import {Button, Input, Modal, Table} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

const Patient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      key: 1,
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 2,
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: 3,
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: 4,
      title: 'Address',
      dataIndex: 'address'
    },
    {
      key: 5,
      title: 'Actions',
      render: (record) => {
        return <>
          <EditOutlined onClick={() => {
            onEditStudent(record)
          }
          }/>
          <DeleteOutlined
            onClick={() => {
              onDeleteStudent(record)
            }
            }
            style={({color: 'red', marginLeft: 12})}
          />
        </>
      }
    }
  ];


  React.useEffect(() => {
    const data = []
    for (let index = 0; index < 4; index++) {
      data.push({
        key: index,
        id: index + 1,
        name: `Name ${index}`,
        email: `example${index}@gmail.com`,
        address: `Address ${index}`,
      });
    }
    setDataSource(data)
  }, [])

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000)
    const newStudent = {
      key: randomNumber,
      id: randomNumber,
      name: `Name ${randomNumber}`,
      email: `example${randomNumber}@gmail.com`,
      address: `Address ${randomNumber}`,
    }
    setDataSource(pre => {
      return [...pre, newStudent]
    })
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this student record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id)
        })
      }
    })
  };

  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({...record})
  }

  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null)
  }

  return (
    <div className={'test-title'}>
      <h1>Пациенты</h1>
      <Button onClick={onAddStudent}>Add a new Student</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
      <Modal
        title='Edit Student'
        visible={isEditing}
        okText='Save'
        onCancel={() => {
          resetEditing()
        }}
        onOk={() => {
          setDataSource(pre => {
            return pre.map(student => {
              if (student.id === editingStudent.id) {
                return editingStudent
              } else{
                return student
              }
            })
          })
          resetEditing()
        }}
      >
        <Input value={editingStudent?.name}
               onChange={(e) => {
                 setEditingStudent(pre => {
                   return {...pre, name: e.target.value}
                 })
               }}/>
        <Input value={editingStudent?.email}
               onChange={(e) => {
                 setEditingStudent(pre => {
                   return {...pre, email: e.target.value}
                 })
               }}
        />
        <Input value={editingStudent?.address}
               onChange={(e) => {
                 setEditingStudent(pre => {
                   return {...pre, address: e.target.value}
                 })
               }}
        />

      </Modal>
    </div>
  );
};

export default Patient;