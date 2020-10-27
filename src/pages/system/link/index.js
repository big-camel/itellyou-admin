import React from 'react';
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';
import { list, remove, add } from './service';

const { Text, Link, Target } = Form.createItem(formMap);

export default () => {

  const columns = [
    {
      title: '标题',
      dataIndex: 'text',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '链接',
      dataIndex: 'link',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '目标',
      dataIndex: 'target',
      formItemProps: { autoComplete: 'off' },
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


  const items = [
      <Text key="text" name="text" />,
      <Link key="link" name="link" />,
      <Target key="target" name="target" />
  ]

  return (
    <Table 
    columns={columns}
    request={list}
    option={{
        remove:{
            service:remove,
            access:"adminSysLinkRemove",
        }
    }}
    tool={{
        add:{
            service:add,
            access:"adminSysLinkCreate"
        }
    }}
    createForm={{
        title:"添加链接",
        items
    }}
    />
)
};
