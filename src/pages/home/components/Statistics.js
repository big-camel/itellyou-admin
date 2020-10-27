import React from 'react';
import Table from '@/components/Table'
import { statistics } from '../service';

export default () => {

  const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        formItemProps: { autoComplete: 'off' },
        valueType: 'date'
    },
    {
      title: '类型',
      dataIndex: 'data_type',
      valueEnum: {
          all:"所有",
            article: '文章',
            answer: '回答'
      },
    },
    {
      title: '浏览数',
      dataIndex: 'view_count',
      search:false
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      search:false
    },
    {
      title: '点赞数',
      dataIndex: 'support_count',
      search:false
    },
    {
      title: '反对数',
      dataIndex: 'oppose_count',
      search:false
    },
    {
      title: '收藏数',
      dataIndex: 'star_count',
      search:false
    }
  ];

  return (
    <Table 
    columns={columns}
    request={statistics}
    primaryKey="date"
    />
)
};
