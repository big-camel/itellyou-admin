import request from '@/utils/request';

export async function list(params) {
    return request('/api/system/income/tip/config/list', {
        params,
    });
}

export async function add(params) {
    return request('/api/system/income/tip/config/add', {
        method:"POST",
        data:params,
    });
}

export async function update(params) {
    return request('/api/system/income/tip/config/update', {
        method:"PUT",
        data:params,
    });
}

export async function remove(params) {
    return request('/api/system/income/tip/config/delete', {
        method:"DELETE",
        params,
    });
}