import React, { useRef } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';
import Setting from './components/Setting';
import { list, add, remove, update , queryName} from './service';

const { Name, Score } = Form.createItem(formMap);

const items = [
    <Score key="min_score" label="最小分数" name="min_score" />,
    <Score key="max_score" label="最大分数" name="max_score" />
]
export default () => {
  const rowValue = useRef({})

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '最小分数',
      dataIndex: 'min_score',
      formItemProps: { autoComplete: 'off' },
      valueType: 'digit',
    },
    {
      title: '最大分数',
      dataIndex: 'max_score',
      formItemProps: { autoComplete: 'off' },
      valueType: 'digit',
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
            text:"添加等级",
            service:add,
            access:"adminUserRankAdd"
        }
    }}
    option={{
        remove:{
            title:"删除等级",
            service:({id}) => remove({id}),
            access:"adminUserRankRemove"
        },
        edit:{
            title:"修改等级",
            service:update,
            access:"adminUserRankUpdate",
            onClick:record => {
                rowValue.current = record
            }
        },
        setting:{
            title:"管理角色",
            icon:<SettingOutlined />,
            access:"adminUserRankRoleList",
            content:({ id }) => <Setting id={id} />,
            modalProps:({ name }) => ({ width:1000,footer:null,title : `${name} - 角色配置`})
        }
    }}
    createForm={{
        title:"创建等级",
        items:[
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
            />].concat(items)
    }}
    updateForm={{
        title:"编辑等级",
        items:[
            <Name key="name" name="name" 
            asyncValidator={(_, value) => {
            if (value === rowValue.current.name) return Promise.resolve();
            return new Promise((resolve, reject) => {
              queryName({ name: value })
                .then(({ result }) => {
                  if (result) resolve();
                  else reject(new Error('名称已存在'));
                })
                .catch(() => reject(new Error('请求错误，请重试')));
            });
          }}
            />].concat(items)
    }}
    />
)
};
