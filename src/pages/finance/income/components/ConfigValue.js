import React, { useEffect, useState } from 'react'
import { Space , Button , Select, message , InputNumber , Alert } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { list as confgList } from '../config/service'
import Loading from '@/components/Loading'

const { Option } = Select

export default ({ value , onChange }) => {

    const [ configData , setConfigData ] = useState()
    const [ valueJson , setValueJson ] = useState(value)

    useEffect(() => {
        confgList().then(({ result , data }) => {
            if(result) setConfigData(data.data)
        })
    },[])

    useEffect(() => {
        onChange(valueJson)
    },[valueJson])

    if(!configData) return <Loading />
    if(configData.length === 0) return <Alert message="请先添加配置，然后才能分配收益" type="warning" showIcon/>

    const valueJsonKeys = Object.keys(valueJson || {})

    const onAdd = () => {
        const configItem = configData.find(({ id }) => !valueJsonKeys.includes(id.toString()))
        if(configItem){
            setValueJson({ ...valueJson , [configItem.id]:0 })
        }else{
            message.error('没有多余配置项可以添加')
        }
    }

    const onSelect = (configId,newId) => {
        const copyValueJson = {...valueJson}
        copyValueJson[newId] = copyValueJson[configId]
        delete copyValueJson[configId]
        setValueJson(copyValueJson)
    }

    const onValue = (configId,newValue) => {
        const copyValueJson = {...valueJson}
        copyValueJson[configId] = newValue
        setValueJson(copyValueJson)
    }

    const onDelete = configId => {
        let copyValueJson = {...valueJson}
        delete copyValueJson[configId]
        if(Object.keys(copyValueJson).length == 0) copyValueJson = undefined
        setValueJson(copyValueJson)
    }

    return <Space direction="vertical">
        {
            valueJsonKeys.map(key => {
                return <Space key={key}>
                    <InputNumber min={0} precision={2} value={valueJson[key]} onChange={value => onValue(key.toString(),value)} formatter={value => `${value}元`}
      parser={value => value.replace('元', '')} style={{width:100}} />
                    <Select defaultValue={key} onChange={value => onSelect(key.toString(),value)} style={{width:180}}>
                        {
                            configData.map(({ id , name }) => {
                                return <Option 
                                value={`${id}`} 
                                key={id} 
                                disabled={valueJsonKeys.includes(id.toString()) && id.toString() !== key}>{name}</Option>
                            })
                        }
                    </Select>
                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(key)} />
                </Space>
            })
        }
        <Button block icon={<PlusOutlined />} type="primary" disabled={!configData.find(({ id }) => !valueJsonKeys.includes(id.toString()))} onClick={onAdd}>添加分配项</Button>
    </Space>
}