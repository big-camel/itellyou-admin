import React, { useState } from 'react';
import { message } from 'antd';
import { useAccess } from 'umi';
import Table from '@/components/Table'
import { permissionList, removePermission, addPermission } from '../service';

export default ({ id }) => {
  const access = useAccess();
    
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: '名称',
      key:"name",
      dataIndex: 'name',
      width: 120,
      sorter:true
    },
    {
      title: '平台',
      dataIndex: 'platform',
      initialValue: 'all',
      width: 80,
      valueEnum: {
          all:"全部",
        web: 'web',
        api: 'api',
        admin: 'admin',
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      initialValue: 'all',
      width: 80,
      valueEnum: {
        all:"全部",
        negotiated: '常量',
        url: '链接',
        button: '按钮',
      },
    },
    {
      title: '方式',
      width: 80,
      dataIndex: 'method',
      initialValue: 'all',
      valueEnum: {
        all:"全部",
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
      search:false
    },
  ];

  return <Table
  headerWrapper={false}
  primaryKey="name"
  columns={columns}
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
    request={ params => {
            return new Promise((resolve,reject) => {
                permissionList({role_id:id,...params}).then(res => {
                    const { result , data} = res
                    if (!result || !data) reject();
                    else {
                        const { checked_keys } = data;
                        setSelectedRowKeys(checked_keys);
                        resolve(res)
                    }
                })
            })
        }
    }
    tableAlertOptionRender={false}
    scroll={{ y: 480 }}
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
              } else {
                  keys.push(record.name)
                };
            }
            setSelectedRowKeys(keys);
          },
        }}
  />
};
