import request from '@/utils/request';

export async function list(params) {
    return request('/api/system/ad/list', {
        params,
    });
}

export async function add(params) {
    return request('/api/system/ad/add', {
        method:"POST",
        data:params,
    });
}

export async function update(params) {
    return request('/api/system/ad/update', {
        method:"PUT",
        data:params,
    });
}

export async function remove(params) {
    return request('/api/system/ad/delete', {
        method:"DELETE",
        params,
    });
}
