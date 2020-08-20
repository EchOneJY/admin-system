import React, { FC } from 'react';
import { Row, Col, Card } from 'antd';
import { Dispatch, connect } from 'umi';

import NumberCard from './components/numberCrad';
import Pages from './components/pages';
import TodoList from './components/todoList';

import { AnalysisData, TodoListType } from './data';

interface DashboardProps {
  dashboard: AnalysisData;
  loading: boolean;
  dispatch: Dispatch;
}

const Dashboard: FC<DashboardProps> = props => {
  const { dashboard, loading, dispatch } = props;
  const { numbers, pages, todoList } = dashboard;

  const numberCards = numbers.map((item, key) => (
    <Col key={key} lg={6} md={12} sm={24}>
      <NumberCard {...item} />
    </Col>
  ));

  const addTodoList = (item: TodoListType) => {
    dispatch({
      type: 'dashboard/addTodoList',
      payload: item,
    });
  };

  const removeTodoList = (id: number) => {
    dispatch({
      type: 'dashboard/removeTodoList',
      payload: id,
    });
  };

  const handleComplete = (id: number) => {
    dispatch({
      type: 'dashboard/handleComplete',
      payload: id,
    });
  };

  const handleCompleteAll = (bool: boolean) => {
    dispatch({
      type: 'dashboard/handleCompleteAll',
      payload: bool,
    });
  };

  return (
    <div className="dashboard">
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card
            bordered={false}
            style={{ marginBottom: '24px' }}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <Pages data={pages} />
          </Card>
        </Col>
        <Col lg={6} md={12}>
          <TodoList
            list={todoList}
            add={addTodoList}
            remove={removeTodoList}
            complete={handleComplete}
            completeAll={handleCompleteAll}
          />
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
