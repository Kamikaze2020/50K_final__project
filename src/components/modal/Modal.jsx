import React from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";


const ModalComponent = ({isModalVisible, handleOk, handleCancel,addItem}) => {


  let layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
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
        <Form.Item  key="submit" wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button form='myForm' type="primary" htmlType="submit" onClick={handleOk}>
            Сохранить и закрыть
          </Button>
        </Form.Item>
      ]}
    >
      <Form id='myForm' {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
      >
        <Form.Item name='name' label='Имя пациента' rules={[{required: true}]}>
          <Input placeholder='ФИО пациента'/>
        </Form.Item>
        <Form.Item name='birth' label="Дата рождения" >
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