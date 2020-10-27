import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import Loading from '@/components/Loading'
import Distribution from './Distribution'
import { related } from '../service'
import styles from './IncomeRelated.less'

export default ({ income_id }) => {

    const [ loading , setLoading ] = useState(true)
    const [ relatedId , setRelatedId ] = useState()
    const [ visible  , setVisible ] = useState(false)
    const [ dataSource , setDataSource ] = useState([])

    useEffect(() => {
        related({ income_id }).then(({ result , data }) => {
            if(result) setDataSource(data)
            setLoading(false)
        })
    },[])

    const onDistribution = relatedId => {
        setRelatedId(relatedId)
        setVisible(true)
    }

    if(loading) return <Loading />

    return (
        <>
            <Space direction="vertical">
                {
                    dataSource.map(({ id , amount , config : { name , scale } }) => {
                        return (
                            <div key={id}  className={styles['related-line']}>
                                <Space size="large">
                                    <div>{name}</div>
                                    <div>{amount}元</div>
                                    <div>分配比例：{scale}%</div>
                                    <Button onClick={() => onDistribution(id) }>分配利润</Button>
                                </Space>
                            </div>
                        )
                    })
                }
            </Space>
            <Distribution 
            income_id={income_id}
            related_id={relatedId}
            visible={visible}
            onVisibleChange={() => {
                setRelatedId(null)
                setVisible(false)
            }}
            />
        </>
    )
}