import React, { useEffect, useState } from 'react'
import { message, Select } from 'antd'
import Loading from '@/components/Loading'
import { list } from '../../service'

export default ({ value , onChange }) => {

    const [ loading , setLoading ] = useState(true)
    const [ dataSource , setDataSource ] = useState([])

    useEffect(() => {
        list({ limit:10000 }).then(({ result , data , ...res }) => {
            if(result){
                setLoading(false)
                setDataSource(data.data)
            }else{
                message.error(res.message)
            }
        })
    },[])

    if(loading) return <Loading />

    return (
        <Select value={value} onSelect={onChange}>
            {
                dataSource.map(({ id , name }) => <Select.Option key={id} value={id}>{ name }</Select.Option>)
            }
        </Select>
    )
}