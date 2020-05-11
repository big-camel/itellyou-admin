import React from 'react';
import { Select, Input, InputNumber, Switch } from 'antd';

const { Option } = Select;
export default {
  Action: {
    label: '操作',
    component: (
      <Select>
        <Option value="follow">关注/收藏</Option>
        <Option value="like">点赞</Option>
        <Option value="comment">评论回复</Option>
        <Option value="publish">发布</Option>
        <Option value="delete">删除</Option>
        <Option value="unfollow">取消关注/收藏</Option>
        <Option value="unlike">取消赞</Option>
        <Option value="view">浏览</Option>
        <Option value="revert">撤销删除</Option>
        <Option value="update">更新</Option>
        <Option value="adopt">采纳</Option>
        <Option value="dislike">反对</Option>
        <Option value="undislike">取消反对</Option>
        <Option value="payment">支付</Option>
        <Option value="withdraw">提现</Option>
        <Option value="bind">绑定</Option>
        <Option value="unbind">取消绑定</Option>
      </Select>
    ),
    rules: [
      {
        required: true,
        message: '请选择操作',
      },
    ],
  },
  Type: {
    label: '类型',
    component: (
      <Select>
        <Option value="user">用户</Option>
        <Option value="question">问题</Option>
        <Option value="answer">回答</Option>
        <Option value="article">文章</Option>
        <Option value="column">专栏</Option>
        <Option value="question_comment">问题评论</Option>
        <Option value="answer_comment">回答评论</Option>
        <Option value="article_comment">文章评论</Option>
        <Option value="tag">标签</Option>
        <Option value="payment">支付</Option>
        <Option value="withdraw">提现</Option>
        <Option value="github">github</Option>
        <Option value="alipay">支付宝</Option>
        <Option value="mobile">手机号</Option>
        <Option value="email">邮箱</Option>
        <Option value="fee">手续费</Option>
      </Select>
    ),
    rules: [
      {
        required: true,
        message: '请选择类型',
      },
    ],
  },
  Number: {
    component: <InputNumber />,
  },
  Remark: {
    component: Input.TextArea,
    props: {
      autoSize: { minRows: 4, maxRows: 8 },
      maxLength: 200,
    },
  },
  OnlyOnce: {
    component: <Switch />,
    valuePropName: 'checked',
  },
};
