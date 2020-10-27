import React from 'react';
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';
import { list, add, remove, update , queryName } from './service';

const { Name, Platform, Type, Method, Data, Remark } = Form.createItem(formMap);

const items = [
    <Platform key="platform" name="platform" />,
    <Type key="type" name="type" />,
    <Method key="method" name="method" />,
    <Data key="data" name="data" />,
    <Remark key="remark" name="remark" />,
]

export default () => {

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
      search:false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      search:false,
    }
  ];

  const createItems = [
      <Name
        key="name"
        name="name"
        asyncValidator={(_, value) => {
            return new Promise((resolve, reject) => {
            queryName({ name: value })
                .then(({ result }) => {
                if (result) resolve();
                else reject(new Error('名称已存在'));
                })
                .catch(() => reject(new Error('请求错误，请重试')));
            });
        }}
        />
  ].concat(items)

  const updateItems = [
    <Name key="name" name="name" disabled />
  ].concat(items)

  return (
    <Table 
    columns={columns}
    request={list}
    primaryKey="name"
    tool={{
        add:{
            title:"添加权限需要开发人员编码配合，请谨慎操作！",
            text:"添加权限",
            service:add,
            access:"adminSystemPermissionAdd"
        }
    }}
    option={{
        remove:{
            title:"删除需要开发人员配合，请谨慎操作",
            service:({  name }) => remove({name}),
            access:"adminSystemPermissionRemove"
        },
        edit:{
            title:"修改权限名称需要开发人员配合，请谨慎操作",
            service:(_,fielddsValues) => update(fielddsValues),
            access:"adminSystemPermissionUpdate",
        }
    }}
    createForm={{
        title:"创建权限",
        items:createItems
    }}
    updateForm={{
        title:"编辑权限",
        items:updateItems
    }}
    />
)
};
