import { Request, Response } from 'express';
import Mock from 'mockjs';
import { Constant } from './_utils';

const { ApiPrefix, Color } = Constant;

const todoList = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

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
  'todoList|5': [
    {
      'id|+1': 0,
      'content|+1': todoList,
      checked: false,
    },
  ],
});

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req: Request, res: Response) {
    res.json(Dashboard);
  },
};
