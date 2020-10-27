import React from 'react';
import { Input , InputNumber } from 'antd';

export default {
  Name: {
    label: '配置名称',
    rules: [
      {
        required: true,
        message: '请输入配置名称',
      },
    ],
  },
  Scale: {
    component: <InputNumber />,
    label: '分成比例',
    rules: [
      {
        required: true,
        message: '请输入分成比例',
      },
    ],
  },
  Remark: {
    label: '备注',
    component: Input.TextArea,
    props: {
      autoSize: { minRows: 4, maxRows: 8 },
      maxLength: 200,
    },
  }
};
