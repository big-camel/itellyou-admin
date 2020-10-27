import React from 'react'
import moment from 'moment'
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import IncomeRelated from './components/IncomeRelated'
import formMap from './components/map'
import { list , add } from './service'

const { Date , Value } = Form.createItem(formMap)

function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
}


export default () => {
    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            formItemProps: { autoComplete: 'off' },
            valueType: 'date',
            search:false
        },
        {
            title: '金额',
            dataIndex: 'amount',
            formItemProps: { autoComplete: 'off' },
            valueType: 'digit',
            search:false,
            render:text => <span>{text} 元</span>
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
            text:"添加收益",
            service:values => {
                values.date = values.date.format("YYYY-MM-DD")
                return add(values)
            },
            initialValues:{date:moment()},
            access:"adminSystemIncomeAdd"
        }
    }}
    createForm={{
        title:"按配置分配收益",
        items:[
            <Date name="date" key="date" disabledDate={disabledDate} />,
            <Value name="value" key="value" />
        ]
    }}
    expandable={{
        expandRowByClick:true,
        expandedRowRender: ({ id }) => <IncomeRelated income_id={id} />
    }}
    />
}