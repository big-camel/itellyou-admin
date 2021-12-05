import React from 'react';
import { Avatar, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Table from '@/components/Table'
import Setting from './components/Setting';
import DatetimeRangePicker from '@/components/DatetimeRangePicker'
import { list } from './service';

export default () => {
  const columns = [
    {
      title: '昵称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
      renderText: (text, { path, avatar, description }) => {
        return (
          <Space>
            <Avatar size={24} src={avatar} />
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.aomao.com/${path}`}
              >
                {text}
              </a>
              <div>{description}</div>
            </div>
          </Space>
        );
      },
    },
    {
      title: '手机',
      dataIndex: 'mobile',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '积分',
      render: (_, { bank }) => {
        return bank ? bank.credit : 0;
      },
    },
    {
      title: '余额',
      render: (_, { bank }) => {
        return bank ? bank.cash : 0;
      },
    },
    {
      title: '等级',
      render: (_, { rank, bank }) => {
        return rank ? `${rank.name}(${bank.score})` : '无';
      },
    },
    {
      title: '注册时间',
      formItemProps: { autoComplete: 'off' },
      dataIndex: 'created_time',
      valueType: 'dateTime',
      renderFormItem: (_, { type, defaultRender, ...rest }) => {
        return <DatetimeRangePicker {...rest} />
      },
    }
  ];

  return (
    <Table 
    columns={columns}
    request={list}
    option={{
        setting:{
            title:"管理角色",
            icon:<SettingOutlined />,
            access:"adminUserRoleList",
            content:({ id }) => <Setting id={id} />,
            modalProps:({ name }) => ({ width:1000,footer:null,title : `${name} - 角色配置`})
        }
    }}
    />
    )
};
