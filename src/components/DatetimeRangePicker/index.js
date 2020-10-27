import React from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

export default (props) => {

    return <RangePicker 
        allowEmpty={[true,true]} 
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'),moment('23:59:59', 'HH:mm:ss')]}}
        {...props} 
        />
}