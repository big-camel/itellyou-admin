import request from 'umi-request';

export async function list(params) {
  return request('/api/user/rank', {
    params,
  });
}

export async function queryName(params) {
  return request('/api/user/rank/query/name', {
    params,
  });
}

export async function add(params) {
  return request('/api/user/rank', {
    data: params,
    method: 'put',
  });
}

export async function remove(params) {
  return request('/api/user/rank', {
    params,
    method: 'delete',
  });
}

export async function update(params) {
  return request('/api/user/rank', {
    data: params,
    method: 'post',
  });
}

export async function roleList(params) {
  return request('/api/user/rank/role', {
    params,
  });
}

export async function addRole(params) {
  return request('/api/user/rank/role', {
    data: params,
    method: 'put',
  });
}

export async function removeRole(params) {
  return request('/api/user/rank/role', {
    params,
    method: 'delete',
  });
}
