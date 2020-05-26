import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';

const { Text, Link, Target } = Form.createItem(formMap);

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

  const [formVals] = useState({});

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    if (props.onSubmit) {
      const update = {};
      Object.keys(fieldsValue).forEach((p) => {
        if (fieldsValue[p] !== formVals[p]) {
          update[p] = fieldsValue[p];
        }
      });
      props.onSubmit(update);
    }
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="新增链接"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          target: '_blank',
        }}
        {...props.form}
      >
        <Text name="text" />
        <Link name="link" />
        <Target name="target" />
      </Form>
    </Modal>
  );
};
