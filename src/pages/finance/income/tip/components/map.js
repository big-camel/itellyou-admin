import React from 'react';
import { Select , InputNumber } from 'antd';

export default {
  Name: {
    label: '配置名称',
    rules: [
      {
        required: true,
        message: '请输入配置名称',
      },
    ],
  },
  Type: {
    label: '类型',
    component: <Select>
        <Select.Option value="article">文章</Select.Option>
        <Select.Option value="answer">回答</Select.Option>
    </Select>,
    rules: [
      {
        required: true,
        message: '请选择类型',
      },
    ],
  },
  MinView: {
    label: '最小浏览数',
    component: InputNumber,
    props: {
        precision:0,
        min:0
    },
  },
  MinComment: {
    label: '最小评论数',
    component: InputNumber,
    props: {
        precision:0,
        min:0,
    },
  },
  MinSupport: {
    label: '最小点赞数',
    component: InputNumber,
    props: {
        precision:0,
        min:0,
    },
  },
  MinOppose: {
    label: '最小反对数',
    component: InputNumber,
    props: {
        precision:0,
        min:0,
    },
  },
  MinStar: {
    label: '最小收藏数',
    component: InputNumber,
    props: {
        precision:0,
        min:0,
    },
  },
  ViewWeight: {
    label: '浏览数权重',
    component: InputNumber,
    props: {
        precision:2,
        formatter:value => `${value}%`,
        parser:value => value.replace('%', '')
    },
  },
  CommentWeight: {
    label: '评论数权重',
    component: InputNumber,
    props: {
        precision:2,
        formatter:value => `${value}%`,
        parser:value => value.replace('%', '')
    },
  },
  SupportWeight: {
    label: '点赞数权重',
    component: InputNumber,
    props: {
        precision:2,
        formatter:value => `${value}%`,
        parser:value => value.replace('%', '')
    },
  },
  OpposeWeight: {
    label: '反对数权重',
    component: InputNumber,
    props: {
        precision:2,
        formatter:value => `${value}%`,
        parser:value => value.replace('%', '')
    },
  },
  StarWeight: {
    label: '收藏数权重',
    component: InputNumber,
    props: {
        precision:2,
        formatter:value => `${value}%`,
        parser:value => value.replace('%', '')
    },
  },
  MinAmount: {
    label: '最小派送金额',
    component: InputNumber,
    props: {
        precision:2,
        min:0,
        formatter:value => `${value}元`,
        parser:value => value.replace('元', '')
    },
  },
  MaxAmount: {
    label: '最大派送金额',
    component: InputNumber,
    props: {
        precision:2,
        min:0,
        formatter:value => `${value}元`,
        parser:value => value.replace('元', '')
    },
  },
  MaxUserCount: {
    label: '最多派送用户数',
    component: InputNumber,
    props: {
        precision:0,
        min:0,
    },
  }
};
