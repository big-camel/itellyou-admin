import request from '@/utils/request';

export async function list(params) {
  return request('/api/system/link', {
    params,
  });
}

export async function add(params) {
  return request(`/api/system/link`, {
    data: params,
    method: 'put',
  });
}

export async function remove(params) {
  return request(`/api/system/link`, {
    params,
    method: 'delete',
  });
}
