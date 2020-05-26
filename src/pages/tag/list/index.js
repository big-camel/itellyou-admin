import React, { useRef, useState, useEffect } from 'react';
import { Tooltip, Button, message, Space } from 'antd';
import { useAccess } from 'umi';
import { SettingOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { list as groupList } from '@/services/tag/group';
import Form from './components/Form';
import { list, edit } from './service';

export default () => {
  const actionRef = useRef();
  const [settingModalVisible, handleSettingModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState();

  const access = useAccess();
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    groupList({
      offset: 0,
      limit: 10000,
    }).then(({ result, data }) => {
      if (result) {
        setGroupData(data.data);
      }
    });
  }, [groupList]);

  const groupEnum = {};
  groupData.forEach((groupItem) => {
    groupEnum[groupItem.id] = groupItem.name;
  });

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '分组',
      dataIndex: 'group_id',
      formItemProps: { autoComplete: 'off', allowClear: true },
      valueEnum: groupEnum,
      render: (_, { group }) => {
        return group ? group.name : '无分组';
      },
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      formItemProps: { allowClear: true },
      valueEnum: {
        true: { text: '禁用', status: 'Default' },
        false: { text: '正常', status: 'Processing' },
      },
    },
    {
      title: '关注',
      dataIndex: 'star_count',
      valueType: 'digit',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '文章',
      dataIndex: 'article_count',
      valueType: 'digit',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '问题',
      dataIndex: 'question_count',
      valueType: 'digit',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '创建时间',
      formItemProps: { autoComplete: 'off' },
      dataIndex: 'created_time',
      valueType: 'dateTimeRange',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            {access.adminTagEdit && (
              <Space>
                <Tooltip title="编辑">
                  <Button
                    type="link"
                    icon={<SettingOutlined />}
                    onClick={() => {
                      handleSettingModalVisible(true);
                      setStepFormValues(record);
                    }}
                  />
                </Tooltip>
              </Space>
            )}
          </Space>
        );
      },
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
            const [begin, end] = created_time || [];

            list({
              disabled: 'all',
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
      {stepFormValues ? (
        <Form
          onSubmit={async (value) => {
            const res = await edit(value);

            if (res && res.result) {
              handleSettingModalVisible(false);
              setStepFormValues();

              if (actionRef.current) {
                actionRef.current.reload();
              }
            } else {
              message.error(res.message);
            }
          }}
          onCancel={() => {
            handleSettingModalVisible(false);
            setStepFormValues();
          }}
          modalVisible={settingModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};
