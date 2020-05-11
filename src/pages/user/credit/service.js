import request from 'umi-request';

export async function list() {
  return request('/api/bank/config/credit');
}

export async function update(params) {
  return request('/api/bank/config/credit', {
    data: params,
    method: 'post',
  });
}
