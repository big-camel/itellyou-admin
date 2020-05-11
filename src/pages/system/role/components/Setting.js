import React, { useRef, useState } from 'react';
import { Modal, message } from 'antd';
import { useAccess } from 'umi';
import ProTable from '@ant-design/pro-table';
import { permissionList, removePermission, addPermission } from '../service';

export default ({ values, modalVisible, onCancel }) => {
  const access = useAccess();

  const actionRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { id, name } = values;

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '平台',
      dataIndex: 'platform',
      width: 80,
      valueEnum: {
        web: 'web',
        api: 'api',
        admin: 'admin',
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 80,
      valueEnum: {
        negotiated: '常量',
        url: '链接',
        button: '按钮',
      },
    },
    {
      title: '方式',
      width: 80,
      dataIndex: 'method',
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
      width: 140,
      dataIndex: 'data',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  return (
    <Modal
      width={1000}
      destroyOnClose
      title={`${name} - 权限配置`}
      visible={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <ProTable
        actionRef={actionRef}
        rowKey="name"
        search={false}
        toolBarRender={false}
        tableAlertRender={(data) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {data.selectedRowKeys.length}
            </a>{' '}
            项，勾选即绑定权限
          </div>
        )}
        request={() => {
          return new Promise((resolve, reject) => {
            permissionList({
              role_id: id,
            }).then(({ result, data }) => {
              if (!result || !data) reject();
              else {
                const keys = [];
                const objs = [];
                data.forEach(({ checked, permission }) => {
                  if (checked) keys.push(permission.name);
                  objs.push(permission);
                });
                setSelectedRowKeys(keys);
                resolve({
                  data: objs,
                });
              }
            });
          });
        }}
        tableAlertOptionRender={false}
        scroll={{ y: 480 }}
        columns={columns}
        rowSelection={{
          columnWidth: 80,
          columnTitle: '选择',
          selectedRowKeys,
          onSelect: async (record, selected) => {
            const keys = selectedRowKeys.concat();
            if (selected === false && !access.adminSystemRolePermissionRemove) {
              message.error('无权限');
            } else if (selected === false && access.adminSystemRolePermissionRemove) {
              const { result, ...res } = await removePermission({
                role_id: id,
                permission_name: record.name,
              });
              if (result) {
                const index = keys.findIndex((key) => key === record.name);
                if (index > -1) keys.splice(index, 1);
              } else {
                message.error(res.message);
              }
            } else if (!access.adminSystemRolePermissionAdd) {
              message.error('无权限');
            } else {
              const { result, ...res } = await addPermission({
                role_id: id,
                permission_name: record.name,
              });
              if (!result) {
                message.error(res.message);
              } else keys.push(record.name);
            }
            setSelectedRowKeys(keys);
          },
        }}
      />
    </Modal>
  );
};
