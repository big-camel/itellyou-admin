import request from '@/utils/request';

export async function list(params) {
  return request('/api/bank/config/credit', {
    params,
  });
}

export async function update(params) {
  return request('/api/bank/config/credit', {
    data: params,
    method: 'post',
  });
}
