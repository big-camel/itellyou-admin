import { Input } from 'antd';

export default {
  Name: {
    label: '站点名称',
  },
  Logo: {
    label: 'Logo',
  },
  IcpText: {
    label: '备案号',
  },
  Copyright: {
    label: 'copyright',
  },
  CompanyName: {
    label: '公司名称',
  },
  UserAgreementLink: {
    label: '用户协议链接',
  },
  FooterScripts: {
    label: '尾部脚本',
    component: Input.TextArea,
    props: {
      autoSize: { minRows: 4 },
    },
  },
};
