import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';

const { Name, Description, Disabled } = Form.createItem(formMap);

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const UpdateForm = ({ values, modalVisible, onCancel, ...props }) => {
  const [form] = Form.useForm();
  const { id, name, disabled, description } = values || {};
  const [formVals] = useState({
    name,
    disabled,
    description,
    id,
  });

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    if (props.onSubmit) {
      const update = {};
      fieldsValue.forEach((p) => {
        if (fieldsValue[p] !== formVals[p]) {
          update[p] = fieldsValue[p];
        }
      });
      props.onSubmit({ id, ...update });
    }
  };
  return (
    <Modal
      width={640}
      destroyOnClose
      title="修改角色"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          disabled: formVals.disabled,
          description: formVals.description,
        }}
        {...props.form}
      >
        <Name name="name" />
        <Disabled name="disabled" />
        <Description name="description" />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
