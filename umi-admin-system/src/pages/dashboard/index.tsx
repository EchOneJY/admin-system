import React, { FC } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'umi';

import NumberCard from './components/numberCrad';
import Pages from './components/pages';

import { AnalysisData } from './data';

interface DashboardProps {
  dashboard: AnalysisData;
  loading: boolean;
}

const Dashboard: FC<DashboardProps> = props => {
  const { dashboard, loading } = props;
  const { numbers, pages } = dashboard;

  const numberCards = numbers.map((item, key) => (
    <Col key={key} lg={6} md={12}>
      <NumberCard {...item} />
    </Col>
  ));

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
            <Pages data={pages} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({
    dashboard,
    loading,
  }: {
    dashboard: AnalysisData;
    loading: { models: { [key: string]: boolean } };
  }) => ({ dashboard, loading: loading.models.dashboard }),
)(Dashboard);
