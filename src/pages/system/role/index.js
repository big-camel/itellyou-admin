import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';
import Setting from './components/Setting';
import { list, add, remove, update , queryName } from './service';

const { Name, Description , Disabled } = Form.createItem(formMap);

export default () => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '备注',
      dataIndex: 'description',
      search: false,
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
    tool={{
        add:{
            text:"添加角色",
            service:add,
            access:"adminSystemRoleAdd"
        }
    }}
    option={{
        remove:{
            title:({ system }) => system ? '系统角色，不能删除' : '删除角色',
            disabled:({ system }) => !!system,
            service:({id}) => remove({id}),
            access:"adminSystemRoleRemove"
        },
        edit:{
            title:({ system }) => system ? '系统角色，不能编辑' : '编辑角色',
            disabled:({ system }) => !!system,
            service:(updateValues) => update(updateValues),
            access:"adminSystemRoleUpdate",
        },
        setting:{
            title:"设置权限",
            icon:<SettingOutlined />,
            access:"adminSystemRolePermission",
            content:({ id }) => <Setting id={id} />,
            modalProps:({ name }) => ({ width:1000,footer:null,title : `${name} - 权限配置`})
        }
    }}
    createForm={{
        title:"创建角色",
        items:[
            <Name
            name="name"
            key="name"
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
            />,
            <Description key="description" name="description" />
        ]
    }}
    updateForm={{
        title:"编辑角色",
        items:[
            <Name key="name" name="name" />,
            <Disabled key="disabled" name="disabled" />,
            <Description key="description" name="description" />
        ]
    }}
    />
)
};
