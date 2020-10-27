import { InputNumber } from 'antd';
import AdSelect from './AdSelect'

export default {
    AdType:{
        label:"所属广告",
        component:AdSelect,
        valuePropName: 'value',
        rules: [
            {
              required: true,
              message: '请选择所属广告',
            },
          ],
    },
  Name: {
    label:"广告位名称",
    rules: [
      {
        required: true,
        message: '请输入广告位名称',
      },
    ],
  },
  SlotId:{
    label:"第三方标识",
    help:{content:"如百度的代码ID，或者Google Adsense的slot编号"}
  },
  Width:{
      label:"宽",
      component:InputNumber,
      help:{content:"宽和高都小于10将用作比值在手机端显示，如6:5"},
      props: {
        precision:0,
        min:0,
        max:2000
    },
  },
  Height:{
      label:"高",
      help:{content:"宽和高都小于10将用作比值在手机端显示，如6:5"},
      component:InputNumber,
      props: {
        precision:0,
        min:0,
        max:2000
    },
  },
  Style:{
    label:"样式"
    },
    Format:{
        label:"格式",
        help:{content:"Adsense 有效"}
    }
};
