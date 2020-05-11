import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';
import { queryName } from '../service';

const { Name, Description } = Form.createItem(formMap);

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export default ({ values, modalVisible, onCancel, ...props }) => {
  const { name, description } = values || {};
  const [formVals, setFormVals] = useState({
    name,
    key: name,
    description,
  });

  const [form] = Form.useForm();

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
      title="添加角色"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          description: formVals.description,
        }}
        {...props.form}
      >
        <Name
          name="name"
          asyncValidator={(_, value) => {
            return new Promise((resolve, reject) => {
              queryName({ name: value })
                .then(({ result }) => {
                  if (result) resolve();
                  else reject(new Error('名称已存在'));
                })
                .catch(() => reject(new Error('请求错误，请重试')));
            });
          }}
        />
        <Description name="description" />
      </Form>
    </Modal>
  );
};
