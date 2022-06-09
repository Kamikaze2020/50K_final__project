import React from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {addClients} from "../../store/asyncActions/client";
import {useDispatch} from "react-redux";


const ModalComponent = ({isModalVisible, handleOk, handleCancel}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const addItem = (text) => {
    const newItem = {
      key: new Date().getUTCMilliseconds(),
      id: new Date().getUTCMilliseconds(),
      name: text.name,
      birth: text.birth,
      phone: text.phone,
      meet_data: text.meet_data,
      status: "Ожидает"
    }

    dispatch(addClients(newItem))
  }


  let layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (values) => {
    const res = {
      ...values,
      'birth': values['birth'].format("DD.MM.YYYY"),
      'meet_data': values['meet_data'].format("DD.MM.YYYY")
    }

    return addItem(res)
  };

  return (
    <Modal
      title="Запись на приём"
      visible={isModalVisible}
      onCancel={handleCancel}
      okText='Сохранить и закрыть'
      className='modalStyle'
      okButtonProps={{style: {borderRadius: '5px', height: '50px'}}}
      cancelButtonProps={{style: {display: 'none'}}}
      width={800}
      footer={[
        <Form.Item key="submit" wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button form='myForm' type="primary" htmlType="submit" onClick={handleOk}>
            Сохранить и закрыть
          </Button>
          <Button onClick={()=> form.resetFields()}>Сбросить</Button>
        </Form.Item>
      ]}
    >
      <Form id='myForm' {...layout} name="nest-messages" form={form} onFinish={onFinish}>
        <Form.Item name='name' label='Имя пациента'>
          <Input placeholder='ФИО пациента'/>
        </Form.Item>
        <Form.Item name='birth' label="Дата рождения">
          <DatePicker/>
        </Form.Item>
        <Form.Item
          name='phone'
          label="Номер телефона"
        >
          <Input/>
        </Form.Item>
        <Form.Item name='meet_data' label="Дата">
          <DatePicker/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;