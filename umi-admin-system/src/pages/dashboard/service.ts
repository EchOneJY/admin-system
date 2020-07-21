import request from 'umi-request';

export function queryDashboard() {
  return request('/api/dashboard', {
    method: 'get',
  });
}
