import React, { FC } from 'react';
import {
  connect,
  Dispatch,
  Link,
  Location,
  FormattedMessage,
  useIntl,
} from 'umi';
import {
  Table,
  Avatar,
  Dropdown,
  Button,
  Menu,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Cascader,
} from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';

import { StateType } from './model';
import { UserType } from './data';
import './style.less';
import city from '@/utils/city';
const { Search } = Input;
const { RangePicker } = DatePicker;

type QueryType = {
  [key: string]: string;
};
interface UserLocation extends Location {
  query: QueryType;
}

interface UserListProps {
  user: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

interface DropOptionProps {
  // onMenuClick: (e: any) => any;
  // buttonStyle: React.CSSProperties;
  menuOptions: { key: string; name: string }[];
  // dropdownProps: any;
}

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};

const TwoColProps = {
  ...ColProps,
  xl: 96,
};

const DropOption: FC<DropOptionProps> = props => {
  const { menuOptions } = props;
  const menu = menuOptions.map(item => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ));
  return (
    <Dropdown overlay={<Menu>{menu}</Menu>}>
      <Button style={{ border: 'none' }}>
        <BarsOutlined style={{ marginRight: 2 }} />
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const UserList: FC<UserListProps> = props => {
  const { user, dispatch, loading } = props;
  const intl = useIntl();

  const columns: ColumnsType<UserType> = [
    {
      title: <FormattedMessage id="user.avatar" />,
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      fixed: 'left',
      render: (text: string) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: <FormattedMessage id="user.name" />,
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record) => (
        <Link to={`user/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: <FormattedMessage id="user.nickName" />,
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: <FormattedMessage id="user.gender" />,
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text: string) => <span>{text ? 'Male' : 'Female'}</span>,
    },
    {
      title: <FormattedMessage id="user.phone" />,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: <FormattedMessage id="user.email" />,
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: <FormattedMessage id="user.address" />,
      dataIndex: 'address',
      key: 'address',
      width: 180,
    },
    {
      title: <FormattedMessage id="user.createTime" />,
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
    },
    {
      title: <FormattedMessage id="user.operation" />,
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text: string, record) => {
        return (
          <DropOption
            menuOptions={[
              { key: '1', name: intl.formatMessage({ id: 'user.update' }) },
              { key: '2', name: intl.formatMessage({ id: 'user.delete' }) },
            ]}
          />
        );
      },
    },
  ];

  const handleChange = (pagination: TablePaginationConfig) => {
    dispatch({
      type: 'user/query',
      payload: pagination,
    });
  };

  return (
    <div className="user-list">
      <Form>
        <Row gutter={24}>
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
            <Form.Item name="name">
              <Search
                placeholder={intl.formatMessage({ id: 'user.search.name' })}
              />
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 4 }}
            md={{ span: 8 }}
            id="addressCascader"
          >
            <Form.Item name="address">
              <Cascader
                style={{ width: '100%' }}
                options={city}
                placeholder={intl.formatMessage({ id: 'user.pick.address' })}
              />
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            id="createTimeRangePicker"
          >
            <Form.Item
              name="createTime"
              label={<FormattedMessage id="user.createTime" />}
            >
              <RangePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 10 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
          >
            <Row align="middle" justify="space-between">
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="margin-right"
                >
                  <FormattedMessage id="user.search" />
                </Button>
                <Button>
                  <FormattedMessage id="user.reset" />
                </Button>
              </div>
              <Button type="ghost">
                <FormattedMessage id="user.create" />
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>

      <Table
        columns={columns}
        dataSource={user.list}
        loading={loading}
        scroll={{ x: 1300 }}
        rowKey={record => record.id}
        pagination={user.pagination}
        onChange={handleChange}
        bordered
      />
    </div>
  );
};

export default connect(
  ({
    user,
    loading,
  }: {
    user: StateType;
    loading: { effects: { [key: string]: boolean } };
  }) => ({ user, loading: loading.effects['user/query'] }),
)(UserList);
