import React from 'react';
import { InputNumber } from 'antd';

export default {
  Name: {
    label: '等级名称',
    rules: [
      {
        required: true,
        message: '请输入等级名称',
      },
    ],
  },
  Score: {
    component: <InputNumber />,
    rules: [
      {
        required: true,
        message: '请输入分数',
      },
    ],
  },
};
