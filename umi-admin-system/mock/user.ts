import { Request, Response } from 'express';
import { Constant, randomAvatar } from './_utils';
import Mock from 'mockjs';
const { ApiPrefix } = Constant;

interface UsersType {
  pageSize: number;
  page: number;
  address: string[];
  createTime: [number, number];
}

interface UserType {
  id: number;
  name: string;
  nickName: string;
  phone: number;
  age: number;
  address: [string, string];
  isMale: boolean;
  email: string;
  createTime: number;
  avatar: string;
}

const usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar() {
        return randomAvatar();
      },
    },
  ],
});

let database = usersListData.data;

export default {
  [`POST ${ApiPrefix}/users`](req: Request, res: Response) {
    let { pageSize = 10, current = 1 } = req.body;
    res.status(200).json({
      data: database.slice(
        ((current as number) - 1) * (pageSize as number),
        (current as number) * (pageSize as number),
      ),
      total: database.length,
    });
  },
};
