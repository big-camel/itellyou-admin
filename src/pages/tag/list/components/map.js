import React from 'react';
import { Switch, Select } from 'antd';

export default {
  Name: {
    label: '名称',
    rules: [
      {
        required: true,
        message: '请输入名称',
      },
    ],
  },
  Disabled: {
    label: '是否禁用',
    component: <Switch />,
    valuePropName: 'checked',
  },
  Group: {
    label: '所属分组',
    component: <Select />,
  },
};
