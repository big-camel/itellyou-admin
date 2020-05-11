import { history } from 'umi';
import { stringify } from 'qs';
import { fetchMe, logout } from '@/services/user';
import { getPageQuery } from '@/utils/utils';

const UserModel = {
  namespace: 'user',
  state: {
    ...window.appData.user,
  },
  effects: {
    *fetchMe({ payload }, { call, put }) {
      const response = yield call(fetchMe, payload);
      if (response && response.result) {
        yield put({
          type: 'setMe',
          payload: response.data,
        });
      }
      return response;
    },
    *logout(_, { call, put }) {
      const response = yield call(logout);
      yield put({
        type: 'setMe',
        payload: null,
      });
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      return response;
    },
  },
  reducers: {
    setMe(state, { payload }) {
      return {
        ...state,
        me: payload ? { ...(state || {}).me, ...payload } : null,
      };
    },
  },
};
export default UserModel;
