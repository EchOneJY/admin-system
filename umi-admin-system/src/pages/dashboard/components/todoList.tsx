import React, { FC, useState, useEffect } from 'react';
import { Card, Input, Row, Col, Button, List, Typography } from 'antd';
import { CloseOutlined, CheckSquareOutlined } from '@ant-design/icons';

import './todoList.less';
import { TodoListType } from '../data';
import Color from '@/utils/themes';

interface InputBoxProps {
  id: number;
  add: (item: TodoListType) => void;
  completeAll: (bool: boolean) => void;
}

interface FooterBoxProps {
  showTodoListType: (type: ShowType) => void;
}

interface TodoListProps {
  list: TodoListType[];
  add: (item: TodoListType) => void;
  remove: (id: number) => void;
  complete: (id: number) => void;
  completeAll: (bool: boolean) => void;
}

type ShowType = 'all' | 'active' | 'completed';

const InputBox: FC<InputBoxProps> = props => {
  const { id, add, completeAll } = props;

  const [inputValue, setInputValue] = useState('');
  const [complete, setComplete] = useState(false);

  const addTodoList = () => {
    const obj = {
      id: id + 1,
      content: inputValue,
      completed: false,
    };
    add(obj);
    setInputValue('');
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const toggleCompleteAll = () => {
    completeAll(!complete);
    setComplete(!complete);
  };

  return (
    <Row align="middle">
      <Col className="check-btn" span={5}>
        <CheckSquareOutlined
          style={{
            fontSize: '22px',
            color: complete ? Color.blue : Color.borderBase,
          }}
          onClick={toggleCompleteAll}
        />
      </Col>
      <Col span={12}>
        <Input
          placeholder="do something..."
          value={inputValue}
          onChange={handleChange}
        />
      </Col>
      <Col span={6} offset="1">
        <Button type="primary" onClick={addTodoList}>
          Add
        </Button>
      </Col>
    </Row>
  );
};

const FooterBox: FC<FooterBoxProps> = props => {
  const { showTodoListType } = props;
  const [showType, setShowType] = useState<ShowType>('all');

  const handleShowTodoListType = (type: ShowType) => {
    setShowType(type);
    showTodoListType(type);
  };

  return (
    <Row className="footer-box">
      <Col span={8}>
        <span className="left-text">5 items left</span>
      </Col>
      <Col>
        <Button
          type={showType === 'all' ? 'default' : 'text'}
          size="small"
          onClick={() => handleShowTodoListType('all')}
        >
          All
        </Button>
      </Col>
      <Col>
        <Button
          type={showType === 'active' ? 'default' : 'text'}
          size="small"
          onClick={() => handleShowTodoListType('active')}
        >
          Active
        </Button>
      </Col>
      <Col>
        <Button
          type={showType === 'completed' ? 'default' : 'text'}
          size="small"
          onClick={() => handleShowTodoListType('completed')}
        >
          Completed
        </Button>
      </Col>
    </Row>
  );
};

const TodoList: FC<TodoListProps> = props => {
  const { list, add, remove, complete, completeAll } = props;

  const [currentList, setCurrentList] = useState(list);
  const [addId, setAddId] = useState(0);

  useEffect(() => {
    setCurrentList(list);
    if (list.length) {
      setAddId(list[list.length - 1].id);
    } else {
      setAddId(0);
    }
  }, [list]);

  const showTodoListType = (type: ShowType) => {
    let todoList: TodoListType[] = [];
    switch (type) {
      case 'all':
        todoList = list;
        break;
      case 'active':
        todoList = list.filter((item: TodoListType) => !item.completed);
        break;
      case 'completed':
        todoList = list.filter((item: TodoListType) => item.completed);
        break;
      default:
        break;
    }
    setCurrentList(todoList);
  };

  return (
    <Card
      className="cardWrapper"
      bordered={false}
      title={<InputBox id={addId} add={add} completeAll={completeAll} />}
    >
      <List
        dataSource={currentList}
        renderItem={item => (
          <List.Item>
            <Row align="middle">
              <Col className="check-btn" span={5}>
                <CheckSquareOutlined
                  style={{
                    fontSize: '22px',
                    color: item.completed ? Color.green : Color.borderBase,
                  }}
                  onClick={() => complete(item.id)}
                />
              </Col>
              <Col span={16}>
                <Typography.Text delete={item.completed}>
                  {item.content}
                </Typography.Text>
              </Col>
              <Col className="delete-btn" span={3}>
                <CloseOutlined onClick={() => remove(item.id)} />
              </Col>
            </Row>
          </List.Item>
        )}
        footer={<FooterBox showTodoListType={showTodoListType} />}
      />
    </Card>
  );
};

export default TodoList;
