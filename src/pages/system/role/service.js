import request from '@/utils/request';

export async function list(params) {
  return request('/api/system/role', {
    params,
  });
}

export async function queryName(params) {
  return request('/api/system/role/query/name', {
    params,
  });
}

export async function add(params) {
  return request('/api/system/role', {
    data: params,
    method: 'put',
  });
}

export async function remove(params) {
  return request('/api/system/role', {
    params,
    method: 'delete',
  });
}

export async function update(params) {
  return request('/api/system/role', {
    data: params,
    method: 'post',
  });
}

export async function permissionList(params) {
  return request('/api/system/role/permission', {
    params,
  });
}

export async function addPermission(params) {
  return request('/api/system/role/permission', {
    data: params,
    method: 'put',
  });
}

export async function removePermission(params) {
  return request('/api/system/role/permission', {
    params,
    method: 'delete',
  });
}
