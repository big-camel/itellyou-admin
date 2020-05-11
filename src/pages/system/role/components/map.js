import React from 'react';
import { Input, Switch } from 'antd';

export default {
  Name: {
    label: '角色名称',
    rules: [
      {
        required: true,
        message: '请输入权限名称',
      },
    ],
  },
  Disabled: {
    label: '是否禁用',
    component: <Switch />,
    valuePropName: 'checked',
  },
  Description: {
    label: '备注',
    component: Input.TextArea,
    props: {
      autoSize: { minRows: 4, maxRows: 8 },
      maxLength: 200,
    },
  },
};
