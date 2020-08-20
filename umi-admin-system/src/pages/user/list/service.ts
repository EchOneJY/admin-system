import request from 'umi-request';

export interface QueryUserListType {
  page: number;
  pageSize: number;
}

export async function fakeUserList(params: QueryUserListType) {
  return request('/api/users', {
    method: 'POST',
    data: params,
  });
}
