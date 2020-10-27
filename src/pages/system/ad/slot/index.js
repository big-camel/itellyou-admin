import React, { useEffect, useState } from 'react'
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import Loading from '@/components/Loading'
import formMap from './components/map'
import { list , add , update , remove } from './service'
import { list as adList } from '../service'

const { AdType , Name , SlotId , Width , Height , Style , Format } = Form.createItem(formMap)

const items = [
    <AdType name="ad_id" key="ad_id" />,
    <Name name="name" key="name" />,
    <SlotId name="slot_id" key="slot_id" />,
    <Width name="width" key="width" />,
    <Height name="height" key="height" />,
    <Style name="style" key="style" />,
    <Format name="format" key="format" />
]

export default () => {

    const [ adData , setAdData ] = useState({})
    const [ loading , setLoading ] = useState(true)

    useEffect(() => {
        adList({ limit : 1000 }).then(({ result , data }) => {
            if(result){
                const adConfig = {}
                data.data.forEach(({ id , name }) => adConfig[id] = name)
                setAdData(adConfig)
                setLoading(false)
            }
        })
    },[adList])

    if(loading) return <Loading />

    const columns = [
        {
            title: '所属广告',
            dataIndex: 'ad_id',
            formItemProps: { autoComplete: 'off' },
            valueEnum:adData
        },
        {
            title: '名称',
            dataIndex: 'name',
            formItemProps: { autoComplete: 'off' }
        },
        {
            title: '第三方标识',
            dataIndex: 'slot_id',
            formItemProps: { autoComplete: 'off' },
            search:false
        },
        {
            title: '宽',
            dataIndex: 'width',
            search:false
        },
        {
            title: '高',
            dataIndex: 'height',
            search:false
        },
        {
            title: '样式',
            dataIndex: 'style',
            search:false
        },
        {
            title: '格式',
            dataIndex: 'format',
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
            text:"添加广告位",
            service:add,
            access:"adminSystemAdSlotAdd"
        }
    }}
    option={{
            remove:{
                title:"删除广告位",
                service:({id}) => remove({id}),
                access:"adminSystemAdSlotDelete"
            },
            edit:{
                title:"修改广告位",
                service:update,
                access:"adminSystemAdSlotUpdate"
            }
        }}
    createForm={{
        title:"添加广告位",
        items
    }}
    updateForm={{
        title:"修改广告位",
        items
    }}
    />
}
