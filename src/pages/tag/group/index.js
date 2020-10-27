import React from 'react';
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Table from '@/components/Table'
import { list, removeGroup, addGroup, editGroup } from '@/services/tag/group';
import Form from '@/components/Form';
import formMap from './components/map';

const { Name } = Form.createItem(formMap);

export default () => {
    const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '标签数量',
      dataIndex: 'tag_count',
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
        tool={{
            add:{
                text:"创建分组",
                service:addGroup,
                access:"adminTagGroupCreate"
            }
        }}
        option={{
            remove:{
                title:"删除分组",
                service:({ id }) => removeGroup({id}),
                access:"adminTagGroupRemove",
                modalProps:{
                    content:<p>分组下的标签将更改为无分组</p>
                }
            },
            edit:{
                service:editGroup,
                access:"adminTagGroupEdit",
            }
        }}
        createForm={{
            title:"创建分组",
            items:[<Name key="name" name="name" />]
        }}
        updateForm={{
            title:"编辑分组",
            items:[<Name key="name" name="name" />]
        }}
        />
    )
};
