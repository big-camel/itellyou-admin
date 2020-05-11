import React, { useRef, useState } from 'react';
import { useAccess } from 'umi';
import { Button, Tooltip, message, Space, Modal } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { list, add, remove, update } from './service';

export default () => {
  const actionRef = useRef();

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});

  const access = useAccess();

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '平台',
      dataIndex: 'platform',
      formItemProps: { allowClear: true },
      valueEnum: {
        web: 'web',
        api: 'api',
        admin: 'admin',
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      formItemProps: { allowClear: true },
      valueEnum: {
        negotiated: '常量',
        url: '链接',
        button: '按钮',
      },
    },
    {
      title: '方式',
      dataIndex: 'method',
      formItemProps: { allowClear: true },
      valueEnum: {
        negotiated: '常量',
        get: 'GET 请求',
        post: 'POST 请求',
        put: 'PUT 请求',
        delete: 'DELETE 请求',
        click: '按钮单击',
      },
    },
    {
      title: '数据',
      dataIndex: 'data',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        return (
          <Space>
            {access.adminSystemPermissionRemove && (
              <Tooltip title="删除需要开发人员配合，请谨慎操作">
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
                          const { result, ...res } = await remove({ name: record.name });
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
            {access.adminSystemPermissionUpdate && (
              <Tooltip title="修改权限名称需要开发人员配合，请谨慎操作">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    handleUpdateModalVisible(true);
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
  if (access.adminSystemPermissionAdd) {
    tools.push(
      <Tooltip title="添加权限需要开发人员编码配合，请谨慎操作！">
        <Button type="primary" onClick={() => handleModalVisible(true)}>
          <PlusOutlined /> 添加权限
        </Button>
      </Tooltip>,
    );
  }

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        actionRef={actionRef}
        rowKey="name"
        toolBarRender={() => tools}
        tableAlertRender={false}
        search={{ span: 4 }}
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
        <UpdateForm
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
      ) : null}
    </PageHeaderWrapper>
  );
};
