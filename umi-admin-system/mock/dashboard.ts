import { Constant } from './_utils';
import Mock from 'mockjs';

const { ApiPrefix, Color } = Constant;

const Dashboard = Mock.mock({
  'pages|7': [
    {
      'name|+1': 1,
      'uv|1000-5000': 1,
      'pv|1000-5000': 1,
      'amt|1000-5000': 1,
    },
  ],
});
