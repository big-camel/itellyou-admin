import request from '@/utils/request';

export async function statistics(params) {
  return request('/api/admin/home/statistics', {
    params,
  });
}

export async function income(params) {
  return request('/api/admin/home/income', {
    params,
  });
}