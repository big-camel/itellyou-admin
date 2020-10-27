import React from 'react'
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';

import { list, add, remove, update } from './service';

const { Name , Scale , Remark } = Form.createItem(formMap)

const items = [
    <Name key="name" name="name" />,
    <Scale key="scale" name="scale" min={0} max={100} precision={2} formatter={value => `${value}%`}
      parser={value => value.replace('%', '')} />,
    <Remark key="remark" name="remark" />
]
export default () => {
    const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          formItemProps: { autoComplete: 'off' },
        },
        {
          title: '分成比例',
          dataIndex: 'scale',
          formItemProps: { autoComplete: 'off' },
          valueType: 'digit',
          render:text => <span>{text} %</span>
        },
        {
          title: '备注',
          dataIndex: 'remark',
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
    return (
        <Table 
        columns={columns}
        request={list}
        tool={{
            add:{
                text:"添加配置",
                service:add,
                initialValues:{scale:0},
                access:"adminSystemIncomeConfigAdd"
            }
        }}
        option={{
            remove:{
                title:"删除配置",
                service:({id}) => remove({id}),
                access:"adminSystemIncomeConfigDelete"
            },
            edit:{
                title:"修改配置",
                service:(updateValues,fieldsValue) => update({...fieldsValue,...updateValues}),
                access:"adminSystemIncomeConfigUpdate"
            }
        }}
        createForm={{
            title:"添加配置",
            items
        }}
        updateForm={{
            title:"修改配置",
            items
        }}
        />
    )
}