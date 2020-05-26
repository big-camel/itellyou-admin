import request from '@/utils/request';

export async function list(params) {
  return request('/api/tag/group', {
    params,
  });
}

export async function addGroup(params) {
  return request('/api/tag/group', {
    data: params,
    method: 'put',
  });
}

export async function editGroup(params) {
  return request('/api/tag/group', {
    data: params,
    method: 'post',
  });
}

export async function removeGroup(params) {
  return request('/api/tag/group', {
    params,
    method: 'delete',
  });
}
