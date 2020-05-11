import React, { useRef, useState } from 'react';
import { Tooltip, Button, Space } from 'antd';
import { useAccess } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import UpdateForm from './components/UpdateForm';

export default ({ type, list, update }) => {
  const actionRef = useRef();
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const access = useAccess();
  const columns = [
    {
      title: '操作',
      dataIndex: 'action',
      formItemProps: { autoComplete: 'off' },
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
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      formItemProps: { autoComplete: 'off' },
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
      formItemProps: { autoComplete: 'off' },
    },
    {
      title: '操作说明',
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
      valueEnum: {
        true: { text: '是', status: 'Processing' },
        false: { text: '否', status: 'Default' },
      },
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (type === 'credit' && !access.adminUserBankCreditConfigUpdate) return null;
        if (type === 'score' && !access.adminUserBankScoreConfigUpdate) return null;
        return (
          <Tooltip title="修改">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            />
          </Tooltip>
        );
      },
    },
  ];

  const renderUpdateForm = () => {
    if (stepFormValues && Object.keys(stepFormValues).length) {
      return (
        <UpdateForm
          form={{
            hideRequiredMark: true,
          }}
          onSubmit={async (value) => {
            const success = await update(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          modalVisible={updateModalVisible}
          values={stepFormValues}
        />
      );
    }
    return null;
  };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        actionRef={actionRef}
        rowKey={({ action, ...record }) => {
          return `${action}_${record.type}`;
        }}
        pagination={{
          pageSize: 100,
        }}
        toolBarRender={() => []}
        tableAlertRender={false}
        request={() =>
          new Promise((resolve, reject) => {
            list().then(({ result, data }) => {
              if (!result || !data) reject();
              else
                resolve({
                  data,
                });
            });
          })
        }
        columns={columns}
      />
      {renderUpdateForm()}
    </PageHeaderWrapper>
  );
};
