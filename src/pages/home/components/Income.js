import React from 'react';
import Table from '@/components/Table'
import { statistics , income } from '../service';

export default () => {

  const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        formItemProps: { autoComplete: 'off' },
        valueType: 'date'
    },
    {
      title: '总计',
      dataIndex: 'total_amount',
      search:false
    },
    {
      title: '打赏',
      dataIndex: 'tip_amount',
      search:false
    },
    {
      title: '悬赏',
      dataIndex: 'reward_amount',
      search:false
    },
    {
      title: '分成',
      dataIndex: 'sharing_amount',
      search:false
    },
    {
      title: '售卖',
      dataIndex: 'sell_amount',
      search:false
    },
    {
      title: '其它',
      dataIndex: 'other_amount',
      search:false
    }
  ];

  return (
    <Table 
    columns={columns}
    request={income}
    primaryKey="date"
    />
)
};
