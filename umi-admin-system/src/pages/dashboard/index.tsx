import React from 'react';
import { Row, Col, Card } from 'antd';

import NumberCard from './components/numberCrad';
import Pages from './components/pages';
import { IconKey } from '@/utils/icon';
import Color from '@/utils/themes';

interface NumberType {
  icon: IconKey;
  color: string;
  title: string;
  number: number;
}

const numbers: NumberType[] = [
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
];

const numberCards = numbers.map((item, key) => (
  <Col key={key} lg={6} md={12}>
    <NumberCard {...item} />
  </Col>
));

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card
            bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Pages />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
