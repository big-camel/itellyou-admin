import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { list as groupList } from '@/services/tag/group';
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';
import { list, edit , query } from './service';

const { Name, Disabled, Group } = Form.createItem(formMap);

export default () => {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    groupList({
      offset: 0,
      limit: 10000,
    }).then(({ result, data }) => {
      if (result) {
        setGroupData(data.data);
      }
    });
  }, [groupList]);

  const groupEnum = {};
  groupData.forEach((groupItem) => {
    groupEnum[groupItem.id] = groupItem.name;
  });

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '分组',
      dataIndex: 'group_id',
      formItemProps: { autoComplete: 'off', allowClear: true },
      valueEnum: groupEnum,
      render: (_, { group }) => {
        return group ? group.name : '无分组';
      },
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      formItemProps: { allowClear: true },
      valueEnum: {
          all:"全部",
        true: { text: '禁用', status: 'Default' },
        false: { text: '正常', status: 'Processing' },
      },
    },
    {
      title: '关注',
      dataIndex: 'star_count',
      valueType: 'digit',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '文章',
      dataIndex: 'article_count',
      valueType: 'digit',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '问题',
      dataIndex: 'question_count',
      valueType: 'digit',
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

  return (
    <Table 
    columns={columns}
    request={list}
    option={{
        edit:{
            service:edit,
            initialValues:({ group , ...values}) => { 
                return {group_id:group ? group.id : 0,...values}
            },
            access:"adminTagEdit",
        }
    }}
    updateForm={{
        title:"编辑标签",
        items:[
  <Name key="name" name="name" asyncValidator={(_, value) => {
    return new Promise((resolve, reject) => {
      query({ name: value })
        .then(({ result }) => {
          if (!result) resolve();
          else reject(new Error('名称已存在'));
        })
        .catch(() => reject(new Error('请求错误，请重试')));
    });
  }}/>,
  <Disabled key="disabled" name="disabled" />,
  <Group key="group_id" name="group_id">
  <Select.Option value={0}>未选择</Select.Option>
  {groupData.map((item) => (
    <Select.Option key={item.id} value={item.id}>
      {item.name}
    </Select.Option>
  ))}
</Group>]
    }}
    />
)
};
