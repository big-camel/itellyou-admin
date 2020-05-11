import request from 'umi-request';

export async function list() {
  return request('/api/bank/config/score');
}

export async function update(params) {
  return request('/api/bank/config/score', {
    data: params,
    method: 'post',
  });
}
