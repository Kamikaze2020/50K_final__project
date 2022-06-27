import React, {useState} from 'react';
import {Button, Form, Input, Table} from "antd";


const NotFound = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const isEditing = (record) => record.key === editingRow;

  React.useEffect(() => {
    const data = []
    for (let index = 0; index < 7; index++) {
      data.push({
        key: index,
        name: `Name ${index}`,
        address: `Address ${index}`,
      });
    }
    setDataSource(data)
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              name='name'
              rules={[{
                required: true,
                message: "Please enter your name"
              }]}
            >
              <Input/>
            </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      }
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name='address'
              rules={[{
                required: true,
                message: "Please enter your address"
              }]}
            >
              <Input/>
            </Form.Item>
          )
        } else {
          return <p>{text}</p>
        }
      }
    },
    {
      title: 'Actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button
              type='link'
              onClick={() => {
                setEditingRow(record.key)
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                })
              }}
            >
              Cancel
            </Button>
            <Button type='link' htmlType='submit'>
              Save
            </Button>
          </>
        ) : (
          <Button>Edit</Button>
        )
      }
    }
  ];

  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, {...values, key: editingRow})
    setDataSource(updatedDataSource)
    setEditingRow(null)
  }

  return (
    <div className={'test-title'}>
      <h1>Not Found 404</h1>
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          dataSource={dataSource}
        />
      </Form>
    </div>
  );
};

export default NotFound;