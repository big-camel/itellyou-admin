import React from 'react';
import { Tooltip, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Form from '@/components/Form';
import Table from '@/components/Table'
import formMap from './components/map';

const { Action, Type, Number, Remark, OnlyOnce } = Form.createItem(formMap);

export default ({ list, update }) => {

  const columns = [
    {
      title: '操作',
      dataIndex: 'action',
      formItemProps: { autoComplete: 'off' },
      search:false,
      valueEnum: {
        follow: '关注/收藏',
        like: '点赞',
        comment: '评论回复',
        publish: '发布',
        delete: '删除',
        unfollow: '取消关注/收藏',
        unlike: '取消赞',
        view: '浏览',
        revert: '撤销删除',
        update: '更新',
        adopt: '采纳',
        dislike: '反对',
        undislike: '取消反对',
        payment: '支付',
        withdraw: '提现',
        bind: '绑定',
        unbind: '取消绑定',
        reward: '打赏',
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      formItemProps: { autoComplete: 'off' },
      search:false,
      valueEnum: {
        user: '用户',
        question: '问题',
        answer: '回答',
        article: '文章',
        column: '专栏',
        question_comment: '问题评论',
        answer_comment: '回答评论',
        article_comment: '文章评论',
        tag: '标签',
        payment: '支付',
        withdraw: '提现',
        github: 'github',
        alipay: '支付宝',
        mobile: '手机号',
        email: '邮箱',
        fee: '手续费',
      },
    },
    {
      title: '加分',
      children: [
        {
          title: (
            <Tooltip title="应用在操作对象的作者或用户，例：点赞文章，那么文章的作者就是'目标'">
              <Space size="small">
                目标
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          dataIndex: 'targeter_step',
          formItemProps: { autoComplete: 'off' },
        },
        {
          title: (
            <Tooltip title="应用在发生在此操作用户上，例：点赞文章，那么点赞这个用户就是'操作者'">
              <Space size="small">
                操作
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          dataIndex: 'creater_step',
          formItemProps: { autoComplete: 'off' },
        },
      ],
    },
    {
      title: (
        <Tooltip title="操作者最低需要多少等级分才能生效">
          <Space size="small">
            最低
            <QuestionCircleOutlined />
          </Space>
        </Tooltip>
      ),
      dataIndex: 'creater_min_score',
      search:false,
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '目标',
      children: [
        {
          title: (
            <Tooltip title="次：每日可以获得多少次积分，额：每日可以获得多少额度积分">
              <Space size="small">
                每日
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'targeter_count_of_day',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'targeter_total_of_day',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
        {
          title: (
            <Tooltip title="次：每周可以获得多少次积分，额：每周可以获得多少额度积分">
              <Space size="small">
                每周
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'targeter_count_of_week',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'targeter_total_of_week',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
        {
          title: (
            <Tooltip title="次：每月可以获得多少次积分，额：每月可以获得多少额度积分">
              <Space size="small">
                每月
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'targeter_count_of_month',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'targeter_total_of_month',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
      ],
    },
    {
      title: '操作',
      children: [
        {
          title: (
            <Tooltip title="次：每日可以获得多少次积分，额：每日可以获得多少额度积分">
              <Space size="small">
                每日
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'creater_count_of_day',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'creater_total_of_day',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
        {
          title: (
            <Tooltip title="次：每周可以获得多少次积分，额：每周可以获得多少额度积分">
              <Space size="small">
                每周
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'creater_count_of_week',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'creater_total_of_week',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
        {
          title: (
            <Tooltip title="次：每月可以获得多少次积分，额：每月可以获得多少额度积分">
              <Space size="small">
                每月
                <QuestionCircleOutlined />
              </Space>
            </Tooltip>
          ),
          children: [
            {
              title: '次',
              dataIndex: 'creater_count_of_month',
              formItemProps: { autoComplete: 'off' },
            },
            {
              title: '额',
              dataIndex: 'creater_total_of_month',
              formItemProps: { autoComplete: 'off' },
            },
          ],
        },
      ],
    },
    {
      title: '目标说明',
      dataIndex: 'targeter_remark',
      search:false,
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '操作说明',
      search:false,
      dataIndex: 'creater_remark',
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: (
        <Tooltip title="同一人同一操作总共只能获取一次，例：绑定手机后，获得积分，解绑后再次绑定无法获得积分">
          <Space size="small">
            一次有效
            <QuestionCircleOutlined />
          </Space>
        </Tooltip>
      ),
      dataIndex: 'only_once',
      search:false,
      valueEnum: {
        true: { text: '是', status: 'Processing' },
        false: { text: '否', status: 'Default' },
      },
    }
  ];

  return (
    <Table 
    rowKey={({ action, ...record }) => {
        return `${action}_${record.type}`;
    }}
    columns={columns}
    request={params => {
        return new Promise(resolve => {
            list(params).then(res => {
                resolve({
                    ...res,
                    data:{
                        total:res.data.length,
                        data:res.data
                    }
                })
            })
        })
        
    }}
    pagination={{
        pageSize: 100,
    }}
    search={false}
    tableAlertRender={false}
    option={{
        edit:{
            title:"修改",
            service:(_,fieldsValue) => update(fieldsValue),
            access:["adminUserBankCreditConfigUpdate","adminUserBankScoreConfigUpdate"],
        }
    }}
    updateForm={{
        title:"修改配置",
        items:[
            <Action key="action" name="action" disabled />,
            <Type key="type" name="type" disabled />,
            <Number key="targeter_step" label="目标加分" name="targeter_step" />,
            <Number key="creater_step" label="操作加分" name="creater_step" />,
            <Number key="creater_min_score" label="最低有效分" name="creater_min_score" min={0} />,
            <Number key="targeter_count_of_day" label="目标每日次数" name="targeter_count_of_day" min={0} />,
            <Number key="targeter_total_of_day" label="目标每日额度" name="targeter_total_of_day" min={0} />,
            <Number key="targeter_count_of_week" label="目标每周次数" name="targeter_count_of_week" min={0} />,
            <Number key="targeter_total_of_week" label="目标每周额度" name="targeter_total_of_week" min={0} />,
            <Number key="targeter_count_of_month" label="目标每月次数" name="targeter_count_of_month" min={0} />,
            <Number key="targeter_total_of_month" label="目标每月额度" name="targeter_total_of_month" min={0} />,
            <Number key="creater_count_of_day" label="操作每日次数" name="creater_count_of_day" />,
            <Number key="creater_total_of_day" label="操作每日额度" name="creater_total_of_day" min={0} />,
            <Number key="creater_count_of_week" label="操作每周次数" name="creater_count_of_week" min={0} />,
            <Number key="creater_total_of_week" label="操作每周额度" name="creater_total_of_week" min={0} />,
            <Number key="creater_count_of_month" label="操作每月次数" name="creater_count_of_month" min={0} />,
            <Number key="creater_total_of_month" label="操作每月额度" name="creater_total_of_month" min={0} />,
            <Remark key="targeter_remark" label="目标备注" name="targeter_remark" />,
            <Remark key="creater_remark" label="操作备注" name="creater_remark" />,
            <OnlyOnce key="only_once" label="仅一次有效" name="only_once" />
        ]
    }}
    />
  )
};
