import request from '@/utils/request';

export async function loginByAccount(params) {
    return request('/api/user/login/account', {
        method: 'POST',
        data: params,
    });
}

export async function loginByMobile(params) {
    return request('/api/user/login/mobile', {
        method: 'POST',
        data: params,
    });
}
