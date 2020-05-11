import React, { useRef, useState } from 'react';
import { Button, message, Space, Modal, Tooltip } from 'antd';
import { useAccess } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import Setting from './components/Setting';
import { list, add, remove, update } from './service';

export default () => {
  const actionRef = useRef();

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [settingModalVisible, handleSettingModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const access = useAccess();
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '备注',
      dataIndex: 'description',
      hideInSearch: true,
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
            {access.adminSystemRoleRemove && (
              <Tooltip title={record.system ? '系统角色，不能删除' : '删除角色'}>
                <Button
                  type="link"
                  disabled={record.system}
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
            {access.adminSystemRoleUpdate && (
              <Tooltip title={record.system ? '系统角色，不能编辑' : '编辑'}>
                <Button
                  type="link"
                  disabled={record.system}
                  icon={<EditOutlined />}
                  onClick={() => {
                    handleUpdateModalVisible(true);
                    setStepFormValues(record);
                  }}
                />
              </Tooltip>
            )}
            {access.adminSystemRolePermission && (
              <Tooltip title="设置权限">
                <Button
                  type="link"
                  icon={<SettingOutlined />}
                  onClick={() => {
                    handleSettingModalVisible(true);
                    setStepFormValues(record);
                  }}
                />
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];

  const tools = [];
  if (access.adminSystemRoleAdd) {
    tools.push(
      <Button type="primary" onClick={() => handleModalVisible(true)}>
        <PlusOutlined /> 添加角色
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
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        form={{
          hideRequiredMark: true,
        }}
        onSubmit={async (value) => {
          const { result, ...res } = await add(value);
          if (result) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          } else {
            message.error(res.message);
          }
        }}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <>
          <UpdateForm
            form={{
              hideRequiredMark: true,
            }}
            onSubmit={async (value) => {
              const success = await update(value);

              if (success) {
                handleUpdateModalVisible(false);
                setStepFormValues({});

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            modalVisible={updateModalVisible}
            values={stepFormValues}
          />
          <Setting
            onCancel={() => {
              handleSettingModalVisible(false);
              setStepFormValues({});
            }}
            modalVisible={settingModalVisible}
            values={stepFormValues}
          />
        </>
      ) : null}
    </PageHeaderWrapper>
  );
};
