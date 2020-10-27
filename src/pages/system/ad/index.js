import React from 'react'
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map'
import { list , add , update , remove } from './service'

const { Type , Name , DataId , EnabledForeign , EnabledCn } = Form.createItem(formMap)

const items = [
    <Type name="type" key="type" />,
    <Name name="name" key="name" />,
    <DataId name="data_id" key="data_id" />,
    <EnabledForeign name="enabled_foreign" key="enabled_foreign" />,
    <EnabledCn name="enabled_cn" key="enabled_cn" />,
]
export default () => {
    const columns = [
        {
            title: '类型',
            dataIndex: 'type',
            formItemProps: { autoComplete: 'off' },
            valueEnum:{
                all:"全部",
                baidu:"百度",
                adsense:"Adsense"
            }
        },
        {
            title: '名称',
            dataIndex: 'name',
            formItemProps: { autoComplete: 'off' }
        },
        {
            title: '第三方标识',
            dataIndex: 'data_id',
            search:false
        },
        {
            title: '国外启用',
            dataIndex: 'enabled_foreign',
            renderText:(_,{ enabled_foreign }) => enabled_foreign ? "开启" : "未开启",
            search:false
        },
        {
            title: '国内启用',
            dataIndex: 'enabled_cn',
            renderText:(_,{ enabled_cn }) => enabled_cn ? "开启" : "未开启",
            search:false
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
    return <Table 
    columns={columns}
    request={list}
    tool={{
        add:{
            text:"添加广告",
            service:add,
            initialValues:{type:"baidu"},
            access:"adminSystemAdAdd"
        }
    }}
    option={{
            remove:{
                title:"删除广告",
                service:({id}) => remove({id}),
                access:"adminSystemAdDelete"
            },
            edit:{
                title:"修改广告",
                service:update,
                access:"adminSystemAdUpdate"
            }
        }}
    createForm={{
        title:"添加广告",
        items
    }}
    updateForm={{
        title:"修改广告",
        items
    }}
    />
}