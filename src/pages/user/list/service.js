import request from '@/utils/request';

export async function list(params) {
  return request('/api/user/list', {
    params,
  });
}

export async function roleList(params) {
  return request('/api/user/role', {
    params,
  });
}

export async function addRole(params) {
  return request('/api/user/role', {
    data: params,
    method: 'put',
  });
}

export async function removeRole(params) {
  return request('/api/user/role', {
    params,
    method: 'delete',
  });
}
