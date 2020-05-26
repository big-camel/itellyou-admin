import request from '@/utils/request';

export async function edit(params) {
  return request(`/api/system/setting`, {
    data: params,
    method: 'post',
  });
}

export async function query() {
  return request(`/api/system/setting`);
}
