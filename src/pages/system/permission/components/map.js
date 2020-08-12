import React from 'react';
import { Select, Input } from 'antd';

const { Option } = Select;
export default {
  Name: {
    label: '权限名称',
    rules: [
      {
        required: true,
        message: '请输入权限名称',
      },
    ],
  },
  Platform: {
    label: '平台',
    component: <Select>
        <Option value="web">web</Option>
        <Option value="api">api</Option>
        <Option value="admin">admin</Option>
      </Select>
    ,
    rules: [
      {
        required: true,
        message: '请选择平台',
      },
    ],
  },
  Type: {
    label: '类型',
    component:<Select>
        <Option value="negotiated">常量</Option>
        <Option value="url">链接</Option>
        <Option value="button">按钮</Option>
      </Select>
    ,
    rules: [
      {
        required: true,
        message: '请选择类型',
      },
    ],
  },
  Method: {
    label: '方式',
    component: <Select>
        <Option value="negotiated">常量</Option>
        <Option value="get">GET 请求</Option>
        <Option value="post">POST 请求</Option>
        <Option value="put">PUT 请求</Option>
        <Option value="delete">DELETE 请求</Option>
        <Option value="click">按钮单击</Option>
      </Select>
    ,
    rules: [
      {
        required: true,
        message: '请选择方式',
      },
    ],
  },
  Data: {
    label: '数据',
  },
  Remark: {
    label: '备注',
    component: Input.TextArea,
    props: {
      autoSize: { minRows: 4, maxRows: 8 },
      maxLength: 200,
    },
  },
};
