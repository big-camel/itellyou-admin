import request from '@/utils/request';

export async function list(params) {
  return request('/api/tag/list', {
    params,
  });
}

export async function edit({ id, ...params }) {
  return request(`/api/tag/${id}`, {
    data: params,
    method: 'post',
  });
}

export async function query(params) {
  return request(`/api/tag/query`, {
    params,
  });
}
