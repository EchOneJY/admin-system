import React, { FC, useState, useEffect } from 'react';
import { connect, Dispatch, Link, history, Location } from 'umi';
import { Table, Avatar, Dropdown, Button, Menu } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { BarsOutlined, DownOutlined } from '@ant-design/icons';
import { stringify } from 'qs';

import { StateType } from './model';
import { UserType } from './data';

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

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
    total: 0,
    pageSize: 10,
  });

  useEffect(() => {
    console.log('effect');
    dispatch({
      type: 'user/query',
      payload: pagination,
    });
  }, [pagination.current]);

  useEffect(() => {
    const total = user.total;
    setPagination({ ...pagination, total });
  }, [user.total]);

  const columns: ColumnsType<UserType> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 100,
      fixed: 'left',
      render: (text: string) => <Avatar style={{ marginLeft: 8 }} src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 100,
      render: (text: string, record) => (
        <Link to={`user/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'NickName',
      dataIndex: 'nickName',
      key: 'nickName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text: string) => <span>{text ? 'Male' : 'Female'}</span>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: 'Operation',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text: string, record) => {
        return (
          <DropOption
            menuOptions={[
              { key: '1', name: 'Update' },
              { key: '2', name: 'Delete' },
            ]}
          />
        );
      },
    },
  ];

  const handleChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  return (
    <div className="user-list">
      <Table
        columns={columns}
        dataSource={user.list}
        loading={loading}
        scroll={{ x: 1000 }}
        rowKey={record => record.id}
        pagination={pagination}
        onChange={handleChange}
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
