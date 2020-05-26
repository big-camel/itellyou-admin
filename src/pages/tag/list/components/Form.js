import React, { useState, useEffect } from 'react';
import { Modal, Select } from 'antd';
import Form from '@/components/Form';
import { list } from '@/services/tag/group';
import formMap from './map';
import { query } from '../service';

const { Name, Disabled, Group } = Form.createItem(formMap);

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

  const { id, name, disabled, group } = values || {};

  const [formVals] = useState({
    id,
    name,
    disabled,
    group_id: group ? group.id : 0,
  });

  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    list({
      offset: 0,
      limit: 10000,
    }).then(({ result, data }) => {
      if (result) {
        setGroupData(data.data);
      }
    });
  }, [list, form]);

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
      title="修改标签"
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
          group_id: formVals.group_id,
        }}
        {...props.form}
      >
        <Name
          name="name"
          asyncValidator={(_, value) => {
            return new Promise((resolve, reject) => {
              query({ name: value })
                .then(({ result }) => {
                  if (result) resolve();
                  else reject(new Error('名称已存在'));
                })
                .catch(() => reject(new Error('请求错误，请重试')));
            });
          }}
        />
        <Disabled name="disabled" />
        <Group name="group_id">
          <Select.Option value={0}>未选择</Select.Option>
          {groupData.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Group>
      </Form>
    </Modal>
  );
};
