import request from '@/utils/request';

export async function list(params) {
    return request('/api/system/ad/slot/list', {
        params,
    });
}

export async function add(params) {
    return request('/api/system/ad/slot/add', {
        method:"POST",
        data:params,
    });
}

export async function update(params) {
    return request('/api/system/ad/slot/update', {
        method:"PUT",
        data:params,
    });
}

export async function remove(params) {
    return request('/api/system/ad/slot/delete', {
        method:"DELETE",
        params,
    });
}
