import React, { useRef, useState } from 'react';
import { Avatar, Space, Tooltip, Button } from 'antd';
import { useAccess } from 'umi';
import { SettingOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import Setting from './components/Setting';
import { list } from './service';

export default () => {
  const actionRef = useRef();
  const [settingModalVisible, handleSettingModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const access = useAccess();
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
                href={`https://www.itellyou.com/${path}`}
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
      valueType: 'dateTimeRange',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) =>
        access.adminUserRoleList && (
          <Tooltip title="管理角色">
            <Button
              type="link"
              icon={<SettingOutlined />}
              onClick={() => {
                handleSettingModalVisible(true);
                setStepFormValues(record);
              }}
            />
          </Tooltip>
        ),
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => []}
        tableAlertRender={false}
        request={({ current, pageSize, created_time, ...params }) => {
          return new Promise((resolve, reject) => {
            const [begin, end] = created_time;

            list({
              offset: (current - 1) * pageSize,
              limit: pageSize,
              begin,
              end,
              ...params,
            }).then(({ result, data }) => {
              if (!result || !data) reject();
              else {
                const { total } = data;
                resolve({
                  current,
                  pageSize,
                  total,
                  data: data.data,
                });
              }
            });
          });
        }}
        columns={columns}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <Setting
          onCancel={() => {
            handleSettingModalVisible(false);
            setStepFormValues({});
          }}
          modalVisible={settingModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};
