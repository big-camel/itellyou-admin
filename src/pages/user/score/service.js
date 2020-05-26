import request from 'umi-request';

export async function list(params) {
  return request('/api/bank/config/score', {
    params,
  });
}

export async function update(params) {
  return request('/api/bank/config/score', {
    data: params,
    method: 'post',
  });
}
