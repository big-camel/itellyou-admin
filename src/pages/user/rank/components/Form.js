import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';
import { queryName } from '../service';

const { Name, Score } = Form.createItem(formMap);

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

  const { id, name, min_score, max_score } = values || {};
  const [formVals] = useState({
    id,
    name,
    min_score,
    max_score,
  });

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    if (props.onSubmit) {
      let update = {
        id,
      };
      fieldsValue.forEach((p) => {
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
      title="修改等级"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          min_score: formVals.min_score,
          max_score: formVals.max_score,
        }}
        {...props.form}
      >
        <Name
          name="name"
          asyncValidator={(_, value) => {
            if (!id && value === name) return Promise.resolve();
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
        <Score label="最小分数" name="min_score" />
        <Score label="最大分数" name="max_score" />
      </Form>
    </Modal>
  );
};
