import { message } from 'antd';
import { getPageQuery } from '@/utils/utils';
import { loginByAccount, loginByMobile } from './service';

const onRedirect = ({ access }) => {
  if (!access || !access.find((item) => item.name === 'admin_login')) {
    message.error('无权限登录');
  } else {
    const urlParams = new URL(window.location.href);
    const params = getPageQuery();
    let { redirect } = params || { redirect: '/' };
    if (redirect) {
      const redirectUrlParams = new URL(redirect);
      if (redirectUrlParams.origin === urlParams.origin) {
        redirect = redirect.substr(urlParams.origin.length);
        if (redirect.match(/^\/.*#/)) {
          redirect = redirect.substr(redirect.indexOf('#') + 1);
        }
      } else {
        window.location.href = '/';
      }
    }
    window.location.href = redirect || '/';
  }
};
export default {
  namespace: 'login',

  state: {},

  effects: {
    *account({ payload }, { call }) {
      const response = yield call(loginByAccount, payload);
      if (response.result === true && response.status === 200) {
        onRedirect(response.data);
      }
      return response;
    },
    *mobile({ payload }, { call }) {
      const response = yield call(loginByMobile, payload);
      if (response.result === true && response.status === 200) {
        onRedirect(response.data);
      }
      return response;
    },
  },
};
