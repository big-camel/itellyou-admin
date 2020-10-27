import React , { useState } from 'react';
import { Card } from 'antd';
import Statistics from './components/Statistics'
import Income from './components/Income'

const tabList = [
    {
      key: 'statistics',
      tab: '数据统计',
    },
    {
      key: 'income',
      tab: "收益统计",
    },
];

const contentList = {
    statistics: <Statistics />,
    income: <Income />,
};

export default () => {

    const [ key , setKey ] = useState('statistics')

    return (
        <Card
        tabList={tabList}
        onTabChange={key => setKey(key)}
        >
        {
            contentList[key]
        }
        </Card>
    )
}