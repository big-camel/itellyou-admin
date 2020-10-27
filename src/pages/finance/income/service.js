import request from '@/utils/request';

export async function list(params) {
    return request('/api/system/income/list', {
        params,
    });
}

export async function add(params) {
    return request('/api/system/income/add', {
        method:"POST",
        data:params,
    });
}

export async function related(params) {
    return request('/api/system/income/related', {
        params,
    });
}

export async function distribution(params) {
    return request('/api/system/income/distribution', {
        method:"POST",
        data:params,
    });
}