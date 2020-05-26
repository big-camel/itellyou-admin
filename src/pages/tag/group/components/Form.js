import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';

const { Name } = Form.createItem(formMap);

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export default ({ values, modalVisible, onCancel, ...props }) => {
  const [form] = Form.useForm();

  const { id, name } = values || {};
  const [formVals] = useState({
    id,
    name,
  });

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    if (props.onSubmit) {
      let update = {
        id,
      };
      Object.keys(fieldsValue).forEach((p) => {
        if (fieldsValue[p] !== formVals[p]) {
          update[p] = fieldsValue[p];
        }
      });
      if (!id) {
        update = { id, ...formVals, ...fieldsValue };
      }
      props.onSubmit(update);
    }
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title={id ? '修改分组' : '创建分组'}
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
        }}
        {...props.form}
      >
        <Name name="name" />
      </Form>
    </Modal>
  );
};
