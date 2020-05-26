import React, { useRef, useState } from 'react';
import { Tooltip, Button, message, Space, Modal } from 'antd';
import { useAccess } from 'umi';
import { SettingOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { list, removeGroup, addGroup, editGroup } from '@/services/tag/group';
import Form from './components/Form';

export default () => {
  const actionRef = useRef();
  const [settingModalVisible, handleSettingModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState();

  const access = useAccess();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '标签数量',
      dataIndex: 'tag_count',
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
            {access.adminTagGroupRemove && (
              <Tooltip title="删除分组">
                <Button
                  type="link"
                  onClick={() => {
                    Modal.confirm({
                      title: '你确定要删除吗？',
                      content: <p>分组下的标签将更改为无分组</p>,
                      okText: '确定',
                      cancelText: '取消',
                      centered: true,
                      onOk() {
                        return new Promise(async (resolve) => {
                          const { result, ...res } = await removeGroup({ id: record.id });
                          if (result) {
                            message.success('删除成功');
                            if (actionRef.current) {
                              actionRef.current.reload();
                            }
                          } else {
                            message.error(res.message);
                          }
                          resolve();
                        });
                      },
                      onCancel() {},
                    });
                  }}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            )}
            {access.adminTagGroupEdit && (
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

  const tools = [];
  if (access.adminTagGroupCreate) {
    tools.push(
      <Button
        type="primary"
        onClick={() => {
          handleSettingModalVisible(true);
          setStepFormValues({});
        }}
      >
        <PlusOutlined /> 创建分组
      </Button>,
    );
  }

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => tools}
        tableAlertRender={false}
        request={({ current, pageSize, created_time, ...params }) => {
          return new Promise((resolve, reject) => {
            const [begin, end] = created_time || [];

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
      {stepFormValues ? (
        <Form
          onSubmit={async (value) => {
            const res = value.id ? await editGroup(value) : await addGroup(value);

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
