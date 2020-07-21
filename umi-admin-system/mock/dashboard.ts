import { Constant } from './_utils';
import Mock from 'mockjs';
import { Request, Response } from 'express';

const { ApiPrefix, Color } = Constant;

const Dashboard = Mock.mock({
  'pages|7': [
    {
      'nameIndex|+1': 0,
      'uv|1000-5000': 1,
      'pv|1000-5000': 1,
      'amt|1000-5000': 1,
    },
  ],
  numbers: [
    {
      icon: 'fire',
      color: Color.green,
      title: 'Online Review',
      number: 1520,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'New Customers',
      number: 3011,
    },
    {
      icon: 'message',
      color: Color.purple,
      title: 'Active Projects',
      number: 105,
    },
    {
      icon: 'star',
      color: Color.red,
      title: 'Referrals',
      number: 2020,
    },
  ],
});

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req: Request, res: Response) {
    res.json(Dashboard);
  },
};
