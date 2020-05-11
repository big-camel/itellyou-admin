import request from 'umi-request';

export async function list(params) {
  return request('/api/system/permission', {
    params,
  });
}

export async function queryName(params) {
  return request('/api/system/permission/query/name', {
    params,
  });
}

export async function add(params) {
  return request('/api/system/permission', {
    data: params,
    method: 'put',
  });
}

export async function remove(params) {
  return request('/api/system/permission', {
    params,
    method: 'delete',
  });
}

export async function update(params) {
  return request('/api/system/permission', {
    data: params,
    method: 'post',
  });
}
