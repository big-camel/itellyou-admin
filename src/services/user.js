import request from '@/utils/request';

export async function fetchMe(params) {
  return request(`/api/user/me`, {
    params,
  });
}

export async function logout() {
  return request('/api/user/logout');
}
