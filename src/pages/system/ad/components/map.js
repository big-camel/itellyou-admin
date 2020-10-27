import React from 'react';
import { Select , Switch } from 'antd';

export default {
  Type: {
    label: '广告类型',
    component:<Select>
        <Select.Option value="baidu">百度</Select.Option>
        <Select.Option value="adsense">Adsense</Select.Option>
    </Select>,
    rules: [
      {
        required: true,
        message: '请选择广告类型',
      },
    ],
  },
  Name: {
    label:"广告名称",
    rules: [
      {
        required: true,
        message: '请输入广告名称',
      },
    ],
    props: {
        autoComplete: 'off' 
    }
  },
  DataId:{
    label:"第三方标识",
    help:{content:"如Google Adsense的client属性"},
    props:{
        autoComplete: 'off' 
    }
  },
  EnabledForeign:{
      label:"国外启用",
      component:<Switch />,
      valuePropName: 'checked',
  },
  EnabledCn:{
    label:"国内启用",
    component:<Switch />,
    valuePropName: 'checked',
}
};
