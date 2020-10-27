import React from 'react'
import DatetimeRangePicker from "@/components/DatetimeRangePicker";
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';

import { list, add, remove, update } from './service';

const { Name , Type , MinView,MinComment,MinSupport,MinOppose,MinStar,ViewWeight,CommentWeight,SupportWeight,OpposeWeight,StarWeight,MinAmount,MaxAmount,MaxUserCount } = Form.createItem(formMap)

const items = [
    <Name key="name" name="name" />,
    <Type key="type" name="type" />,
    <MinView key="min_view" name="min_view" />,
    <MinComment key="min_comment" name="min_comment" />,
    <MinSupport key="min_support" name="min_support" />,
    <MinOppose key="min_oppose" name="min_oppose" />,
    <MinStar key="min_star" name="min_star" />,
    <ViewWeight key="view_weight" name="view_weight" />,
    <CommentWeight key="comment_weight" name="comment_weight" />,
    <SupportWeight key="support_weight" name="support_weight" />,
    <OpposeWeight key="oppose_weight" name="oppose_weight" />,
    <StarWeight key="star_weight" name="star_weight" />,
    <MinAmount key="min_amount" name="min_amount" />,
    <MaxAmount key="max_amount" name="max_amount" />,
    <MaxUserCount key="max_user_count" name="max_user_count" />
]
export default () => {
    const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          formItemProps: { autoComplete: 'off' },
        },
        {
          title: '类型',
          dataIndex: 'data_type',
          formItemProps: { autoComplete: 'off' },
          valueEnum:{
              all:"全部",
              article:"文章",
              answer:"回答"
          }
        },
        {
          title: '最小浏览数',
          dataIndex: 'min_view',
          valueType: 'digit',
          search:false
        },
        {
          title: '最小评论数',
          dataIndex: 'min_comment',
          valueType: 'digit',
          search:false
        },
        {
          title: '最小点赞数',
          dataIndex: 'min_support',
          valueType: 'digit',
          search:false
        },
        {
          title: '最小反对数',
          dataIndex: 'min_oppose',
          valueType: 'digit',
          search:false
        },
        {
          title: '最小收藏数',
          dataIndex: 'min_star',
          valueType: 'digit',
          search:false
        },
        {
          title: '浏览权重',
          dataIndex: 'view_weight',
          valueType: 'digit',
          search:false
        },
        {
          title: '评论权重',
          dataIndex: 'comment_weight',
          valueType: 'digit',
          search:false
        },
        {
          title: '点赞权重',
          dataIndex: 'support_weight',
          valueType: 'digit',
          search:false
        },
        {
          title: '反对权重',
          dataIndex: 'oppose_weight',
          valueType: 'digit',
          search:false
        },
        {
          title: '收藏权重',
          dataIndex: 'star_weight',
          valueType: 'digit',
          search:false
        },
        {
          title: '最小金额',
          dataIndex: 'min_amount',
          valueType: 'digit',
          search:false
        },
        {
          title: '最大金额',
          dataIndex: 'max_amount',
          valueType: 'digit',
          search:false
        },
        {
          title: '最大用户数',
          dataIndex: 'max_user_count',
          valueType: 'digit',
          search:false
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
                text:"添加配置",
                service:add,
                initialValues:{
                    min_view:0,
                    min_comment:0,
                    min_support:0,
                    min_oppose:0,
                    min_star:0,
                    view_weight:0.00,
                    comment_weight:0.00,
                    support_weight:0.00,
                    oppose_weight:0.00,
                    star_weight:0.00,
                    min_amount:0.00,
                    max_amount:100,
                    max_user_count:10000,
                },
                access:"adminSystemIncomeTipConfigAdd"
            }
        }}
        option={{
            remove:{
                title:"删除配置",
                service:({id}) => remove({id}),
                access:"adminSystemIncomeTipConfigDelete"
            },
            edit:{
                title:"修改配置",
                service:update,
                access:"adminSystemIncomeTipConfigUpdate"
            }
        }}
        createForm={{
            title:"添加配置",
            items
        }}
        updateForm={{
            title:"修改配置",
            items
        }}
        />
    )
}