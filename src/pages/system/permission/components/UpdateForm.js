import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';

const { Name, Platform, Type, Method, Data, Remark } = Form.createItem(formMap);

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

  const { name, platform, type, method, data, remark } = values || {};
  const [formVals, setFormVals] = useState({
    name,
    platform,
    key: name,
    type,
    method,
    data,
    remark,
  });

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    if (props.onSubmit) {
      props.onSubmit(fieldsValue);
    }
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="修改权限"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          platform: formVals.platform,
          type: formVals.type,
          method: formVals.method,
          data: formVals.data,
          remark: formVals.remark,
        }}
        {...props.form}
      >
        <Name name="name" disabled />
        <Platform name="platform" />
        <Type name="type" />
        <Method name="method" />
        <Data name="data" />
        <Remark name="remark" />
      </Form>
    </Modal>
  );
};

export default UpdateForm;
