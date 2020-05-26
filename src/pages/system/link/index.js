import React, { useRef, useState } from 'react';
import { Tooltip, Button, message, Space, Modal } from 'antd';
import { useAccess } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import Form from './components/Form';
import { list, remove, add } from './service';

export default () => {
  const actionRef = useRef();
  const [settingModalVisible, handleSettingModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState();

  const access = useAccess();

  const columns = [
    {
      title: '标题',
      dataIndex: 'text',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '链接',
      dataIndex: 'link',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '目标',
      dataIndex: 'target',
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
            {access.adminSysLinkRemove && (
              <Tooltip title="删除链接">
                <Button
                  type="link"
                  onClick={() => {
                    Modal.confirm({
                      title: '你确定要删除吗？',
                      okText: '确定',
                      cancelText: '取消',
                      centered: true,
                      onOk() {
                        return new Promise(async (resolve) => {
                          const { result, ...res } = await remove({ id: record.id });
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
          </Space>
        );
      },
    },
  ];

  const tools = [];
  if (access.adminSysLinkCreate) {
    tools.push(
      <Button
        type="primary"
        onClick={() => {
          handleSettingModalVisible(true);
          setStepFormValues({});
        }}
      >
        <PlusOutlined /> 添加链接
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
            const res = await add(value);

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
