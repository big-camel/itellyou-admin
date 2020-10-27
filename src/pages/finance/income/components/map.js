import React from 'react';
import { DatePicker } from 'antd';
import ConfigValue from './ConfigValue'

export default {
  Date: {
    label: '所属日期',
    component:DatePicker,
    rules: [
      {
        required: true,
        message: '请选择日期',
      },
    ],
  },
  Value: {
    label:"收益分配",
    component: ConfigValue,
    valuePropName:"value",
    rules: [
      {
        required: true,
        message: '请添加收益分配',
      },
    ],
  }
};
