import React, { useEffect, useState } from 'react'
import { Checkbox , message, Modal , Space , Popover, Alert } from 'antd'
import Loading from '@/components/Loading'
import { list as tipList } from '../tip/service'
import { related as relatedList , distribution } from '../service'

export default ({visible , onVisibleChange = function(){} , income_id , related_id }) => {
    const [ tipLoading , setTipLoading ] = useState(true)
    const [ tipDataSource , setTipDataSource ] = useState([])
    const [ relatedLoading , setRelatedLoading ] = useState(true)
    const [ relatedDataSource , setRelatedDataSource ] = useState([])
    const [ tipValues , setTipValues ] = useState([])
    const [ relatedValues , setRelatedValues ] = useState(related_id ? [related_id] : [])
    
    useEffect(() => {
        if(related_id){
            setRelatedValues(values => {
                const newValues = values.concat()
                if(!newValues.includes(related_id)) newValues.push(related_id)
                return newValues
            })
        }
    },[related_id])

    useEffect(() => {
        tipList({ limit:99999 }).then(({ result , data }) => {
            if(result) setTipDataSource(data.data)
            setTipLoading(false)
        })
    },[])

    useEffect(() => {
        relatedList({ income_id }).then(({ result , data }) => {
            if(result) setRelatedDataSource(data)
            setRelatedLoading(false)
        })
    },[income_id])

    const isDisabled = id => {
        const dataItem = tipDataSource.find(dataItem => dataItem.id === id)
        if(dataItem){
            const types = tipValues.map(idVal => (tipDataSource.find(dataItem => dataItem.id === idVal && id !== idVal) || {}).data_type)
            return types.includes(dataItem.data_type)
        }
        return false
    }
    const renderContent = () => {
        if(tipLoading || relatedLoading) return <Loading />
        let total = 0;
        return (
            <Space direction="vertical">
                <Alert type="info" message="按照条件和项目分配利润，如果条件不满足将不保证全部分配完" />
                <div>分配规则：<Checkbox.Group onChange={setTipValues} value={tipValues}>
                    {
                        tipDataSource.map(({ id , name }) => <Checkbox key={id} value={id} disabled={isDisabled(id)}>{name}</Checkbox>)
                    }
                    </Checkbox.Group></div>
                <div>分配项目：<Checkbox.Group onChange={setRelatedValues} value={related_id ? [related_id] : []}>
                {
                    relatedDataSource.map(({ config : { name , scale } , amount , id }) => {
                        const fAmount = amount * scale
                        total += fAmount
                        return (
                            <Checkbox key={id} value={id}>
                                <Popover
                                content={
                                    <>
                                    <div>项目利润：{amount}元</div>
                                    <div>分配比例：{scale}%</div>
                                    <div>预计分配：{Math.floor(fAmount) / 100}元</div>
                                    </>
                                }
                                >
                                {name}
                                </Popover>
                            </Checkbox>
                            
                        )
                    })
                }
                </Checkbox.Group></div>
                <div>预计分配：{Math.floor(total) / 100}元</div>
            </Space>
        )
    }

    const onSubmit = () => {
        if(tipValues.length === 0) return message.error("请选择分配规则")
        if(relatedValues.length === 0) return message.error("请选择分配项目")
        distribution({
            income_id,
            related_ids:relatedValues,
            tip_ids:tipValues
        }).then(({ result , ...res }) => {
            if(result){
                message.success("操作成功");
                onVisibleChange(false)
            }else{
                message.error(res.message)
            }
        })
    }

    return (
        <Modal
        title="利润分配"
        destroyOnClose={true}
        visible={visible}
        onCancel={onVisibleChange}
        onOk={onSubmit}
        >
            {
                renderContent()
            }
        </Modal>
    )
}