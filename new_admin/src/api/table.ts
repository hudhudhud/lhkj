import request from '@/lib/Request';
import { AuthApi } from '@/api';

export const getList = (params: any) =>
  request({
    url: '/table/list',
    method: 'get',
    params
  });
